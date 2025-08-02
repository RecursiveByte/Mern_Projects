import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import axios from "axios";
import { toast } from "react-toastify";

const CSVUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");

  const url = import.meta.env.VITE_BACKEND_URL;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  });

  const handleUpload = async () => {
    
    try {
      const res = await axios.post(`${url}/addBook`, csvData,{withCredentials:true});
      toast.success("Books uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error uploading books.");
    }
  };

  return (
    <div className="p-4 border-2  relative top-15 border-dashed rounded-xl text-center">
      <div
        {...getRootProps()}
        className="cursor-pointer p-6 bg-gray-100 rounded-xl hover:bg-gray-200"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the CSV file here...</p>
        ) : (
          <p>Drag & drop your CSV here, or click to select file</p>
        )}
        {fileName && <p className="mt-2 text-sm text-gray-600">Selected: {fileName}</p>}
      </div>

      {csvData.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Upload {csvData.length} Books
          </button>
        </div>
      )}
    </div>
  );
};

export default CSVUploader;
