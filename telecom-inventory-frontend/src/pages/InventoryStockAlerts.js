import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const InventoryStockAlerts = () => {
  const [alertData, setAlertData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      processData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const processData = (jsonData) => {
    const processedData = jsonData.map((row) => {
      const productName = row['ProductName'] || 'N/A';
      const currentStock = row['StockLevel'] || 0;
      const reorderLevel = row['ReorderPoint'] || 0;
      const supplier = row['Supplier Name'] || 'Unknown';

      let statusClass = '';
      let status = 'Sufficient';

      // Check for stock status and add alert for stock reaching 200
      if (currentStock <= 0) {
        status = 'Out of Stock';
        statusClass = 'out-of-stock';
      } else if (currentStock < reorderLevel) {
        status = 'Low Stock';
        statusClass = 'low-stock';
      } else if (currentStock === 300) {
        status = 'Stock Reached 200! Restock Recommended';
        statusClass = 'restock-alert'; // Custom class for stock 200 alert

        // Alert to admin for restock
        setTimeout(() => {
          alert(`Admin Alert: ${productName} stock has reached 200! Consider restocking.`);
        }, 10);

        // Alert to user to restock
        setTimeout(() => {
          alert(`User Alert: ${productName} stock has reached 200! Please consider restocking.`);
        }, 10);
      }

      return {
        productName,
        currentStock,
        reorderLevel,
        supplier,
        status,
        statusClass,
      };
    });

    setAlertData(processedData);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Inventory Stock Alerts</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ddd' }} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', padding: '10px', textAlign: 'justify' }}>Product Name</th>
            <th style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', padding: '10px', textAlign: 'justify' }}>Current Stock</th>
            <th style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', padding: '10px', textAlign: 'justify' }}>Reorder Level</th>
            <th style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', padding: '10px', textAlign: 'justify' }}>Supplier</th>
            <th style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', padding: '10px', textAlign: 'justify' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {alertData.length > 0 ? (
            alertData.map((row, index) => (
              <tr key={index} className={row.statusClass}>
                <td style={{ textAlign: 'justify', padding: '10px' }}>{row.productName}</td>
                <td style={{ textAlign: 'justify', padding: '10px' }}>{row.currentStock}</td>
                <td style={{ textAlign: 'justify', padding: '10px' }}>{row.reorderLevel}</td>
                <td style={{ textAlign: 'justify', padding: '10px' }}>{row.supplier}</td>
                <td style={{ textAlign: 'justify', padding: '10px' }}>{row.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#555' }}>No alerts to display</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Inline styles for different alert row colors */}
      <style>
        {`
          .out-of-stock {
            background-color: #f44336; /* Red */
            color: #fff;
          }
          
          .low-stock {
            background-color: #ff9800; /* Orange */
            color: #fff;
          }
          
          .restock-alert {
            background-color: #4caf50; /* Green */
            color: #fff;
          }
        `}
      </style>
    </div>
  );
};

export default InventoryStockAlerts;
