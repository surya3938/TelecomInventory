import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';

const Dashboard = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const products = getProducts();
    const lowStock = products.filter((product) => product.stockLevel <= product.reorderPoint);
    setLowStockProducts(lowStock);
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h2>Low Stock Alerts</h2>
      {lowStockProducts.length > 0 ? (
        lowStockProducts.map((product) => (
          <div key={product.id}>
            <p>{product.name} is low on stock! (Current: {product.stockLevel}, Reorder: {product.reorderPoint})</p>
          </div>
        ))
      ) : (
        <p>All products are adequately stocked.</p>
      )}
    </div>
  );
};

export default Dashboard;
