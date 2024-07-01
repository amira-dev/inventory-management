import { http, HttpResponse } from 'msw';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Stock {
  productId: number;
  productName: string;
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Pro', description: 'High-performance laptop with 16GB RAM and 512GB SSD. Ideal for gaming, video editing, and heavy multitasking. Comes with a sleek design, backlit keyboard, and long battery life. Perfect for professionals and power users who need reliability and speed.', price: 1200, quantity: 50 },
  { id: 2, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse with adjustable DPI settings. Offers precision and comfort for long hours of use. Compatible with various operating systems and features a long-lasting battery. Perfect for office work and casual gaming.', price: 25, quantity: 150 },
  { id: 3, name: 'Bluetooth Headphones', description: 'Noise-cancelling over-ear headphones with 20 hours of battery life. Delivers high-quality sound with deep bass and clear highs. Comfortable ear cushions and adjustable headband ensure a perfect fit. Ideal for music lovers and frequent travelers.', price: 100, quantity: 80 },
  { id: 4, name: 'Smartphone X', description: 'Latest smartphone with 6.5-inch display and 128GB storage. Features a powerful processor, high-resolution camera, and long-lasting battery. Runs the latest OS and supports fast charging and wireless charging. Perfect for staying connected and capturing memories.', price: 999, quantity: 30 },
  { id: 5, name: 'Gaming Keyboard', description: 'Mechanical keyboard with RGB lighting and programmable keys. Provides tactile feedback and customizable lighting effects. Durable construction with anti-ghosting and N-key rollover. Ideal for gamers looking to enhance their gaming experience.', price: 85, quantity: 60 },
  { id: 6, name: '4K Monitor', description: '27-inch 4K UHD monitor with HDR support and 144Hz refresh rate. Offers stunning visuals and smooth gameplay. Features multiple input options and ergonomic stand. Perfect for gamers, content creators, and professionals who need a high-resolution display.', price: 350, quantity: 20 },
  { id: 7, name: 'External Hard Drive', description: '2TB external hard drive with USB 3.0 connectivity. Provides fast data transfer speeds and reliable storage. Compact and portable design, perfect for backups and storing large files. Compatible with various operating systems.', price: 60, quantity: 100 },
  { id: 8, name: 'Smartwatch Series 5', description: 'Water-resistant smartwatch with heart rate monitor and GPS. Tracks fitness activities and provides notifications. Features a sleek design, customizable watch faces, and long battery life. Ideal for fitness enthusiasts and tech-savvy users.', price: 250, quantity: 5 },
  { id: 9, name: 'Wireless Charger', description: 'Fast wireless charger compatible with all Qi-enabled devices. Provides safe and efficient charging. Features an LED indicator and sleek design. Perfect for home, office, or travel use.', price: 30, quantity: 120 },
  { id: 10, name: 'Portable Speaker', description: 'Bluetooth portable speaker with 10 hours of playtime and waterproof design. Delivers high-quality sound with deep bass. Compact and lightweight, perfect for outdoor activities and travel. Features easy pairing and hands-free calling.', price: 45, quantity: 70 },
  { id: 11, name: 'Action Camera', description: '4K action camera with wide-angle lens and waterproof case. Captures stunning videos and photos in various conditions. Features image stabilization, multiple shooting modes, and long battery life. Ideal for adventurers and sports enthusiasts.', price: 150, quantity: 2 },
  { id: 12, name: 'Drone', description: 'Quadcopter drone with 4K camera and 30-minute flight time. Offers stable flight and high-quality aerial footage. Features GPS, return home function, and intelligent flight modes. Perfect for hobbyists and professional photographers.', price: 400, quantity: 10 },
  { id: 13, name: 'Smart Home Hub', description: 'Voice-controlled smart home hub compatible with multiple devices. Allows for easy control of smart home products. Features a sleek design and intuitive interface. Ideal for creating a connected home environment.', price: 130, quantity: 55 },
  { id: 14, name: 'Fitness Tracker', description: 'Fitness tracker with heart rate monitor and sleep tracking. Tracks daily activities, workouts, and sleep patterns. Features a lightweight design, long battery life, and water resistance. Perfect for health-conscious individuals.', price: 75, quantity: 90 },
  { id: 15, name: 'Electric Toothbrush', description: 'Rechargeable electric toothbrush with multiple brushing modes. Provides effective cleaning and gum care. Features a timer, pressure sensor, and long battery life. Ideal for maintaining oral hygiene.', price: 60, quantity: 110 }
];

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(PRODUCTS);
  }),

  http.get('/api/products/:id', ({ params }) => {
    const productId = parseInt(params['id'] as string, 10);
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      return HttpResponse.json(product);
    } else {
      return new HttpResponse("", { status: 404 });
    }
  }),

  http.post('/api/products', async ({ request }) => {
    const newProduct = await request.json() as Product;
    PRODUCTS.push(newProduct);
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.put('/api/products/:id', async ({ params, request }) => {
    const updatedProduct = await request.json() as Product;
    const productId = parseInt(params['id'] as string, 10);
    const index = PRODUCTS.findIndex(p => p.id === productId);
    if (index !== -1) {
      PRODUCTS[index] = updatedProduct;
      return HttpResponse.json(updatedProduct);
    } else {
      return new HttpResponse("", { status: 404 });
    }
  }),

  http.get('/api/stocks', () => {
    const stockLevels: Stock[] = PRODUCTS.map(product => ({
      productId: product.id,
      productName: product.name,
      quantity: product.quantity
    }));
    return HttpResponse.json(stockLevels);
  }),
];
