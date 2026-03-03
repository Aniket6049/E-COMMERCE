import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    size: '',
    color: '',
    notes: ''
  });

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart with the specified quantity
    for (let i = 0; i < orderDetails.quantity; i++) {
      addToCart(product);
    }

    toast.success(`${product.name} (x${orderDetails.quantity}) added to cart!`, {
      description: orderDetails.notes ? `Note: ${orderDetails.notes}` : undefined
    });

    setDialogOpen(false);
    setOrderDetails({
      quantity: 1,
      size: '',
      color: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-100">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-8">
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-2 text-lg font-semibold">{product.rating}</span>
                <span className="ml-2 text-gray-500">/ 5.0</span>
              </div>

              <p className="text-4xl font-bold text-blue-600 mb-6">
                ${product.price}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Availability</h3>
                <p className="text-gray-700">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => setDialogOpen(true)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Add to Cart Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
            <DialogDescription>
              Fill in the details for {product.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={orderDetails.quantity}
                onChange={(e) => setOrderDetails({ ...orderDetails, quantity: parseInt(e.target.value) || 1 })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Size
              </Label>
              <Select
                value={orderDetails.size}
                onValueChange={(value) => setOrderDetails({ ...orderDetails, size: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select size (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Select
                value={orderDetails.color}
                onValueChange={(value) => setOrderDetails({ ...orderDetails, color: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select color (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="notes" className="text-right pt-2">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or preferences..."
                value={orderDetails.notes}
                onChange={(e) => setOrderDetails({ ...orderDetails, notes: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right font-semibold">Total:</div>
              <div className="col-span-3 text-2xl font-bold text-blue-600">
                ${(product.price * orderDetails.quantity).toFixed(2)}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}