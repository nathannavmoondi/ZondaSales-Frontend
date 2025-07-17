


import { List, ListItem, Tabs, Tab, Select, MenuItem, FormControl } from '@mui/material';
import { CustomerService } from '../services/CustomerService';
import { useZondaSales } from '../context/ZondaSalesContext';
import { useState, useEffect } from 'react';
import type { Customer } from '../services/CustomerService';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';

interface SidebarProps {
  selectedTab: number | null;
  onTabChange: (tab: number) => void;
}

const Sidebar = ({ selectedTab, onTabChange }: SidebarProps) => {
  const { selectedCustomer, setSelectedCustomer } = useZondaSales();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await CustomerService.getCustomers();
        setCustomers(Array.isArray(data) ? data : []);
      } catch {
        setCustomers([]);
      }
    })();
  }, []);

  const handleCustomerChange = async (customerId: string | number) => {
    if (customerId === "") {
      setSelectedCustomer(null);
      return;
    }
    const customer = await CustomerService.getCustomerById(Number(customerId));
    setSelectedCustomer(customer || null);
  };

  return (
    <div className="bg-gray-800 text-white p-4 pt-6 pl-6 h-full flex flex-col">
      <div className="mb-6">
        <FormControl fullWidth size="small">
          <Select
            value={
              selectedCustomer && customers.some(c => c.id === selectedCustomer.id)
                ? selectedCustomer.id
                : ''
            }
            onChange={e => { handleCustomerChange(e.target.value); }}
            sx={{ 
              color: 'white',
              marginTop: '20px',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '.MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="" disabled>(Select Customer)</MenuItem>
            {Array.isArray(customers) && customers.map(customer => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
      <List>
        <ListItem disablePadding>
          <Tabs
            value={selectedTab || false}
            onChange={(_, v) => onTabChange(v)}
            orientation="vertical"
            sx={{
              '.MuiTabs-indicator': { backgroundColor: '#90cdf4' },
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-start', minHeight: 56, pl: 1 }}>
                  <PersonIcon sx={{ fontSize: 28, verticalAlign: 'middle' }} />
                  <span style={{ textAlign: 'left', fontSize: 20, lineHeight: 1, display: 'inline-block', verticalAlign: 'middle', fontWeight: 500 }}>CUSTOMER INFO</span>
                </Box>
              }
              sx={{ 
                bgcolor: selectedTab === 0 ? '#6b7280' : 'inherit', 
                color: 'white !important',
                justifyContent: 'flex-start',
                textAlign: 'left',
                paddingLeft: 0,
                minHeight: 56,
                '&.Mui-selected': { color: 'white !important' },
                '&:hover': { bgcolor: selectedTab === 0 ? '#6b7280' : '#4b5563' }
              }} 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-start', minHeight: 56, pl: 1 }}>
                  <InventoryIcon sx={{ fontSize: 28, verticalAlign: 'middle' }} />
                  <span style={{ textAlign: 'left', fontSize: 20, lineHeight: 1, display: 'inline-block', verticalAlign: 'middle', fontWeight: 500 }}>PRODUCT DETAILS</span>
                </Box>
              }
              sx={{ 
                bgcolor: selectedTab === 1 ? '#6b7280' : 'inherit', 
                color: 'white !important',
                justifyContent: 'flex-start',
                textAlign: 'left',
                paddingLeft: 0,
                minHeight: 56,
                '&.Mui-selected': { color: 'white !important' },
                '&:hover': { bgcolor: selectedTab === 1 ? '#6b7280' : '#4b5563' }
              }} 
            />
          </Tabs>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
