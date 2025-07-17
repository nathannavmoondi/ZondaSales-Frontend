import { useZondaSales } from '../context/ZondaSalesContext';
import { ProductService } from '../services/ProductService';
import { useEffect, useState, useMemo } from 'react';
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
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const ProductGrid = () => {
  const { selectedCustomer, products, setProducts } = useZondaSales();
  const [sortField, setSortField] = useState<'id' | 'name' | 'price'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (selectedCustomer) {
      setProducts(ProductService.getProductsByCustomer(selectedCustomer.id));
    } else {
      setProducts([]);
    }
    setPage(1); // Reset to first page when customer changes
  }, [selectedCustomer, setProducts]);

  const handleDelete = (id: number) => {
    ProductService.deleteProduct(id);
    if (selectedCustomer) {
      setProducts(ProductService.getProductsByCustomer(selectedCustomer.id));
    }
  };

  const handleSort = (field: 'id' | 'name' | 'price') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1); // Reset to first page when sorting
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Sort and paginate products
  const sortedAndPaginatedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    const startIndex = (page - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  }, [products, sortField, sortDirection, page]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

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
                  borderColor: '#333',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => handleSort('id')}
                >
                  Product ID
                  {sortField === 'id' && (
                    <span style={{ marginLeft: '4px', color: 'white' }}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </TableCell>
                <TableCell sx={{ 
                  borderColor: '#333',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => handleSort('name')}
                >
                  Product Name
                  {sortField === 'name' && (
                    <span style={{ marginLeft: '4px', color: 'white' }}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </TableCell>
                <TableCell sx={{ 
                  borderColor: '#333',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => handleSort('price')}
                >
                  Price
                  {sortField === 'price' && (
                    <span style={{ marginLeft: '4px', color: 'white' }}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
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
                sortedAndPaginatedProducts.map((product) => (
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
        
        {/* Pagination */}
        {products.length > itemsPerPage && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 2, 
            borderTop: '1px solid #333',
            bgcolor: '#1a1a1a'
          }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                  '&.Mui-selected': {
                    bgcolor: '#1565c0',
                    color: 'white'
                  },
                  '&:hover': {
                    bgcolor: '#4b5563'
                  }
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductGrid; 