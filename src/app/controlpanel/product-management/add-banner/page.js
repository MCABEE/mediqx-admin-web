"use client";

import useProductBannerStore from "@/app/lib/store/productBannerStore";
import Navlink from "@/components/productManagement/Navlink";
import React, { useRef, useState } from "react";

function Page() {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null); // success | error
  const [message, setMessage] = useState("");

  const { uploadProductBanner, uploading } = useProductBannerStore();

  const onFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected || !selected.type.startsWith("image/")) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setStatus(null);
    setMessage("");
  };

  const handleSave = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Please upload a banner image");
      return;
    }

    const success = await uploadProductBanner(file);

    if (success) {
      setStatus("success");
      setMessage("Banner uploaded successfully");
    } else {
      setStatus("error");
      setMessage("Banner upload failed. Please try again.");
    }
  };

  return (
    <div>
      <Navlink />

      {/* TITLE */}
      <div className="bg-white border border-[#8888888c]  mt-2">
        <h1 className="font-semibold px-10 py-2">
          Add Banner (Products Page) 1144 × 450
        </h1>
      </div>

      {/* BANNER */}
      <div className="bg-white  h-[450px] mt-2 border border-[#8888888c]  rounded-[15px] overflow-hidden relative flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-cover"
            alt="banner-preview"
          />
        ) : (
          <p className="text-gray-500">1144 × 450 recommended</p>
        )}

        <button
          onClick={() => fileRef.current.click()}
          className="absolute bottom-4 right-4 px-4 py-2 bg-gray-300 rounded-[15px]"
        >
          Change Banner
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={uploading}
        className="mt-4 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "Save"}
      </button>

      {/* STATUS MESSAGE */}
      {message && (
        <p
          className={`mt-2 text-sm ${
            status === "success" ? "text-blue-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Page;
