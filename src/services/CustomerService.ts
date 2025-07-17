import { apiService } from './ApiService';

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

// Fallback mock data
const mockCustomers: Customer[] = [
  { id: 1, name: 'Mary FrontEnd Adams', email: 'madams@gmail.com', phone: '123-456-7890' },
  { id: 2, name: 'Rob Smith', email: 'rsmith@email.com', phone: '234-567-8901' },
  { id: 3, name: 'Henry Chau', email: 'superheny@hotmail.com', phone: '345-678-9012' },
];

export const CustomerService = {
  async getCustomers(): Promise<Customer[]> {
    try {
      // Try to get customers from API
      return await apiService.get<Customer[]>('/api/customers');
    } catch (error) {
      console.warn('API unavailable, using mock data:', error);
      // Fallback to mock data if API is down
      return mockCustomers;
    }
  },

  async getCustomerById(id: number): Promise<Customer | undefined> {
    try {
      // Try to get customer from API
      return await apiService.get<Customer>(`/api/customers/${id}`);
    } catch (error) {
      console.warn('API unavailable, using mock data:', error);
      // Fallback to mock data if API is down
      return mockCustomers.find(c => c.id === id);
    }
  },
};
