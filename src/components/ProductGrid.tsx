import { useZondaSales } from '../context/ZondaSalesContext';
import { ProductService, Product } from '../services/ProductService';
import { useEffect, useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InventoryIcon from '@mui/icons-material/Inventory';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProductGrid = () => {
  const { selectedCustomer, products, setProducts } = useZondaSales();
  const [sortField, setSortField] = useState<'id' | 'name' | 'price'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    if (selectedCustomer) {
      (async () => {
        const prods = await ProductService.getProductsByCustomer(selectedCustomer.id);
        setProducts(Array.isArray(prods) ? prods : []);
      })();
    } else {
      setProducts([]);
    }
    setPage(1); // Reset to first page when customer changes
  }, [selectedCustomer, setProducts]);

  const handleDelete = (product: { id: number; name: string }) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (productToDelete !== null) {
      await ProductService.deleteProduct(productToDelete.id);
      if (selectedCustomer) {
        const prods = await ProductService.getProductsByCustomer(selectedCustomer.id);
        setProducts(Array.isArray(prods) ? prods : []);
      }
    }
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
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

  const handleAddProduct = async () => {
    if (selectedCustomer && newProduct.name.trim() && newProduct.price) {
      const price = parseFloat(newProduct.price);
      if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price');
        return;
      }

      // Generate new ID (simple approach - in real app you'd use a proper ID generator)
      const maxId = Math.max(...(Array.isArray(products) ? products : []).map(p => p.id), 0);
      const product = {
        id: maxId + 1,
        customerId: selectedCustomer.id,
        name: newProduct.name.trim(),
        price: price
      };

      await ProductService.addProduct(product);
      const prods = await ProductService.getProductsByCustomer(selectedCustomer.id);
      setProducts(Array.isArray(prods) ? prods : []);
      setNewProduct({ name: '', price: '' });
      setOpenAddDialog(false);
      setPage(1); // Reset to first page
    }
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setNewProduct({ name: '', price: '' });
  };

  // Sort and paginate products
  const sortedAndPaginatedProducts = useMemo(() => {
    const arr = Array.isArray(products) ? products : [];
    const sorted = [...arr].sort((a, b) => {
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

  const totalPages = Math.ceil((Array.isArray(products) ? products.length : 0) / itemsPerPage);

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
        {/* Add Product Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2, 
          borderBottom: '1px solid #333',
          bgcolor: '#1a1a1a'
        }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Products for {selectedCustomer.name}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
            sx={{
              bgcolor: '#4caf50',
              '&:hover': {
                bgcolor: '#45a049'
              }
            }}
          >
            Add Product
          </Button>
        </Box>
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
              {Array.isArray(products) && products.length === 0 ? (
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
                      '&:nth-of-type(even)': { bgcolor: '#0a0a0a' },
                      cursor: 'pointer'
                    }}
                    onClick={e => {
                      // Prevent row click if delete button is clicked
                      if ((e.target as HTMLElement).closest('button')) return;
                      setEditProduct(product);
                      setOpenEditDialog(true);
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
                        onClick={() => handleDelete(product)} 
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

      {/* Add Product Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            color: 'white',
            minWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #333' }}>
          Add New Product
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#666',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ccc',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            inputProps={{ min: 0, step: 0.01 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#666',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ccc',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #333' }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ color: '#ccc' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddProduct}
            variant="contained"
            disabled={!newProduct.name.trim() || !newProduct.price}
            sx={{
              bgcolor: '#4caf50',
              '&:hover': {
                bgcolor: '#45a049'
              },
              '&:disabled': {
                bgcolor: '#666',
                color: '#999'
              }
            }}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => { setOpenEditDialog(false); setEditProduct(null); }}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            color: 'white',
            minWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #333' }}>
          Edit Product
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editProduct?.name || ''}
            onChange={e => setEditProduct((p: Product | null) => p ? { ...p, name: e.target.value } : p)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#666',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ccc',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={editProduct?.price ?? ''}
            onChange={e => setEditProduct((p: Product | null) => p ? { ...p, price: Number(e.target.value) } : p)}
            inputProps={{ min: 0, step: 0.01 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#666',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ccc',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #333' }}>
          <Button 
            onClick={() => { setOpenEditDialog(false); setEditProduct(null); }}
            sx={{ color: '#ccc' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={async () => {
              if (editProduct && editProduct.name.trim() && editProduct.price > 0) {
                await ProductService.updateProduct(editProduct);
                if (selectedCustomer) {
                  const prods = await ProductService.getProductsByCustomer(selectedCustomer.id);
                  setProducts(Array.isArray(prods) ? prods : []);
                }
                setOpenEditDialog(false);
                setEditProduct(null);
              }
            }}
            variant="contained"
            disabled={!editProduct || !editProduct.name.trim() || !editProduct.price}
            sx={{
              bgcolor: '#4caf50',
              '&:hover': {
                bgcolor: '#45a049'
              },
              '&:disabled': {
                bgcolor: '#666',
                color: '#999'
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={cancelDelete}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            color: 'white',
            minWidth: 350
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #333' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {productToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #333' }}>
          <Button onClick={cancelDelete} sx={{ color: '#ccc' }}>No</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">Yes</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductGrid; 