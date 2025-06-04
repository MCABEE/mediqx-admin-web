// import React from 'react'

// function UploadCertificate() {
//   return (
//     <div>
//            <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Upload your Registration / Experience Certificates
//           </h1>
//           <div className="flex flex-col gap-5 mb-4">
//             <label
//               for="cv-upload"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
//             >
//               Nursing Certificate <img src="/upload-btn.svg" alt="" />
//               <input type="file" id="cv-upload" className="hidden" />
//             </label>
//             <label
//               for="cv-upload"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
//             >
//               Council Registration <img src="/upload-btn.svg" alt="" />
//               <input type="file" id="cv-upload" className="hidden" />
//             </label>
//             <label
//               for="cv-upload"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
//             >
//               Experience Certificates <img src="/upload-btn.svg" alt="" />
//               <input type="file" id="cv-upload" className="hidden" />
//             </label>
//             <label
//               for="cv-upload"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
//             >
//               Photo <img src="/upload-btn.svg" alt="" />
//               <input type="file" id="cv-upload" className="hidden" />
//             </label>
//           </div>
//     </div>
//   )
// }

// export default UploadCertificate











// "use client";
// import React, { useState } from "react";
// import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";// Adjust if needed

// function UploadCertificate() {
//   const {
//     generateUploadUrl,
//     confirmFileUpload,
//     setUploadedFile,
//   } = useNurseRegistrationStore();

//   const [fileNames, setFileNames] = useState({
//     nursingCertificate: "",
//     councilRegistration: "",
//     experienceCertificate: "",
//     photo: "",
//   });

//   const [uploading, setUploading] = useState(false);

//   const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

//   const handleFileUpload = (fieldKey, type) => async (event) => {
//     const file = event.target.files?.[0];
//     if (!file || !userId) return;

//     setFileNames((prev) => ({ ...prev, [fieldKey]: file.name }));
//     setUploading(true);

//     try {
//       // 1. Generate signed URL via Zustand store
//       const uploadData = await generateUploadUrl({
//         fileName: file.name,
//         contentType: file.type,
//         type,
//       });

//       // 2. Upload to S3
//       await fetch(uploadData.uploadUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": file.type,
//         },
//         body: file,
//       });

//       // 3. Confirm upload via store
//       await confirmFileUpload(uploadData.fileId);

//       // 4. Save fileId in store
//       setUploadedFile(fieldKey, uploadData.fileId);

//       console.log(`✅ ${fieldKey} uploaded & confirmed:`, uploadData.fileId);
//     } catch (err) {
//       console.error(`❌ Upload failed for ${fieldKey}:`, err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const inputs = [
//     {
//       label: "Nursing Certificate",
//       key: "nursingCertificate",
//       type: "NURSING_CERTIFICATE",
//     },
//     {
//       label: "Council Registration",
//       key: "councilRegistration",
//       type: "COUNCIL_REGISTRATION",
//     },
//     {
//       label: "Experience Certificates",
//       key: "experienceCertificate",
//       type: "EXPERIENCE_CERTIFICATE",
//     },
//     {
//       label: "Photo",
//       key: "photo",
//       type: "PASSPORT_IMAGE",
//     },
//   ];

//   return (
//     <div>
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Upload your Registration / Experience Certificates
//       </h1>

//       <div className="flex flex-col gap-5 mb-4">
//         {inputs.map(({ label, key, type }) => (
//           <label
//             key={key}
//             htmlFor={key}
//             className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
//           >
//             {fileNames[key] || label}
//             <img src="/upload-btn.svg" alt="upload" />
//             <input
//               type="file"
//               id={key}
//               accept=".pdf,.jpg,.jpeg,.png"
//               className="hidden"
//               onChange={handleFileUpload(key, type)}
//             />
//           </label>
//         ))}
//       </div>

//       {uploading && <p className="text-sm text-gray-600">Uploading...</p>}
//     </div>
//   );
// }

// export default UploadCertificate;














// "use client";
// import React, { useState } from "react";
// import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";

// function UploadCertificate() {
//   const {
//     userId,
//     generateUploadUrl,
//     confirmFileUpload,
//     setUploadedFile,
//   } = useNurseRegistrationStore();

//   const [fileNames, setFileNames] = useState({
//     nursingCertificate: "",
//     councilRegistration: "",
//     photo: "",
//   });

//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileUpload = (fieldKey, type) => async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     if (!userId) {
//       setError("⚠️ User ID is missing. Please register first.");
//       return;
//     }

//     setUploading(true);
//     setFileNames((prev) => ({ ...prev, [fieldKey]: file.name }));
//     setError("");

//    try {
//   // Get signed URL from backend
//   const { signedUrl, fileId } = await generateUploadUrl({
//     fileName: file.name,
//     contentType: file.type,
//     type,
//   });

//   // Upload the file to the signed URL (S3)
//   const uploadResponse = await fetch(signedUrl, {
//     method: "PUT",
//     headers: {
//       "Content-Type": file.type,
//     },
//     body: file,
//   });

//   if (!uploadResponse.ok) {
//     throw new Error("Failed to upload file to S3");
//   }

//   // Confirm the file upload to backend
//   await confirmFileUpload(fileId);

//   // Update Zustand store
//   setUploadedFile(fieldKey, fileId);

//   // Update file name for UI
//   setFileNames((prev) => ({ ...prev, [fieldKey]: file.name }));
// } catch (error) {
//   console.error(`❌ Upload failed for ${fieldKey}:`, error.message);
//   setError("File upload failed. Please try again.");
// } finally {
//   setUploading(false);
// }


//   const inputs = [
//     {
//       label: "Nursing Certificate",
//       key: "nursingCertificate",
//       type: "NURSING_CERTIFICATE",
//     },
//     {
//       label: "Council Registration",
//       key: "councilRegistration",
//       type: "COUNCIL_REGISTRATION",
//     },
//     {
//       label: "Passport Photo",
//       key: "photo",
//       type: "PASSPORT_IMAGE",
//     },
//   ];

//   const handleNext = () => {
//     if (!userId) {
//       setError("⚠️ User ID is missing. Please complete the registration step first.");
//       return;
//     }

//     const allUploaded = inputs.every((input) => fileNames[input.key]);
//     if (!allUploaded) {
//       setError("⚠️ Please upload all required documents.");
//       return;
//     }

//     setError("");
//     console.log("✅ Proceeding to next step");
//   };

//   return (
//     <div>
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Upload your Registration / Experience Certificates
//       </h1>

//       <div className="flex flex-col gap-5 mb-4">
//         {inputs.map(({ label, key, type }) => (
//           <label
//             key={key}
//             htmlFor={key}
//             className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
//           >
//             {fileNames[key] || label}
//             <img src="/upload-btn.svg" alt="upload" />
//             <input
//               type="file"
//               id={key}
//               accept=".pdf,.jpg,.jpeg,.png"
//               className="hidden"
//               onChange={handleFileUpload(key, type)}
//             />
//           </label>
//         ))}
//       </div>

//       <div className="flex flex-col items-end px-[42px] sm:px-0">
//         <button
//           onClick={handleNext}
//           disabled={uploading}
//           className={`text-[14px] sm:text-[20px] text-white px-[25px] sm:px-[88px] py-[6px] sm:py-[16px] rounded-[20px] mt-[32px] mb-[8px] ${
//             uploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#196BA5] cursor-pointer"
//           }`}
//         >
//           {uploading ? "Uploading..." : "Next"}
//         </button>

//         {error && (
//           <p className="text-red-600 text-sm sm:text-base font-medium mt-1">
//             {error}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UploadCertificate;










"use client";
import React, { useState } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";

function UploadCertificate() {
  const {
    userId,
    generateUploadUrl,
    confirmFileUpload,
    setUploadedFile,
  } = useNurseRegistrationStore();

  const [fileNames, setFileNames] = useState({
    nursingCertificate: "",
    councilRegistration: "",
    photo: "",
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (fieldKey, type) => async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!userId) {
      setError(" Please fill the above fileds first.");
      return;
    }

    setUploading(true);
    setFileNames((prev) => ({ ...prev, [fieldKey]: file.name }));
    setError("");

    try {
      const { signedUrl, fileId } = await generateUploadUrl({
        fileName: file.name,
        contentType: file.type,
        type,
      });

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      await confirmFileUpload(fileId);
      setUploadedFile(fieldKey, fileId);
    } catch (error) {
      console.error(`❌ Upload failed for ${fieldKey}:`, error.message);
      setError("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const inputs = [
    {
      label: "Nursing Certificate",
      key: "nursingCertificate",
      type: "NURSING_CERTIFICATE",
    },
    {
      label: "Council Registration",
      key: "councilRegistration",
      type: "COUNCIL_REGISTRATION",
    },
     {
      label: " Experience Certificate",
      key: "experienceCertificate",
      type: "AVATAR",
    },
    {
      label: "Passport Photo",
      key: "photo",
      type: "PASSPORT_IMAGE",
    },
  ];

  const handleNext = () => {
    if (!userId) {
      setError("⚠️ User ID is missing. Please complete the registration step first.");
      return;
    }

    const allUploaded = inputs.every((input) => fileNames[input.key]);
    if (!allUploaded) {
      setError("⚠️ Please upload all required documents.");
      return;
    }

    setError("");
    console.log("✅ Proceeding to next step");
    // You can call onNext() here if passed as a prop
  };

  return (
    <div>
      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Upload your Registration / Experience Certificates
      </h1>

      <div className="flex flex-col gap-5 mb-4">
        {inputs.map(({ label, key, type }) => (
          <label
            key={key}
            htmlFor={key}
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
          >
            {fileNames[key] || label}
            <img src="/upload-btn.svg" alt="upload" />
            <input
              type="file"
              id={key}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileUpload(key, type)}
            />
          </label>
        ))}
      </div>

      <div className="">
       

        {error && (
          <p className="text-red-600 text-sm sm:text-base font-medium mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadCertificate;
