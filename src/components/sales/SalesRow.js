import React from 'react';
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const SalesRow = ({ sale, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-200">
      <td className="px-4 py-2">{sale._id}</td>
      <td className="px-4 py-2">{sale.user_id}</td>
      <td className="px-4 py-2">{sale.plan_id}</td>
      <td className="px-4 py-2">{sale.special_requirement}</td>
      <td className="px-4 py-2">{sale.additional_price}</td>
      <td className="px-4 py-2">{sale.final_price}</td>
      <td className="px-4 py-2 flex space-x-2">
        <button
          onClick={() => onEdit(sale)}
          className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center space-x-2"
        >
          <FaPencilAlt />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(sale._id)}
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-2"
        >
          <FaTrash />
          <span>Delete</span>
        </button>
      </td>
    </tr>
  );
};

export default SalesRow;
