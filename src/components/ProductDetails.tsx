import { useZondaSales } from '../context/ZondaSalesContext';
import { ProductService } from '../services/ProductService';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import ProductGrid from './ProductGrid';

const ProductDetails = () => {
  const { selectedCustomer, products, setProducts } = useZondaSales();

  useEffect(() => {
    if (selectedCustomer) {
      (async () => {
        const prods = await ProductService.getProductsByCustomer(selectedCustomer.id);
        setProducts(Array.isArray(prods) ? prods : []);
      })();
    } else {
      setProducts([]);
    }
  }, [selectedCustomer, setProducts]);

  const totalValue = Array.isArray(products) ? products.reduce((sum, product) => sum + product.price, 0) : 0;

  if (!selectedCustomer) {
    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          textAlign: 'center'
        }}
      >
        <InventoryIcon sx={{ fontSize: 80, color: '#666', mb: 2 }} />
        <Typography variant="h5" color="gray.400" gutterBottom>
          No Customer Selected
        </Typography>
        <Typography variant="body1" color="gray.500">
          Please select a customer from the dropdown to view their products
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="bg-black text-white">
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, marginTop: '20px', marginLeft: '20px'}}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
            Product Inventory
          </Typography>
          <Typography variant="body1" color="gray.400">
            Managing products for {selectedCustomer.name}
          </Typography>
        </Box>      
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Card sx={{ 
          bgcolor: '#1a1a1a', 
          border: '1px solid #333',
          borderRadius: 2,
          flex: 1,
          maxWidth: 200
        }}>
          <CardContent sx={{ p: 2, textAlign: 'center' }}>
            <InventoryIcon sx={{ fontSize: 24, color: '#1565c0', mb: 0.5 }} />
            <Typography variant="h5" sx={{ color: 'white', mb: 0.5 }}>
              {products.length}
            </Typography>
            <Typography variant="body2" color="gray.400">
              Total Products
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ 
          bgcolor: '#1a1a1a', 
          border: '1px solid #333',
          borderRadius: 2,
          flex: 1,
          maxWidth: 200
        }}>
          <CardContent sx={{ p: 2, textAlign: 'center' }}>
            <AttachMoneyIcon sx={{ fontSize: 24, color: '#4caf50', mb: 0.5 }} />
            <Typography variant="h5" sx={{ color: 'white', mb: 0.5 }}>
              ${totalValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="gray.400">
              Total Value
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Products Table */}
      <ProductGrid />
    </Box>
  );
};

export default ProductDetails;
