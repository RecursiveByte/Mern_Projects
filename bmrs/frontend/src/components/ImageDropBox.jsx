import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyDropzone() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false); 

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: true,
  });

  const onUpload = async () => {
    if (files.length === 0) return;

    setLoading(true); // Start loading
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const url = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(`${url}/uploadImages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Images uploaded successfully!");
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      toast.error("Failed to upload images.");
      console.error("Upload error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-md  mx-auto mt-0">
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed gray",
          padding: "20px",
          cursor: "pointer",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop images here, or click to select files</p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 list-disc pl-5">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}

      <div className="flex justify-center items-center mt-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white font-semibold hover:bg-blue-600 transition"
          onClick={onUpload}
          disabled={files.length === 0 || loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
