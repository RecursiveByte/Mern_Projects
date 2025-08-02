import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditBookModal = ({ setShowEdit,currBook,updateCurrBook }) => {
  const [title, setTitle] = useState(currBook.title || "");
  const [author, setAuthor] = useState(currBook.author || "");

  
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleUpdate = async () => {
    try {
      const book_id = currBook.book_id; 

      const response = await axios.patch(
        `${url}/editBook`,
        {
          title,
          author,
          book_id
        },
        { withCredentials: true }
      );

      setShowEdit(false);
      await updateCurrBook(); 
      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error("Failed to update book. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">✏️ Edit Book</h2>

        <label className="block mb-2 text-gray-600 font-medium">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
        />

        <label className="block mb-2 text-gray-600 font-medium">Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowEdit(false)}

            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
