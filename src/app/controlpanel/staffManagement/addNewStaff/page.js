"use client";
import React, { useState, useEffect, useRef } from "react";
import AddNurseAvailability from "@/components/staffManagement/addNewStaff/AddNurseAvailability";
import NurseBasicInformation from "@/components/staffManagement/addNewStaff/NurseBasicInformation";
import NurseExperinceDetails from "@/components/staffManagement/addNewStaff/NurseExperinceDetails";
import UploadCertificate from "@/components/staffManagement/addNewStaff/UploadCertificate";
import Navlink from "@/components/staffManagement/Navlink";

function Page() {
  const [categoryByProfession, setCategoryByProfession] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  // refs for each step
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);

  // go to next step
  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  // scroll active step into view
  useEffect(() => {
    const refs = {
      1: step1Ref,
      2: step2Ref,
      3: step3Ref,
      4: step4Ref,
    };

    const currentRef = refs[activeStep];
    if (currentRef?.current) {
      currentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeStep]);

  return (
    <div>
      <Navlink />

      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6 p-4">
        {/* Step 1: NurseBasicInformation */}
        <div
          ref={step1Ref}
          className={`${
            activeStep === 1 ? "opacity-100" : "opacity-40 pointer-events-none"
          }`}
        >
          <NurseBasicInformation
            setCategoryByProfession={setCategoryByProfession}
            onComplete={handleNextStep}
          />
        </div>

        {/* Step 2: Experience */}
        <div
          ref={step2Ref}
          className={`${
            activeStep === 2 ? "opacity-100" : "opacity-40 pointer-events-none"
          }`}
        >
          <NurseExperinceDetails
            categoryByProfession={categoryByProfession}
            onComplete={handleNextStep}
          />
        </div>

        {/* Step 3: Certificate */}
        <div
          ref={step3Ref}
          className={`ps-8 ${
            activeStep === 3 ? "opacity-100" : "opacity-40 pointer-events-none"
          }`}
        >
          <UploadCertificate onComplete={handleNextStep} />
        </div>

        {/* Step 4: Availability */}
        <div
          ref={step4Ref}
          className={`ps-8 ${
            activeStep === 4 ? "opacity-100" : "opacity-40 pointer-events-none"
          }`}
        >
          <AddNurseAvailability categoryByProfession={categoryByProfession} />
        </div>
      </div>
    </div>
  );
}

export default Page;
