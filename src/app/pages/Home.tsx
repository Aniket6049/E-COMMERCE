import React from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ShoppingBag, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Wide Selection',
      description: 'Browse thousands of products across multiple categories'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on all orders over $50'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your transactions are safe and secure'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Customer service always ready to help you'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to TechStore
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your one-stop shop for the latest technology products at unbeatable prices
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Audio', 'Computers', 'Mobile', 'Gaming'].map((category) => (
              <Link key={category} to="/products">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers today</p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
