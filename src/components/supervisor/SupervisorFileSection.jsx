"use client";
import React, { useMemo } from "react";

const isImage = (fileName = "") =>
  /\.(jpg|jpeg|png|webp|gif)$/i.test(fileName);

export default function SupervisorFileSection({
  files = [],
  qualifications = [],
  url,
  setPreview,
}) {
  /* ---------- Extract Experience Certificate ---------- */
  const experienceFile = useMemo(() => {
    for (const q of qualifications) {
      if (q?.qualificationFiles?.length) {
        const file = q.qualificationFiles.find(
          (f) => f.type === "EXPERIENCE_CERTIFICATE"
        );
        if (file) return file;
      }
    }
    return null;
  }, [qualifications]);

  /* ---------- Unified file lookup ---------- */
  const FILE_TYPES = [
    { label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
    { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
    { label: "Passport Photo", type: "PASSPORT_IMAGE" },
    { label: "Experience Certificate", type: "EXPERIENCE_CERTIFICATE" },
  ];

  const getFileByType = (type) => {
    if (type === "EXPERIENCE_CERTIFICATE") return experienceFile;
    return files.find((f) => f.type === type) || null;
  };

  return (
    <>
      {FILE_TYPES.map(({ label, type }) => {
        const file = getFileByType(type);

        return (
          <div
            key={type}
            className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2"
          >
            <span className="text-black font-medium">{label}</span>

            {file ? (
              <div className="flex items-center gap-4 ps-[52px]">
                <span className="truncate max-w-[320px]">
                  {file.fileName}
                </span>

                {/* VIEW */}
                <button
                  onClick={() =>
                    setPreview({
                      show: true,
                      fileUrl: `${url}${file.key}`,
                      isImage: isImage(file.fileName),
                    })
                  }
                  className="text-[#1982FE]"
                >
                  View
                </button>

                {/* DOWNLOAD */}
                <button
                  onClick={async () => {
                    const res = await fetch(`${url}${file.key}`);
                    const blob = await res.blob();
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = file.fileName;
                    link.click();
                    URL.revokeObjectURL(link.href);
                  }}
                  className="text-[#1982FE]"
                >
                  Download
                </button>
              </div>
            ) : (
              <span className="text-red-500 ps-[52px]">Not Uploaded</span>
            )}
          </div>
        );
      })}
    </>
  );
}
