export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const customers: Customer[] = [
  { id: 1, name: 'Mary Adams', email: 'madams@gmail.com', phone: '123-456-7890' },
  { id: 2, name: 'Rob Smith', email: 'rsmith@email.com', phone: '234-567-8901' },
  { id: 3, name: 'Henry Chau', email: 'superheny@hotmail.com', phone: '345-678-9012' },
];

export const CustomerService = {
  getCustomers: () => customers,
  getCustomerById: (id: number) => customers.find(c => c.id === id),
};
