import { useZondaSales } from '../context/ZondaSalesContext';
import { ProductService } from '../services/ProductService';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ProductDetails = () => {
  const { selectedCustomer, products, setProducts } = useZondaSales();

  useEffect(() => {
    if (selectedCustomer) {
      setProducts(ProductService.getProductsByCustomer(selectedCustomer.id));
    } else {
      setProducts([]);
    }
  }, [selectedCustomer, setProducts]);

  const handleDelete = (id: number) => {
    ProductService.deleteProduct(id);
    if (selectedCustomer) {
      setProducts(ProductService.getProductsByCustomer(selectedCustomer.id));
    }
  };

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
            Product Inventory
          </Typography>
          <Typography variant="body1" color="gray.400">
            Managing products for {selectedCustomer.name}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            bgcolor: '#1565c0',
            '&:hover': { bgcolor: '#0d47a1' },
            px: 3,
            py: 1.5,
            borderRadius: 2
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        <Card sx={{ 
          bgcolor: '#1a1a1a', 
          border: '1px solid #333',
          borderRadius: 2,
          flex: 1
        }}>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <InventoryIcon sx={{ fontSize: 40, color: '#1565c0', mb: 1 }} />
            <Typography variant="h4" sx={{ color: 'white', mb: 0.5 }}>
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
          flex: 1
        }}>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <AttachMoneyIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
            <Typography variant="h4" sx={{ color: 'white', mb: 0.5 }}>
              ${totalValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="gray.400">
              Total Value
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Products Table */}
      <Card sx={{ 
        bgcolor: 'black', 
        border: '1px solid #333',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#1a1a1a' }}>
                  <TableCell sx={{ 
                    color: 'white', 
                    borderColor: '#333',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    Product ID
                  </TableCell>
                  <TableCell sx={{ 
                    color: 'white', 
                    borderColor: '#333',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ 
                    color: 'white', 
                    borderColor: '#333',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ 
                    color: 'white', 
                    borderColor: '#333',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ 
                      textAlign: 'center', 
                      color: 'gray.400',
                      borderColor: '#333',
                      py: 4
                    }}>
                      <InventoryIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                      <Typography variant="h6">No products found</Typography>
                      <Typography variant="body2">Add some products to get started</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow 
                      key={product.id} 
                      sx={{ 
                        '&:hover': { bgcolor: '#1a1a1a' },
                        '&:nth-of-type(even)': { bgcolor: '#0a0a0a' }
                      }}
                    >
                      <TableCell sx={{ 
                        color: 'white', 
                        borderColor: '#333',
                        fontWeight: 'bold'
                      }}>
                        #{product.id}
                      </TableCell>
                      <TableCell sx={{ 
                        color: 'white', 
                        borderColor: '#333',
                        fontSize: '1rem'
                      }}>
                        {product.name}
                      </TableCell>
                      <TableCell sx={{ 
                        color: '#4caf50', 
                        borderColor: '#333',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}>
                        ${product.price.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ 
                        borderColor: '#333',
                        textAlign: 'center'
                      }}>
                        <IconButton 
                          onClick={() => handleDelete(product.id)} 
                          color="error"
                          sx={{ 
                            '&:hover': { 
                              bgcolor: 'rgba(244, 67, 54, 0.1)' 
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetails;
