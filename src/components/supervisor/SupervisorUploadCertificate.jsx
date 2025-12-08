// "use client";
// import React, { useState } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";


// export default function SupervisorUploadCertificate({ onComplete }) {
//   const { userId, generateUploadUrl, confirmFileUpload, setUploadedFile } =
//     useSupervisorRegistrationStore();

//   const [files, setFiles] = useState({
//     idProof: null,
//     experienceCertificate: null,
//     photo: null,
//   });

//   const [fileNames, setFileNames] = useState({
//     idProof: "",
//     experienceCertificate: "",
//     photo: "",
//   });

//   const [uploading, setUploading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // Define the inputs you want for supervisors
//   const inputs = [
//     { label: "ID Proof (Aadhar / Govt ID)", key: "idProof", type: "ID_PROOF", required: false },
//     { label: "Experience Certificate", key: "experienceCertificate", type: "EXPERIENCE_CERTIFICATE", required: false },
//     { label: "Passport Photo *", key: "photo", type: "PASSPORT_IMAGE", required: true },
//   ];

//   const handleFileSelect = (key) => (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setFiles((p) => ({ ...p, [key]: file }));
//     setFileNames((p) => ({ ...p, [key]: file.name }));
//     setError("");
//     setSuccessMsg("");
//   };

//   const validateBeforeUpload = () => {
//     // Ensure userId present
//     if (!userId) {
//       setError("User ID missing. Complete the registration first.");
//       return false;
//     }
//     // Required file: photo
//     if (!files.photo) {
//       setError("Passport Photo is required.");
//       return false;
//     }
//     // Optional: basic size/type validations can be added here
//     return true;
//   };

//   const handleSubmit = async () => {
//     setError("");
//     setSuccessMsg("");

//     if (!validateBeforeUpload()) return;

//     setUploading(true);

//     try {
//       // Upload each selected file (skip missing ones except required photo, already validated)
//       for (const { key, type, required } of inputs) {
//         const file = files[key];
//         if (!file) {
//           // if required was flagged earlier, this won't happen; just skip optional files
//           continue;
//         }

//         // 1) generate signed URL
//         const gen = await generateUploadUrl({
//           fileName: file.name,
//           contentType: file.type,
//           type,
//         });

//         // handle both shapes: { signedUrl, fileId } or { data: { signedUrl, fileId } }
//         const signedUrl = gen?.signedUrl || gen?.data?.signedUrl;
//         const fileId = gen?.fileId || gen?.data?.fileId;

//         if (!signedUrl || !fileId) {
//           throw new Error("Upload URL generation failed for " + key);
//         }

//         // 2) PUT the file to signedUrl
//         const uploadResp = await fetch(signedUrl, {
//           method: "PUT",
//           headers: { "Content-Type": file.type },
//           body: file,
//         });

//         if (!uploadResp.ok) {
//           throw new Error(`Upload to storage failed for ${key}`);
//         }

//         // 3) Confirm the upload with backend (some APIs require confirm)
//         const confirmRes = await confirmFileUpload(fileId, type);
//         // confirmRes shape may vary; attempt to extract confirmed id if nested
//         const confirmedFileId = confirmRes?.fileId || confirmRes?.data?.fileId || fileId;
//         if (!confirmedFileId) {
//           throw new Error("Upload confirmation failed for " + key);
//         }

//         // 4) persist the fileId in the store so later steps can use it
//         setUploadedFile(key, confirmedFileId);
//       }

//       setIsSubmitted(true);
//       setSuccessMsg("Files uploaded successfully.");
//       onComplete?.();
//     } catch (err) {
//       console.error("Supervisor upload error:", err);
//       setError(err?.message || "Something went wrong during upload.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Upload Supervisor Documents
//       </h1>

//       <div className="flex flex-col gap-5 mb-4">
//         {inputs.map(({ label, key, required }) => {
//           return (
//             <label
//               key={key}
//               htmlFor={key}
//               className={`w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] cursor-pointer rounded-[15px] ps-4 pe-4 flex items-center justify-between`}
//             >
//               <span className="truncate max-w-[220px]">
//                 {fileNames[key] || label}
//                 {required ? " *" : ""}
//               </span>

//               {/* small upload icon (you can replace with an Image component) */}
//               <img src="/upload-btn.svg" alt="upload" className="h-5 w-5" />

//               <input
//                 type="file"
//                 id={key}
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 className="hidden"
//                 onChange={handleFileSelect(key)}
//               />
//             </label>
//           );
//         })}
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={uploading || isSubmitted}
//         className={`mt-10 w-[328px] h-[40px] rounded-[15px] flex justify-center items-center cursor-pointer ${
//           uploading || isSubmitted ? "bg-gray-400 cursor-not-allowed text-white" : "bg-[#3674B5] text-white"
//         }`}
//       >
//         {isSubmitted ? "Submitted" : uploading ? "Uploading..." : "Next"}
//       </button>

//       {error && <p className="text-red-600 text-sm sm:text-base font-medium mt-2">{error}</p>}
//       {successMsg && <p className="text-blue-600 text-sm sm:text-base font-medium mt-2">{successMsg}</p>}
//     </div>
//   );
// }




// "use client";
// import React, { useState } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";

// function SupervisorUploadCertificate({ onComplete }) {
//   const { userId, generateUploadUrl, confirmFileUpload, setUploadedFile, qualificationId } = useSupervisorRegistrationStore();

//   const [files, setFiles] = useState({
//     identityProof: null,
//     experienceCertificate: null,
//     resume: null,
//     photo: null,
//   });

//   const [fileNames, setFileNames] = useState({
//     identityProof: "",
//     experienceCertificate: "",
//     resume: "",
//     photo: "",
//   });

//   const [uploading, setUploading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   // mapping inputs for supervisors (adjust types if your backend expects different)

//    const inputs = [
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
//       label: "Experience Certificate",
//       key: "experienceCertificate",
//       type: "EXPERIENCE_CERTIFICATE",
//     },
//     {
//       label: "Passport Photo *",
//       key: "photo",
//       type: "PASSPORT_IMAGE",
//       required: true, // ✅ Mark photo as required
//     },
//   ];
//   const handleFileSelect = (key) => (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     setFiles((p) => ({ ...p, [key]: file }));
//     setFileNames((p) => ({ ...p, [key]: file.name }));
//   };

//   const handleSubmit = async () => {
//     setError("");
//     if (!userId) {
//       setError("User ID missing. Complete basic details first.");
//       return;
//     }

//     // validate required fields
//     const missing = inputs.filter((i) => i.required && !files[i.key]);
//     if (missing.length) {
//       setError(`${missing.map((m) => m.label).join(", ")} required.`);
//       return;
//     }

//     setUploading(true);

//     try {
//       for (const { key, type } of inputs) {
//         const file = files[key];
//         if (!file) continue;

//         const { signedUrl, fileId } = await generateUploadUrl({
//           fileName: file.name,
//           contentType: file.type,
//           type,
//         });

//         const uploadRes = await fetch(signedUrl, {
//           method: "PUT",
//           headers: { "Content-Type": file.type },
//           body: file,
//         });

//         if (!uploadRes.ok) throw new Error(`Upload failed for ${key}`);

//         await confirmFileUpload(fileId, type);
//         setUploadedFile(key, fileId);
//       }

//       setIsSubmitted(true);
//       onComplete?.();
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError(err.message || "Upload failed. Try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="pt-[15px] px-4">
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">Upload your Documents</h1>

//       <div className="flex flex-col gap-5 mb-4">
//         {inputs.map(({ label, key }) => (
//           <label key={key} htmlFor={key} className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] cursor-pointer rounded-[15px] ps-4 pe-4 flex items-center justify-between">
//             <span>{fileNames[key] || label}</span>
//             <img src="/upload-btn.svg" alt="upload" />
//             <input id={key} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileSelect(key)} />
//           </label>
//         ))}
//       </div>

//       <button onClick={handleSubmit} disabled={uploading || isSubmitted} className={`mt-10 w-[328px] h-[40px] rounded-[15px] flex justify-center items-center cursor-pointer ${uploading || isSubmitted ? "bg-gray-400 cursor-not-allowed text-white" : "bg-[#3674B5] text-white"}`}>
//         {isSubmitted ? "Submitted" : uploading ? "Uploading..." : "Next"}
//       </button>

//       {error && <p className="text-red-600 text-sm sm:text-base font-medium mt-1">{error}</p>}
//     </div>
//   );
// }

// export default SupervisorUploadCertificate;









// "use client";
// import React, { useState } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";

// function SupervisorUploadCertificate({ onComplete }) {
//   const {
//     userId,
//     generateUploadUrl,
//     confirmFileUpload,
//     setUploadedFile,
//     supervisorId
//   } = useSupervisorRegistrationStore();

//   const [files, setFiles] = useState({
//     nursingCertificate: null,
//     councilRegistration: null,
//     experienceCertificate: null,
//     photo: null,
//   });

//   const [fileNames, setFileNames] = useState({
//     nursingCertificate: "",
//     councilRegistration: "",
//     experienceCertificate: "",
//     photo: "",
//   });

//   const [uploading, setUploading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Supervisor Upload Inputs (same as you confirmed)
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
//       label: "Experience Certificate",
//       key: "experienceCertificate",
//       type: "EXPERIENCE_CERTIFICATE",
//     },
//     {
//       label: "Passport Photo *",
//       key: "photo",
//       type: "PASSPORT_IMAGE",
//       required: true,
//     },
//   ];

//   // Handle file selection
//   const handleFileSelect = (key) => (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setFiles((prev) => ({ ...prev, [key]: file }));
//     setFileNames((prev) => ({ ...prev, [key]: file.name }));
//   };

//   // Submit & Upload Handler
//   const handleSubmit = async () => {
//     setError("");

//     if (!userId) {
//       setError("User ID missing. Please complete basic details first.");
//       return;
//     }

//     // Required file validation
//     const missingRequired = inputs.filter((i) => i.required && !files[i.key]);
//     if (missingRequired.length > 0) {
//       setError(`${missingRequired.map((m) => m.label).join(", ")} required.`);
//       return;
//     }

//     setUploading(true);

//     try {
//       for (const { key, type } of inputs) {
//         const file = files[key];
//         if (!file) continue;

//         // Step 1: Generate signed URL
//         const { signedUrl, fileId } = await generateUploadUrl({
//           fileName: file.name,
//           contentType: file.type,
//           type,
//         });

//         // Step 2: Upload to S3
//         const uploadRes = await fetch(signedUrl, {
//           method: "PUT",
//           headers: { "Content-Type": file.type },
//           body: file,
//         });

//         if (!uploadRes.ok) {
//           throw new Error(`Upload failed for ${key}`);
//         }

//         // Step 3: Confirm upload
//         await confirmFileUpload(fileId, type);

//         // Store fileId in Zustand
//         setUploadedFile(key, fileId);
//       }

//       setIsSubmitted(true);
//       onComplete?.();
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError(err.message || "Upload failed. Try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="pt-[15px] px-4">
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Upload your Documents
//       </h1>

//       {/* Upload Inputs */}
//       <div className="flex flex-col gap-5 mb-4">
//         {inputs.map(({ label, key }) => (
//           <label
//             key={key}
//             htmlFor={key}
//             className="w-[328px] h-[40px] text-black text-[14px] font-light 
//                        border border-[#BBBBBB] cursor-pointer rounded-[15px] 
//                        ps-4 pe-4 flex items-center justify-between"
//           >
//             <span>{fileNames[key] || label}</span>
//             <img src="/upload-btn.svg" alt="upload" />
//             <input
//               id={key}
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               className="hidden"
//               onChange={handleFileSelect(key)}
//             />
//           </label>
//         ))}
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={uploading || isSubmitted}
//         className={`mt-10 w-[328px] h-[40px] rounded-[15px] flex justify-center items-center 
//             ${uploading || isSubmitted
//               ? "bg-gray-400 cursor-not-allowed text-white"
//               : "bg-[#3674B5] text-white"
//             }`}
//       >
//         {isSubmitted ? "Submitted" : uploading ? "Uploading..." : "Next"}
//       </button>

//       {error && (
//         <p className="text-red-600 text-sm sm:text-base font-medium mt-1">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// export default SupervisorUploadCertificate;










"use client";
import React, { useState } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";

function SupervisorUploadCertificate({ onComplete }) {
  const {
    userId,
    generateUploadUrl,
    confirmFileUpload,
    setUploadedFile,
    supervisorId, 
  } = useSupervisorRegistrationStore();
console.log(supervisorId);

  const [files, setFiles] = useState({
    nursingCertificate: null,
    councilRegistration: null,
    experienceCertificate: null,
    photo: null,
  });

  const [fileNames, setFileNames] = useState({
    nursingCertificate: "",
    councilRegistration: "",
    experienceCertificate: "",
    photo: "",
  });

  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ✅ Inputs with disable logic for Experience Certificate
  const inputs = [
    {
      label: "Nursing Certificate",
      key: "nursingCertificate",
      type: "NURSING_CERTIFICATE",
      disabled: false,
    },
    {
      label: "Council Registration",
      key: "councilRegistration",
      type: "COUNCIL_REGISTRATION",
      disabled: false,
    },
    {
      label: "Experience Certificate",
      key: "experienceCertificate",
      type: "EXPERIENCE_CERTIFICATE",
      disabled: !supervisorId, // ✅ disable when supervisorId is missing
    },
    {
      label: "Passport Photo *",
      key: "photo",
      type: "PASSPORT_IMAGE",
      required: true,
      disabled: false,
    },
  ];

  // Handle file selection
  const handleFileSelect = (key, disabled) => (event) => {
    if (disabled) return; // ❌ ignore clicks when disabled

    const file = event.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({ ...prev, [key]: file }));
    setFileNames((prev) => ({ ...prev, [key]: file.name }));
  };

  // Submit Handler
  const handleSubmit = async () => {
    setError("");

    if (!userId) {
      setError("User ID missing. Please complete basic details first.");
      return;
    }

    // Validation for required fields
    const missingRequired = inputs.filter((i) => i.required && !files[i.key]);
    if (missingRequired.length > 0) {
      setError(`${missingRequired.map((m) => m.label).join(", ")} required.`);
      return;
    }

    setUploading(true);

    try {
      for (const { key, type, disabled } of inputs) {
        if (disabled) continue; // skip disabled fields

        const file = files[key];
        if (!file) continue;

        const { signedUrl, fileId } = await generateUploadUrl({
          fileName: file.name,
          contentType: file.type,
          type,
        });

        const uploadRes = await fetch(signedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!uploadRes.ok) {
          throw new Error(`Upload failed for ${key}`);
        }

        await confirmFileUpload(fileId, type);
        setUploadedFile(key, fileId);
      }

      setIsSubmitted(true);
      onComplete?.();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-[15px] px-4">
      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Upload your Documents
      </h1>

      {/* Upload Inputs */}
      <div className="flex flex-col gap-5 mb-4">
        {inputs.map(({ label, key, disabled }) => (
          <label
            key={key}
            htmlFor={key}
            className={`w-[328px] h-[40px] text-black text-[14px] font-light 
                       border rounded-[15px] ps-4 pe-4 flex items-center justify-between
                       ${
                         disabled
                           ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                           : "border-[#BBBBBB] cursor-pointer"
                       }`}
          >
            <span>{fileNames[key] || label}</span>
            <img
              src="/upload-btn.svg"
              alt="upload"
              className={disabled ? "opacity-50" : ""}
            />

            <input
              id={key}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              disabled={disabled}
              onChange={handleFileSelect(key, disabled)}
            />
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={uploading || isSubmitted}
        className={`mt-10 w-[328px] h-[40px] rounded-[15px] flex justify-center items-center 
            ${
              uploading || isSubmitted
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#3674B5] text-white"
            }`}
      >
        {isSubmitted ? "Submitted" : uploading ? "Uploading..." : "Next"}
      </button>

      {error && (
        <p className="text-red-600 text-sm sm:text-base font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default SupervisorUploadCertificate;
