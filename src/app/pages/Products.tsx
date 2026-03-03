import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Products() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    size: '',
    color: '',
    notes: ''
  });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleOpenDialog = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setOrderDetails({
      quantity: 1,
      size: '',
      color: '',
      notes: ''
    });
    setDialogOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    // Add to cart with the specified quantity
    for (let i = 0; i < orderDetails.quantity; i++) {
      addToCart(selectedProduct);
    }

    toast.success(`${selectedProduct.name} (x${orderDetails.quantity}) added to cart!`, {
      description: orderDetails.notes ? `Note: ${orderDetails.notes}` : undefined
    });

    setDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">Explore our wide range of technology products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">{product.category}</Badge>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  <span className="ml-2 text-sm text-gray-500">({product.stock} in stock)</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">${product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={(e) => handleOpenDialog(product, e)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Add to Cart Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
            <DialogDescription>
              Fill in the details for {selectedProduct?.name}
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
                max={selectedProduct?.stock || 1}
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
                ${((selectedProduct?.price || 0) * orderDetails.quantity).toFixed(2)}
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
