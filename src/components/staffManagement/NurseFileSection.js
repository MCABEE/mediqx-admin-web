// import React from "react";

// const NurseFileSection = ({ files, qualifications, url, setPreview }) => {
//   const fileSections = [
//     { label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
//     { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
//     {
//       label: "Experience Certificate",
//       type: "EXPERIENCE_CERTIFICATE",
//       isQualificationFile: true,
//     },
//     { label: "Photo", type: "PASSPORT_IMAGE" },
//   ];

//   const isImage = (fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName);

//   const handleDownload = async (file) => {
//     try {
//       const response = await fetch(`${url}${file.key}`);
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.download = file.fileName;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch {
//       alert("Download failed.");
//     }
//   };

//   return (
//     <>
//       {fileSections.map(({ label, type, isQualificationFile }) => {
//         const allQualificationFiles = qualifications?.files || [];
//         const file = isQualificationFile
//           ? allQualificationFiles.find((f) => f.type === type)
//           : files.find((f) => f.type === type);

//         return (
//           <div
//             key={type}
//             className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2"
//           >
//             <span className="w-[300px] text-black">{label}</span>

//             {file ? (
//               <div className="flex items-center gap-4 ps-[52px]">
//                 <span className="text-gray-700 truncate w-[300px]">
//                   {file.fileName}
//                 </span>
//                 <img src="/pdf.svg" alt="PDF Icon" />
//                 <button
//                   onClick={() =>
//                     setPreview({
//                       show: true,
//                       fileUrl: `${url}${file.key}`,
//                       isImage: isImage(file.fileName),
//                     })
//                   }
//                   className="text-[#1982FE] cursor-pointer"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleDownload(file)}
//                   className="text-[#1982FE] cursor-pointer"
//                 >
//                   Download
//                 </button>
//               </div>
//             ) : (
//               <span className="text-[#FF0000] ps-10">Not Uploaded</span>
//             )}
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default NurseFileSection;


// "use client";
// import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
// import React, { useState } from "react";

// const NurseFileSection = ({ files, qualifications, url, setPreview, userId,educationQualificationId }) => {
//     console.log(educationQualificationId);
    
//   const {
//     generateUploadUrlDetail,
//     confirmFileUpload,
//     setUploadedFile,
    
//   } = useNurseRegistrationStore();

//   const [uploading, setUploading] = useState({});
//   const [fileNames, setFileNames] = useState({});
//   const [error, setError] = useState("");

//   const fileSections = [
//     { label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
//     { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
//     {
//       label: "Experience Certificate",
//       type: "EXPERIENCE_CERTIFICATE",
//       isQualificationFile: true,
//     },
//     { label: "Photo", type: "PASSPORT_IMAGE" },
//   ];

//   const isImage = (fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName);

//   const handleDownload = async (file) => {
//     try {
//       const response = await fetch(`${url}${file.key}`);
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.download = file.fileName;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch {
//       alert("Download failed.");
//     }
//   };

//  const handleFileSelect = (type, isQualificationFile) => async (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   if (!userId) {
//     setError("Missing user ID. Please reload or check registration flow.");
//     return;
//   }

//   setError("");
//   setUploading((prev) => ({ ...prev, [type]: true }));
//   setFileNames((prev) => ({ ...prev, [type]: file.name }));

//   try {
//     // ✅ Pass userId from component
//     const { signedUrl, fileId } = await generateUploadUrlDetail({
//       userId,          // <-- userId passed here
//       fileName: file.name,
//       contentType: file.type,
//       type,
//     });

//     // Upload to cloud
//     const uploadRes = await fetch(signedUrl, {
//       method: "PUT",
//       headers: { "Content-Type": file.type },
//       body: file,
//     });
//     if (!uploadRes.ok) throw new Error(`Upload failed for ${type}`);

//     // Confirm in backend
//     await confirmFileUpload(fileId, type, userId); 
//     await setUploadedFile(type, fileId);
//   window.location.reload();
//     // alert(`${file.name} uploaded successfully ✅`);
//   } catch (err) {
//     console.error("❌ Upload error:", err);
//     setError(`Upload failed for ${type}.`);
//   } finally {
//     setUploading((prev) => ({ ...prev, [type]: false }));
//   }
// };


//   return (
//     <>
//       {fileSections.map(({ label, type, isQualificationFile }) => {
//         const allQualificationFiles = qualifications?.files || [];
//         const file = isQualificationFile
//           ? allQualificationFiles.find((f) => f.type === type)
//           : files.find((f) => f.type === type);

//         return (
//           <div
//             key={type}
//             className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2"
//           >
//             <span className="w-[300px] text-black">{label}</span>

//             {file ? (
//               <div className="flex items-center gap-4 ps-[52px]">
//                 <span className="text-gray-700 truncate w-[300px]">
//                   {file.fileName}
//                 </span>
//                 <img src="/pdf.svg" alt="PDF Icon" />
//                 <button
//                   onClick={() =>
//                     setPreview({
//                       show: true,
//                       fileUrl: `${url}${file.key}`,
//                       isImage: isImage(file.fileName),
//                     })
//                   }
//                   className="text-[#1982FE] cursor-pointer"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleDownload(file)}
//                   className="text-[#1982FE] cursor-pointer"
//                 >
//                   Download
//                 </button>
//               </div>
//             ) : (
//               <div className="ps-10 flex items-center gap-4">
//                 <label
//                   className={`cursor-pointer text-[#1982FE] ${
//                     uploading[type] ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {uploading[type]
//                     ? "Uploading..."
//                     : fileNames[type] || "Upload File"}
//                   <input
//                     type="file"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     className="hidden"
//                     disabled={uploading[type]}
//                     onChange={handleFileSelect(type, isQualificationFile)}
//                   />
//                 </label>
//                 {error && (
//                   <span className="text-red-500 text-sm font-medium">
//                     {error}
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default NurseFileSection;






"use client";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
import React, { useState } from "react";

const NurseFileSection = ({ files, qualifications, url, setPreview, userId, educationQualificationId }) => {
    
  const {
    generateUploadUrlDetail,
    confirmFileUpload,
    setUploadedFile,
  } = useNurseRegistrationStore();

  const [uploading, setUploading] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [error, setError] = useState("");

  const fileSections = [
    { label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
    { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
    {
      label: "Experience Certificate",
      type: "EXPERIENCE_CERTIFICATE",
      isQualificationFile: true,
    },
    { label: "Photo", type: "PASSPORT_IMAGE" },
  ];

  const isImage = (fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName);

  const handleDownload = async (file) => {
    try {
      const response = await fetch(`${url}${file.key}`);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      console.log ("Download failed.");
     
    }
  };

  const handleFileSelect = (type, isQualificationFile) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!userId) {
      setError("Missing user ID. Please reload or check registration flow.");
      return;
    }

    if (type === "EXPERIENCE_CERTIFICATE" && !educationQualificationId) {
      setError("Please save education qualification before uploading experience certificate.");
      return;
    }

    setError("");
    setUploading((prev) => ({ ...prev, [type]: true }));
    setFileNames((prev) => ({ ...prev, [type]: file.name }));

    try {
      const { signedUrl, fileId } = await generateUploadUrlDetail({
        userId,
        fileName: file.name,
        contentType: file.type,
        type,
      });

      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadRes.ok) throw new Error(`Upload failed for ${type}`);

      await confirmFileUpload(fileId, type, userId); 
      await setUploadedFile(type, fileId);

      window.location.reload();
    } catch (err) {
      console.error("❌ Upload error:", err);
      setError(`Upload failed for ${type}.`);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <>
      {fileSections.map(({ label, type, isQualificationFile }) => {
        const allQualificationFiles = qualifications?.files || [];
        const file = isQualificationFile
          ? allQualificationFiles.find((f) => f.type === type)
          : files.find((f) => f.type === type);

        // Disable Experience Certificate if no educationQualificationId
        const isDisabled = type === "EXPERIENCE_CERTIFICATE" && !educationQualificationId;

        return (
          <div
            key={type}
            className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2"
          >
            <span className="w-[300px] text-black">{label}</span>

            {file ? (
              <div className="flex items-center gap-4 ps-[52px]">
                <span className="text-gray-700 truncate w-[300px]">
                  {file.fileName}
                </span>
                <img src="/pdf.svg" alt="PDF Icon" />
                <button
                  onClick={() =>
                    setPreview({
                      show: true,
                      fileUrl: `${url}${file.key}`,
                      isImage: isImage(file.fileName),
                    })
                  }
                  className="text-[#1982FE] cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => handleDownload(file)}
                  className="text-[#1982FE] cursor-pointer"
                >
                  Download
                </button>
              </div>
            ) : (
              <div className="ps-10 flex items-center gap-4">
                <label
                  className={`cursor-pointer text-[#1982FE] ${
                    uploading[type] || isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {uploading[type]
                    ? "Uploading..."
                    : fileNames[type] || "Upload File"}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    disabled={uploading[type] || isDisabled}
                    onChange={handleFileSelect(type, isQualificationFile)}
                  />
                </label>
                {error && (
                  <span className="text-red-500 text-sm font-medium">
                    {error}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default NurseFileSection;
