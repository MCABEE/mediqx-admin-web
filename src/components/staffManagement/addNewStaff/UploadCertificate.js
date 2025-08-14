"use client";
import React, { useState } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";

function UploadCertificate() {
  const {
    userId,
    generateUploadUrl,
    confirmFileUpload,
    setUploadedFile,
    qualificationId,
  } = useNurseRegistrationStore();

  const [files, setFiles] = useState({
    nursingCertificate: null,
    councilRegistration: null,
    experienceCertificate: null,
    photo: null,
    qualificationId: null,
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
      label: "Experience Certificate",
      key: "experienceCertificate",
      type: "EXPERIENCE_CERTIFICATE",
    },
    {
      label: "Passport Photo",
      key: "photo",
      type: "PASSPORT_IMAGE",
    },
  ];

  const handleFileSelect = (key) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({ ...prev, [key]: file }));
    setFileNames((prev) => ({ ...prev, [key]: file.name }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      setError(
        "User ID is missing. Please complete the registration step first."
      );
      return;
    }

    setUploading(true);
    setError("");

    try {
      for (const { key, type } of inputs) {
        const file = files[key];
        if (!file) continue; // skip if file not selected

        const { signedUrl, fileId } = await generateUploadUrl({
          fileName: file.name,
          contentType: file.type,
          type,
        });

        const uploadRes = await fetch(signedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadRes.ok) {
          throw new Error(`Upload failed for ${key}`);
        }

        await confirmFileUpload(fileId, type); // ✅ send type with confirmation
        setUploadedFile(key, fileId);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("❌ Upload error:", err.message);
      setError("Something went wrong while uploading. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Upload your Registration / Experience Certificates
      </h1>

      <div className="flex flex-col gap-5 mb-4">
        {inputs.map(({ label, key }) => {
          const isExperience = key === "experienceCertificate";
          const isDisabled = isExperience && qualificationId === null;

          return (
            <label
              key={key}
              htmlFor={key}
              className={`w-[328px] h-[40px] text-black text-[14px] font-light border ${
                isDisabled
                  ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-[#BBBBBB] cursor-pointer"
              } rounded-[15px] ps-8 pe-4 flex items-center justify-between`}
            >
              {fileNames[key] || label}
              <img
                src="/upload-btn.svg"
                alt="upload"
                className={isDisabled ? "opacity-50" : ""}
              />
              <input
                type="file"
                id={key}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={!isDisabled ? handleFileSelect(key) : undefined}
                disabled={isDisabled}
              />
            </label>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={uploading || isSubmitted}
        className={`mt-10 w-[328px] h-[40px] rounded-[15px] flex justify-center items-center cursor-pointer ${
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

export default UploadCertificate;
