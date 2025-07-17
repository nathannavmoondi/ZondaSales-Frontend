import { apiService } from './ApiService';

export type Product = {
  id: number;
  customerId: number;
  name: string;
  price: number;
};

// Fallback mock data
const mockProducts: Product[] = [
  
];

export const ProductService = {
  async getProductsByCustomer(customerId: number): Promise<Product[]> {
    try {
      // Try to get products from API
      return await apiService.get<Product[]>(`/api/products/customer/${customerId}`);
    } catch (error) {
      console.warn('API unavailable, using mock data:', error);
      // Fallback to mock data if API is down
      return mockProducts.filter(p => p.customerId === customerId);
    }
  },

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      // Try to get product from API
      return await apiService.get<Product>(`/api/products/${id}`);
    } catch (error) {
      console.warn('API unavailable, using mock data:', error);
      // Fallback to mock data if API is down
      return mockProducts.find(p => p.id === id);
    }
  },

  async addProduct(product: Product): Promise<Product> {
    try {
      // Try to add product via API
      return await apiService.post<Product>('/api/products', product);
    } catch (error) {
      console.warn('API unavailable, adding to mock data:', error);
      // Fallback to mock data if API is down
      const newProduct = { ...product, id: Math.max(...mockProducts.map(p => p.id), 0) + 1 };
      mockProducts.push(newProduct);
      return newProduct;
    }
  },

  async updateProduct(product: Product): Promise<Product> {
    try {
      // Try to update product via API
      return await apiService.put<Product>(`/api/products/${product.id}`, product);
    } catch (error) {
      console.warn('API unavailable, updating mock data:', error);
      // Fallback to mock data if API is down
      const idx = mockProducts.findIndex(p => p.id === product.id);
      if (idx !== -1) mockProducts[idx] = product;
      return product;
    }
  },

  async deleteProduct(id: number): Promise<void> {
    try {
      // Try to delete product via API
      await apiService.delete(`/api/products/${id}`);
    } catch (error) {
      console.warn('API unavailable, deleting from mock data:', error);
      // Fallback to mock data if API is down
      const idx = mockProducts.findIndex(p => p.id === id);
      if (idx !== -1) mockProducts.splice(idx, 1);
    }
  },
};
