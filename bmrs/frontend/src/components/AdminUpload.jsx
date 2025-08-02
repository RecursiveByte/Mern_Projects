import React from "react";
import MyDropzone from "./ImageDropBox";

const AdminUpload = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full border border-gray-300 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          🖼️ Upload Book Images
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Admin can upload images of books here.
          <br />
          <span className="text-red-500 font-semibold">⚠️ Important:</span>{" "}
          The <span className="font-medium text-green-600">image name</span>{" "}
          must match the <span className="underline">book title</span> exactly. This is{" "}
          <span className="text-red-600 font-bold">mandatory</span> for correct association.
        </p>

        <MyDropzone />
      </div>
    </div>
  );
};

export default AdminUpload;
