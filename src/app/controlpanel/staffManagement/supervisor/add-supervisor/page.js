// import Navlink from '@/components/supervisor/Navlink'
// import React from 'react'

// function page() {
//   return (
//     <div>
//         <Navlink/>
        
//     </div>
//   )
// }

// export default page



// "use client";

// import React, { useState } from "react";
// import Navlink from "@/components/supervisor/Navlink";
// import SupervisorBasicInformation from "@/components/supervisor/SupervisorBasicInformation";
// import SupervisorExperienceDetails from "@/components/supervisor/SupervisorExperienceDetails";

// export default function Page() {
//   const [step, setStep] = useState(1);
//   const [categoryByProfession, setCategoryByProfession] = useState("ADMIN");

//   const next = () => setStep((prev) => prev + 1);
//   const back = () => setStep((prev) => prev - 1);

//   return (
//     <div>
//       {/* Supervisor Top Navigation */}
//       <Navlink />

//       <div className="px-6 mt-6">
//         {/* STEP TABS */}
//         <div className="flex gap-4 mb-6">
//           <span className={`${step === 1 ? "font-semibold text-blue-600" : "text-gray-500"}`}>
//             1. Basic Details
//           </span>
//           <span className={`${step === 2 ? "font-semibold text-blue-600" : "text-gray-500"}`}>
//             2. Experience Details
//           </span>
//         </div>

//         {/* STEP RENDERING */}
//         {step === 1 && (
//           <SupervisorBasicInformation
//             onComplete={next}
//             setCategoryByProfession={setCategoryByProfession}
//           />
//         )}

//         {step === 2 && (
//           <SupervisorExperienceDetails
//             categoryByProfession={categoryByProfession}
//             onComplete={next}
//           />
//         )}

//         {/* BACK BUTTON */}
//         {step > 1 && (
//           <button
//             onClick={back}
//             className="mt-4 px-4 py-2 border rounded-lg"
//           >
//             Back
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Navlink from "@/components/supervisor/Navlink";
// import SupervisorBasicInformation from "@/components/supervisor/SupervisorBasicInformation";
// import SupervisorExperienceDetails from "@/components/supervisor/SupervisorExperienceDetails";
// import SupervisorUploadCertificate from "@/components/supervisor/SupervisorUploadCertificate";

// export default function Page() {
//   const [activeStep, setActiveStep] = useState(1);
//   const [categoryByProfession, setCategoryByProfession] = useState("");

//   // refs for each step
//   const step1Ref = useRef(null);
//   const step2Ref = useRef(null);

//   // step advance/retreat helpers
//   const handleNextStep = () => setActiveStep((s) => Math.min(s + 1, 2));
//   const handlePrevStep = () => setActiveStep((s) => Math.max(s - 1, 1));

//   // Immediately jump to the element when activeStep changes (animation disabled)
//   useEffect(() => {
//     const refs = { 1: step1Ref, 2: step2Ref };
//     const currentRef = refs[activeStep];
//     if (currentRef?.current) {
//       currentRef.current.scrollIntoView({ behavior: "auto", block: "start" });
//     }
//   }, [activeStep]);

//   return (
//     <div>
//       <Navlink />

//       <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6 p-4">
//         {/* Step 1: Basic */}
//         <div
//           ref={step1Ref}
//           className={`${activeStep === 1 ? "opacity-100" : "opacity-40 pointer-events-none"}`}
//         >
//           <SupervisorBasicInformation
//             setCategoryByProfession={setCategoryByProfession}
//             onComplete={handleNextStep}
//           />
//         </div>

//         {/* Step 2: Experience */}
//         <div
//           ref={step2Ref}
//           className={`${activeStep === 2 ? "opacity-100" : "opacity-40 pointer-events-none"} ps-8`}
//         >
//           <SupervisorExperienceDetails
//             categoryByProfession={categoryByProfession}
//             onComplete={handleNextStep}
//           />
//         </div>

//        <SupervisorUploadCertificate/>
       
//       </div>
//     </div>
//   );
// }







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
