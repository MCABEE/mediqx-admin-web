// "use client"
// import Navlink from '@/components/productManagement/Navlink'

// import React from 'react'

// function page() {
  
//   return (
//     <div>
//         <Navlink/>
    

//       <div className='bg-white border border-[#8888888c] mt-2'>
//         <h1 className='font-semibold text-black  px-10 py-2'>Add Banner (Products Page) 1144x450px</h1>
//       </div>


//       <div className='bg-white w-full  h-[300px] rounded  border border-[#8888888c] flex justify-center items-center mt-2 relative'>
//         <h1 className='text-black'>1144 x 450 pixel size recommended</h1>
// <button className='text-black px-4 py-2 bg-gray-300 rounded-[15px] absolute bottom-4 right-4'>
//     Change Banner
// </button>
//       </div>
//       <button
//       className="mt-2 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center"
//       >
//         Save
//       </button>
//     </div>
//   )
// }

// export default page







// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useRef, useState } from "react";

// function Page() {
//   const fileInputRef = useRef(null);
//   const [preview, setPreview] = useState(null);
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files?.[0];
//     if (!selectedFile) return;

//     if (!selectedFile.type.startsWith("image/")) {
//       alert("Please upload a valid image");
//       return;
//     }

//     setFile(selectedFile);
//     setPreview(URL.createObjectURL(selectedFile));
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSave = () => {
//     if (!file) {
//       alert("Please upload a banner image");
//       return;
//     }

//     // 🔹 API call can be added here
//     console.log("Uploaded banner file:", file);
//   };

//   return (
//     <div>
//       <Navlink />

//       {/* Title */}
//       <div className="bg-white border border-[#8888888c] mt-2">
//         <h1 className="font-semibold text-black px-10 py-2">
//           Add Banner (Products Page) 1144x450px
//         </h1>
//       </div>

//       {/* Banner Upload Box */}
//       <div className="bg-white w-full h-[300px] rounded border border-[#8888888c] flex justify-center items-center mt-2 relative overflow-hidden">
//         {preview ? (
//           <img
//             src={preview}
//             alt="Banner Preview"
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <h1 className="text-black">1144 x 450 pixel size recommended</h1>
//         )}

//         {/* Upload Button */}
//         <button
//           onClick={handleUploadClick}
//           className="text-black px-4 py-2 bg-gray-300 rounded-[15px] absolute bottom-4 right-4"
//         >
//           Change Banner
//         </button>

//         {/* Hidden File Input */}
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </div>

//       {/* Save Button */}
//       <button
//         onClick={handleSave}
//         className="mt-2 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center"
//       >
//         Save
//       </button>
//     </div>
//   );
// }

// export default Page;












"use client";

import useProductBannerStore from "@/app/lib/store/productBannerStore";
import Navlink from "@/components/productManagement/Navlink";
import React, { useEffect, useRef, useState } from "react";

function Page() {
  const fileInputRef = useRef(null);

  const {
    bannerId,
    bannerImage,
    fetchBanner,
    generateUploadUrl,
    confirmUpload,
  } = useProductBannerStore();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBanner(1, 10);
  }, [fetchBanner]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!file || !bannerId) {
      alert("Banner or Banner ID missing");
      return;
    }

    try {
      setUploading(true);

      const { signedUrl, fileId } = await generateUploadUrl({
        bannerId,
        fileName: file.name,
        contentType: file.type,
        type: "PRODUCTS_PAGE_BANNER",
      });

      await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      await confirmUpload(fileId, "PRODUCTS_PAGE_BANNER");

      await fetchBanner(1, 10);
      setFile(null);
      setPreview(null);

      alert("Banner updated successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Navlink />

      {/* Title */}
      <div className="bg-white border border-[#8888888c] mt-2">
        <h1 className="font-semibold text-black px-10 py-2">
          Add Banner (Products Page) 1144x450px
        </h1>
      </div>

      {/* Banner Box */}
      <div className="bg-white w-full h-[300px] rounded border border-[#8888888c] flex justify-center items-center mt-2 relative overflow-hidden">
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" />
        ) : bannerImage ? (
          <img src={bannerImage} className="w-full h-full object-cover" />
        ) : (
          <h1 className="text-black">1144 x 450 pixel size recommended</h1>
        )}

        <button
          onClick={handleUploadClick}
          className="absolute bottom-4 right-4 px-4 py-2 bg-gray-300 rounded-[15px]"
        >
          Change Banner
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Save Button */}
      <button
        disabled={uploading}
        onClick={handleSave}
        className="mt-2 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Save"}
      </button>
    </div>
  );
}

export default Page;
