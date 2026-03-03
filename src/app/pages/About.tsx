import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize our customers satisfaction above everything else'
    },
    {
      icon: Target,
      title: 'Quality Products',
      description: 'Only the best and most reliable products make it to our store'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love technology and are passionate about what we do'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '5,000+', label: 'Products Sold' },
    { value: '50+', label: 'Brands' },
    { value: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold mb-4 text-center">About TechStore</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Your trusted partner in technology since 2020
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TechStore was founded in 2020 with a simple mission: to make the latest technology 
                accessible to everyone. What started as a small online shop has grown into one of 
                the most trusted technology retailers.
              </p>
              <p>
                We carefully curate our product selection to ensure that every item meets our high 
                standards of quality and value. Our team of tech enthusiasts works tirelessly to 
                stay ahead of the latest trends and bring you the best products on the market.
              </p>
              <p>
                Today, we serve thousands of customers worldwide, and we're committed to providing 
                an exceptional shopping experience with every purchase.
              </p>
            </div>
          </div>
          <div className="bg-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Mission</h3>
            <p className="text-gray-700 text-lg text-center">
              To empower people with technology by providing high-quality products, 
              exceptional service, and expert guidance, making innovation accessible to all.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We're a diverse team of technology enthusiasts, customer service experts, and 
            logistics professionals working together to bring you the best shopping experience.
          </p>
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-700">
              Our dedicated team is available 24/7 to help you find the perfect products 
              and answer any questions you may have.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
