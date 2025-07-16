import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Customer } from '../services/CustomerService';
import type { Product } from '../services/ProductService';

interface ZondaSalesContextType {
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const ZondaSalesContext = createContext<ZondaSalesContextType | undefined>(undefined);

export const useZondaSales = () => {
  const context = useContext(ZondaSalesContext);
  if (!context) throw new Error('useZondaSales must be used within ZondaSalesProvider');
  return context;
};

export const ZondaSalesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ZondaSalesContext.Provider value={{ selectedCustomer, setSelectedCustomer, products, setProducts }}>
      {children}
    </ZondaSalesContext.Provider>
  );
};
