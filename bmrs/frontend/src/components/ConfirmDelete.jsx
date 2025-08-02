import React from "react";

const ConfirmModal = ({
  setShowDelete,
  setIsDeleteClick,
}) => {


  return (
    <div className="fixed inset-0  flex justify-center items-center bg-transparent z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Confirm Action
        </h2>
        <p className="text-gray-700 mb-6">Are you sure</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setShowDelete(false);
              setIsDeleteClick(true);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setIsDeleteClick(false);
              setShowDelete(false);
              
            }}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
