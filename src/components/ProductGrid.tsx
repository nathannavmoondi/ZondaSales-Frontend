import { useEffect, useState } from 'react';
import { ProductService } from '../services/ProductService';
import type { Product } from '../services/ProductService';

const PAGE_SIZE = 5;
const ProductGrid = ({ customerId }: { customerId?: number }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<'id'|'name'|'price'>('id');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc');

  useEffect(() => {
    if (customerId) {
      setProducts(ProductService.getProductsByCustomer(customerId));
    } else {
      setProducts([]);
    }
    setPage(0);
  }, [customerId]);

  // Sorting
  const sorted = [...products].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Pagination controls
  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  return (
    <div className="bg-black rounded-lg shadow p-4 text-white border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-white">Products ({products.length})</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-800">
            <th className="cursor-pointer px-2 py-1 text-white" onClick={() => {
              setSortBy('id'); setSortDir(sortBy === 'id' && sortDir === 'asc' ? 'desc' : 'asc');
            }}>ProductID {sortBy === 'id' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
            <th className="cursor-pointer px-2 py-1 text-white" onClick={() => {
              setSortBy('name'); setSortDir(sortBy === 'name' && sortDir === 'asc' ? 'desc' : 'asc');
            }}>ProductName {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
            <th className="cursor-pointer px-2 py-1 text-white" onClick={() => {
              setSortBy('price'); setSortDir(sortBy === 'price' && sortDir === 'asc' ? 'desc' : 'asc');
            }}>ProductPrice {sortBy === 'price' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
            <th className="px-2 py-1 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paged.map(product => (
            <tr key={product.id} className="border-b border-gray-700">
              <td className="px-2 py-1 text-white">{product.id}</td>
              <td className="px-2 py-1 text-white">{product.name}</td>
              <td className="px-2 py-1 text-white">{product.price}</td>
              <td className="px-2 py-1">
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-2">
        <div>
          <select value={PAGE_SIZE} className="border rounded px-2 py-1 text-white bg-gray-800 border-gray-600" disabled>
            <option>5 items per page</option>
          </select>
        </div>
        <div className="space-x-2 text-white">
          <span>{page * PAGE_SIZE + 1} - {Math.min((page + 1) * PAGE_SIZE, products.length)} of {products.length}</span>
          <button onClick={() => setPage(page - 1)} disabled={page === 0} className="px-2 text-white">{'<'}</button>
          <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} className="px-2 text-white">{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid; 