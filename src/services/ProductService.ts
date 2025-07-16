export type Product = {
  id: number;
  customerId: number;
  name: string;
  price: number;
};

const products: Product[] = [
  // Customer 1 - Mary Adams (existing products)
  { id: 1, customerId: 1, name: 'CPU', price: 500 },
  { id: 2, customerId: 1, name: 'Monitor', price: 130 },
  { id: 3, customerId: 1, name: 'RAM', price: 200 },
  { id: 4, customerId: 1, name: 'Keyboard', price: 50 },
  { id: 5, customerId: 1, name: 'Mouse', price: 30 },
  
  // Customer 1 - Additional products
  { id: 9, customerId: 1, name: 'Graphics Card', price: 450 },
  { id: 10, customerId: 1, name: 'SSD 1TB', price: 120 },
  { id: 11, customerId: 1, name: 'Motherboard', price: 180 },
  { id: 12, customerId: 1, name: 'Power Supply', price: 85 },
  { id: 13, customerId: 1, name: 'CPU Cooler', price: 65 },
  { id: 14, customerId: 1, name: 'Case Fan', price: 25 },
  { id: 15, customerId: 1, name: 'Network Card', price: 40 },
  { id: 16, customerId: 1, name: 'Sound Card', price: 75 },
  { id: 17, customerId: 1, name: 'Webcam', price: 35 },
  { id: 18, customerId: 1, name: 'Microphone', price: 45 },
  
  // Customer 2 - Rob Smith (existing products)
  { id: 6, customerId: 2, name: 'Laptop', price: 900 },
  { id: 7, customerId: 2, name: 'Tablet', price: 300 },
  
  // Customer 2 - Additional products
  { id: 19, customerId: 2, name: 'External Hard Drive', price: 95 },
  { id: 20, customerId: 2, name: 'USB Hub', price: 20 },
  { id: 21, customerId: 2, name: 'Wireless Mouse', price: 35 },
  { id: 22, customerId: 2, name: 'Bluetooth Keyboard', price: 60 },
  { id: 23, customerId: 2, name: 'Laptop Stand', price: 45 },
  { id: 24, customerId: 2, name: 'Laptop Cooling Pad', price: 30 },
  { id: 25, customerId: 2, name: 'USB-C Cable', price: 15 },
  { id: 26, customerId: 2, name: 'HDMI Cable', price: 12 },
  { id: 27, customerId: 2, name: 'Laptop Sleeve', price: 25 },
  { id: 28, customerId: 2, name: 'Wireless Headphones', price: 80 },
  
  // Customer 3 - Henry Chau (existing products)
  { id: 8, customerId: 3, name: 'Printer', price: 150 },
  
  // Customer 3 - Additional products
  { id: 29, customerId: 3, name: 'Scanner', price: 120 },
  { id: 30, customerId: 3, name: 'Document Camera', price: 85 },
  { id: 31, customerId: 3, name: 'Label Printer', price: 65 },
  { id: 32, customerId: 3, name: '3D Printer', price: 350 },
  { id: 33, customerId: 3, name: 'Printer Ink Cartridges', price: 45 },
  { id: 34, customerId: 3, name: 'Paper Tray', price: 30 },
  { id: 35, customerId: 3, name: 'Wireless Print Server', price: 55 },
  { id: 36, customerId: 3, name: 'Printer Stand', price: 40 },
  { id: 37, customerId: 3, name: 'Photo Paper', price: 25 },
];

export const ProductService = {
  getProductsByCustomer: (customerId: number) => products.filter(p => p.customerId === customerId),
  getProductById: (id: number) => products.find(p => p.id === id),
  addProduct: (product: Product) => {
    products.push(product);
  },
  updateProduct: (product: Product) => {
    const idx = products.findIndex(p => p.id === product.id);
    if (idx !== -1) products[idx] = product;
  },
  deleteProduct: (id: number) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) products.splice(idx, 1);
  },
};
