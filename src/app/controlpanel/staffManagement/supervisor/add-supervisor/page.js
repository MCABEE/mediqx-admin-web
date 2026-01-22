"use client";
import React, { useState, useRef, useEffect } from "react";
import Navlink from "@/components/supervisor/Navlink";
import SupervisorBasicInformation from "@/components/supervisor/SupervisorBasicInformation";
import SupervisorExperienceDetails from "@/components/supervisor/SupervisorExperienceDetails";
import SupervisorUploadCertificate from "@/components/supervisor/SupervisorUploadCertificate";

export default function Page() {
  const [activeStep, setActiveStep] = useState(1);
  const [categoryByProfession, setCategoryByProfession] = useState("");

  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  const handleNextStep = () => setActiveStep((s) => Math.min(s + 1, 3));
  const handlePrevStep = () => setActiveStep((s) => Math.max(s - 1, 1));

  useEffect(() => {
    const refs = { 1: step1Ref, 2: step2Ref, 3: step3Ref };
    const currentRef = refs[activeStep];
    if (currentRef?.current) {
      currentRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [activeStep]);

  return (
    <div>
      <Navlink />

      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6 p-4">
        {/* Step 1 */}
        <div ref={step1Ref} className={`${activeStep === 1 ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <SupervisorBasicInformation setCategoryByProfession={setCategoryByProfession} onComplete={handleNextStep} />
        </div>

        {/* Step 2 */}
        <div ref={step2Ref} className={`ps-8 ${activeStep === 2 ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <SupervisorExperienceDetails categoryByProfession={categoryByProfession} onComplete={handleNextStep} />
        </div>

        {/* Step 3 */}
        <div ref={step3Ref} className={`ps-8 ${activeStep === 3 ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <SupervisorUploadCertificate onComplete={() => { /* final step, you may redirect or reset */ }} />
        </div>

     
     
      </div>
    </div>
  );
}
