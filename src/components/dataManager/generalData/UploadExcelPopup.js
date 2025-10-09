"use client";

import React, { useState } from "react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";

function UploadExcelPopup({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const {
    generateUploadUrlDetail,
    confirmFileUpload,
    processExcelFile,
  } = useNurseRegistrationStore();

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid Excel file (.xls or .xlsx)");
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
    console.log("📁 Selected file:", file.name, file.type, file.size);
  };

  // Handle Upload + Confirm + Process Excel
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an Excel file first");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found. Please login again.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      console.log("🔹 Starting Excel upload for userId:", userId);

      //  Generate signed URL
      const { signedUrl, fileId } = await generateUploadUrlDetail({
        userId,
        fileName: selectedFile.name,
        contentType: selectedFile.type,
        type: "EXCEL_UPLOAD",
      });
      console.log("🔹 Generated signed URL:", signedUrl);
      console.log("🔹 Generated fileId:", fileId);

      //  Upload to S3
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");
      console.log("✅ File uploaded to S3 successfully");

      // Confirm upload → returns { fileId }
      const { fileId: confirmedFileId } = await confirmFileUpload(fileId, "EXCEL_UPLOAD");
      console.log("✅ Upload confirmed. Confirmed fileId:", confirmedFileId);

      //  Process Excel file
      const processResponse = await processExcelFile(confirmedFileId);
      console.log("✅ Excel processed successfully:", processResponse);

    //   alert(`Excel uploaded and processed successfully! File ID: ${confirmedFileId}`);
      onClose();
    } catch (err) {
      console.error(" Upload or processing error:", err);
      setError("Failed to upload or process the Excel file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload Excel File
        </h2>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          <AiOutlineCloudUpload size={40} className="text-gray-500 mb-2" />
          <p className="text-gray-600 mb-2">
            {selectedFile ? selectedFile.name : "Select an Excel file (.xls/.xlsx)"}
          </p>

          <input
            type="file"
            accept=".xls,.xlsx"
            id="excel-upload"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label
            htmlFor="excel-upload"
            className={`bg-[#196BA5] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#145a8c] transition ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {selectedFile ? "Change File" : "Select File"}
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full mt-5 py-2 rounded-md text-white transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#196BA5] hover:bg-[#145a8c]"
          }`}
        >
          {uploading ? "Uploading..." : "Upload & Process"}
        </button>
      </div>
    </div>
  );
}

export default UploadExcelPopup;
