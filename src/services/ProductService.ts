export type Product = {
  id: number;
  customerId: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, customerId: 1, name: 'CPU', price: 500 },
  { id: 2, customerId: 1, name: 'Monitor', price: 130 },
  { id: 3, customerId: 1, name: 'RAM', price: 200 },
  { id: 4, customerId: 1, name: 'Keyboard', price: 50 },
  { id: 5, customerId: 1, name: 'Mouse', price: 30 },
  { id: 6, customerId: 2, name: 'Laptop', price: 900 },
  { id: 7, customerId: 2, name: 'Tablet', price: 300 },
  { id: 8, customerId: 3, name: 'Printer', price: 150 },
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
