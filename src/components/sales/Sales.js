import React, { useEffect, useState } from 'react';
import { getSales, createSale, updateSale, deleteSale } from '../../services/api';
import SalesRow from './SalesRow';
import EditModal from './EditModal';
import CreateModal from './CreateModal';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getSales();
      setSales(data);
    };

    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      await deleteSale(id);
      setSales(sales.filter((sale) => sale._id !== id));
    }
  };

  const handleEdit = async (updatedSale) => {
    await updateSale(updatedSale._id, updatedSale);
    setSales(
      sales.map((sale) => (sale._id === updatedSale._id ? updatedSale : sale))
    );
  };

  const handleCreate = async (newSale) => {
    const createdSale = await createSale(newSale);
    setSales([...sales, createdSale]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales</h2>
      <button
        onClick={() => setCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Sale
      </button>

      {/* Tabla de ventas */}
      <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Sale ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Plan ID</th>
            <th className="px-4 py-2">Special Requirement</th>
            <th className="px-4 py-2">Additional Price</th>
            <th className="px-4 py-2">Final Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <SalesRow
              key={sale._id}
              sale={sale}
              onEdit={(sale) => {
                setSelectedSale(sale);
                setEditModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      <EditModal
        sale={selectedSale}
        isOpen={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSave={(updatedSale) => {
          handleEdit(updatedSale);
          setEditModalOpen(false);
        }}
      />

      <CreateModal
        isOpen={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSave={(newSale) => {
          handleCreate(newSale);
          setCreateModalOpen(false);
        }}
      />
    </div>
  );
};

export default Sales;
