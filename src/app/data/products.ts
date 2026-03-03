export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with active noise cancellation and premium sound quality.',
    image: 'https://images.unsplash.com/photo-1695634463848-4db4e47703a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzcyNDQ0MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Audio',
    rating: 4.8,
    stock: 50
  },
  {
    id: '2',
    name: 'Professional Laptop',
    price: 1299.99,
    description: 'Powerful laptop for professionals with high performance and stunning display.',
    image: 'https://images.unsplash.com/photo-1642943038577-eb4a59549766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNDM3MjYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Computers',
    rating: 4.9,
    stock: 30
  },
  {
    id: '3',
    name: 'Fitness Smartwatch',
    price: 349.99,
    description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS.',
    image: 'https://images.unsplash.com/photo-1665860455418-017fa50d29bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwZml0bmVzcyUyMHRyYWNrZXJ8ZW58MXx8fHwxNzcyNDQyMzE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wearables',
    rating: 4.6,
    stock: 75
  },
  {
    id: '4',
    name: 'Professional Camera',
    price: 1899.99,
    description: 'High-end professional camera with advanced features for photographers.',
    image: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI0NTg5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Photography',
    rating: 4.9,
    stock: 20
  },
  {
    id: '5',
    name: 'Latest Smartphone',
    price: 999.99,
    description: 'Cutting-edge smartphone with stunning camera and powerful processor.',
    image: 'https://images.unsplash.com/photo-1741061961703-0739f3454314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzcyNTE2NTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Mobile',
    rating: 4.7,
    stock: 100
  },
  {
    id: '6',
    name: 'Gaming Console',
    price: 499.99,
    description: 'Next-gen gaming console with immersive gaming experience.',
    image: 'https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NzI1MTYwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Gaming',
    rating: 4.8,
    stock: 45
  },
  {
    id: '7',
    name: 'Digital Tablet',
    price: 599.99,
    description: 'Versatile digital tablet perfect for work and entertainment.',
    image: 'https://images.unsplash.com/photo-1769603795371-ad63bd85d524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBkaWdpdGFsfGVufDF8fHx8MTc3MjQ3NTUxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Tablets',
    rating: 4.5,
    stock: 60
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    price: 149.99,
    description: 'Portable Bluetooth speaker with exceptional sound quality and battery life.',
    image: 'https://images.unsplash.com/photo-1645020089405-ee44c2cd7c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwYXVkaW8lMjBibHVldG9vdGh8ZW58MXx8fHwxNzcyNTAyNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Audio',
    rating: 4.7,
    stock: 80
  }
];
