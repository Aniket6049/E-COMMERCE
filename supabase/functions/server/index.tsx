import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase clients
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ec2a30a6/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-ec2a30a6/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields: email, password, name" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Authorization error while creating user during signup: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store customer details in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}:profile`, {
      name,
      email,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      userId: data.user.id,
      message: "User created successfully" 
    });
  } catch (error) {
    console.log(`Error during signup: ${error}`);
    return c.json({ error: "Signup failed" }, 500);
  }
});

// Get user profile
app.get("/make-server-ec2a30a6/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Authorization error while getting user profile: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const profile = await kv.get(`user:${user.id}:profile`);
    
    return c.json({ 
      profile: profile || user.user_metadata,
      userId: user.id 
    });
  } catch (error) {
    console.log(`Error fetching profile: ${error}`);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
});

// Update user profile
app.put("/make-server-ec2a30a6/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Authorization error while updating user profile: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const updates = await c.req.json();
    
    // Get existing profile
    const existingProfile = await kv.get(`user:${user.id}:profile`) || {};
    
    // Merge updates
    const updatedProfile = {
      ...existingProfile,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`user:${user.id}:profile`, updatedProfile);
    
    return c.json({ 
      success: true,
      profile: updatedProfile
    });
  } catch (error) {
    console.log(`Error updating profile: ${error}`);
    return c.json({ error: "Failed to update profile" }, 500);
  }
});

// Get cart for user
app.get("/make-server-ec2a30a6/cart", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Authorization error while fetching cart: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const cart = await kv.get(`user:${user.id}:cart`) || { items: [] };
    
    return c.json({ cart });
  } catch (error) {
    console.log(`Error fetching cart: ${error}`);
    return c.json({ error: "Failed to fetch cart" }, 500);
  }
});

// Update cart
app.post("/make-server-ec2a30a6/cart", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Authorization error while updating cart: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { items } = await c.req.json();
    
    await kv.set(`user:${user.id}:cart`, {
      items,
      updatedAt: new Date().toISOString()
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error updating cart: ${error}`);
    return c.json({ error: "Failed to update cart" }, 500);
  }
});

// Create order
app.post("/make-server-ec2a30a6/orders", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Authorization error while creating order: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const orderData = await c.req.json();
    const orderId = crypto.randomUUID();
    
    const order = {
      ...orderData,
      orderId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    await kv.set(`order:${orderId}`, order);
    
    // Add to user's order list
    const userOrders = await kv.get(`user:${user.id}:orders`) || { orderIds: [] };
    userOrders.orderIds.push(orderId);
    await kv.set(`user:${user.id}:orders`, userOrders);
    
    // Clear cart
    await kv.set(`user:${user.id}:cart`, { items: [] });
    
    return c.json({ 
      success: true,
      orderId
    });
  } catch (error) {
    console.log(`Error creating order: ${error}`);
    return c.json({ error: "Failed to create order" }, 500);
  }
});

// Get user orders
app.get("/make-server-ec2a30a6/orders", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Authorization error while fetching orders: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userOrders = await kv.get(`user:${user.id}:orders`) || { orderIds: [] };
    
    // Fetch all order details
    const orders = await Promise.all(
      userOrders.orderIds.map((orderId: string) => kv.get(`order:${orderId}`))
    );
    
    return c.json({ orders: orders.filter(Boolean) });
  } catch (error) {
    console.log(`Error fetching orders: ${error}`);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
});

Deno.serve(app.fetch);
