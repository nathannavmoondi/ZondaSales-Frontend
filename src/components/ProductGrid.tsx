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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InventoryIcon from '@mui/icons-material/Inventory';

const ProductGrid = () => {
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

  if (!selectedCustomer) {
    return (
      <div className="text-gray-400">Select a customer to view products.</div>
    );
  }

  return (
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
  );
};

export default ProductGrid; 