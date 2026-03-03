import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";
import { Navbar } from "./components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/products",
    element: <Layout><Products /></Layout>,
  },
  {
    path: "/about",
    element: <Layout><About /></Layout>,
  },
  {
    path: "/contact",
    element: <Layout><Contact /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "/signup",
    element: <Layout><Signup /></Layout>,
  },
  {
    path: "/product/:id",
    element: <Layout><ProductDetail /></Layout>,
  },
  {
    path: "/cart",
    element: <Layout><Cart /></Layout>,
  },
  {
    path: "/profile",
    element: <Layout><Profile /></Layout>,
  },
  {
    path: "*",
    element: <Layout><div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">404 - Page Not Found</h1></div></Layout>,
  },
]);