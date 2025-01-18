import React, { useState } from "react";
import { getPlanById, getUserById } from "../../services/api";

const CreateModal = ({ isOpen, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    plan_id: "",
    special_requirement: "",
    additional_price: 0,
  });

  const [errors, setErrors] = useState({});
  const [errorModal, setErrorModal] = useState(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData({
      user_id: "",
      plan_id: "",
      special_requirement: "",
      additional_price: 0,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    const idPattern = /^[a-zA-Z0-9]+$/;

    if (!formData.user_id) {
      newErrors.user_id = "User ID is required.";
    } else if (!idPattern.test(formData.user_id)) {
      newErrors.user_id = "User ID can only contain letters and numbers.";
    }

    if (!formData.plan_id) {
      newErrors.plan_id = "Plan ID is required.";
    } else if (!idPattern.test(formData.plan_id)) {
      newErrors.plan_id = "Plan ID can only contain letters and numbers.";
    }

    if (!formData.special_requirement) {
      newErrors.special_requirement = "Special requirement is required.";
    }

    if (formData.additional_price === null || formData.additional_price < 0) {
      newErrors.additional_price = "Additional price must be valid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const plan = await getPlanById(formData.plan_id);
      if (!plan) {
        setErrorModal("Plan ID not found.");
        return;
      }

      const user = await getUserById(formData.user_id);
      if (!user) {
        setErrorModal("User ID not found.");
        return;
      }

      const final_price = plan.price + parseFloat(formData.additional_price);

      onSave({
        ...formData,
        final_price,
      });

      resetForm();
    } catch (error) {
      console.error("Error creating sale:", error);
      setErrorModal("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Create New Sale</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              id="user_id"
              type="text"
              value={formData.user_id}
              onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
              placeholder="Enter User ID"
              className={`w-full px-4 py-2 border rounded ${
                errors.user_id ? "border-red-500" : ""
              }`}
            />
            {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
          </div>

          <div>
            <label htmlFor="plan_id" className="block text-sm font-medium text-gray-700">
              Plan ID
            </label>
            <input
              id="plan_id"
              type="text"
              value={formData.plan_id}
              onChange={(e) => setFormData({ ...formData, plan_id: e.target.value })}
              placeholder="Enter Plan ID"
              className={`w-full px-4 py-2 border rounded ${
                errors.plan_id ? "border-red-500" : ""
              }`}
            />
            {errors.plan_id && <p className="text-red-500 text-sm">{errors.plan_id}</p>}
          </div>

          <div>
            <label htmlFor="special_requirement" className="block text-sm font-medium text-gray-700">
              Special Requirement
            </label>
            <input
              id="special_requirement"
              type="text"
              value={formData.special_requirement}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  special_requirement: e.target.value,
                })
              }
              placeholder="Enter Special Requirement"
              className={`w-full px-4 py-2 border rounded ${
                errors.special_requirement ? "border-red-500" : ""
              }`}
            />
            {errors.special_requirement && (
              <p className="text-red-500 text-sm">{errors.special_requirement}</p>
            )}
          </div>

          <div>
            <label htmlFor="additional_price" className="block text-sm font-medium text-gray-700">
              Additional Price
            </label>
            <input
              id="additional_price"
              type="number"
              value={formData.additional_price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  additional_price: parseFloat(e.target.value),
                })
              }
              placeholder="Enter Additional Price"
              className={`w-full px-4 py-2 border rounded ${
                errors.additional_price ? "border-red-500" : ""
              }`}
            />
            {errors.additional_price && (
              <p className="text-red-500 text-sm">{errors.additional_price}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => {
              resetForm();
              onCancel();
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>

      {errorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="text-red-500 font-bold">{errorModal}</p>
            <button
              onClick={() => setErrorModal(null)}
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModal;
