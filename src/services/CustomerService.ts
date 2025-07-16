export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const customers: Customer[] = [
  { id: 1, name: 'Customer 1', email: 'customer1@email.com', phone: '123-456-7890' },
  { id: 2, name: 'Customer 2', email: 'customer2@email.com', phone: '234-567-8901' },
  { id: 3, name: 'Customer 3', email: 'customer3@email.com', phone: '345-678-9012' },
];

export const CustomerService = {
  getCustomers: () => customers,
  getCustomerById: (id: number) => customers.find(c => c.id === id),
};
