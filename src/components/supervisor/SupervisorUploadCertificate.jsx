"use client";
import React, { useState } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import { useRouter } from "next/navigation";

function SupervisorUploadCertificate({ onComplete }) {
  const {
    userId,
    supervisorId,
    generateUploadUrl,
    confirmFileUpload,
    setUploadedFile,
  } = useSupervisorRegistrationStore();

  const router = useRouter();

  // 🔍 Log qualificationId
  console.log("Qualification ID:", supervisorId);

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

  /* ---------------- Inputs ---------------- */
  const inputs = [
    {
      label: "Nursing Certificate",
      key: "nursingCertificate",
      type: "NURSING_CERTIFICATE",
      disabled: false,
      required: false,
    },
    {
      label: "Council Registration",
      key: "councilRegistration",
      type: "COUNCIL_REGISTRATION",
      disabled: false,
      required: false,
    },
    {
      label: "Experience Certificate",
      key: "experienceCertificate",
      type: "EXPERIENCE_CERTIFICATE",
      disabled: !supervisorId, // ✅ Enable only if qualificationId exists
      required: false, // ❌ NOT required
    },
    {
      label: "Passport Photo *",
      key: "photo",
      type: "PASSPORT_IMAGE",
      disabled: false,
      required: true,
    },
  ];

  /* ---------------- File Select ---------------- */
  const handleFileSelect = (key, disabled) => (e) => {
    if (disabled) return;

    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({ ...prev, [key]: file }));
    setFileNames((prev) => ({ ...prev, [key]: file.name }));
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    setError("");

    if (!userId) {
      setError("User ID missing. Please complete basic details first.");
      return;
    }

    // ✅ Validate ONLY required fields
    const missingRequired = inputs.filter(
      (i) => i.required && !files[i.key]
    );

    if (missingRequired.length) {
      setError(
        `${missingRequired.map((m) => m.label).join(", ")} required.`
      );
      return;
    }

    setUploading(true);

    try {
      for (const { key, type, disabled } of inputs) {
        if (disabled) continue;

        const file = files[key];
        if (!file) continue; // optional fields are skipped safely

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

      // 🔄 Full page reload after success
      window.location.reload();
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
            className={`w-[328px] h-[40px] border rounded-[15px]
              ps-4 pe-4 flex items-center justify-between text-[14px]
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

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={uploading || isSubmitted}
        className={`mt-10 w-[328px] h-[40px] rounded-[15px]
          flex justify-center items-center
          ${
            uploading || isSubmitted
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#3674B5] text-white"
          }`}
      >
        {isSubmitted ? "Submitted" : uploading ? "Uploading..." : "Next"}
      </button>

      {error && (
        <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
      )}
    </div>
  );
}

export default SupervisorUploadCertificate;
