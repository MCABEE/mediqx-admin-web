// "use client";
// import AddNurseAvailability from "@/components/staffManagement/addNewStaff/AddNurseAvailability";
// import NurseBasicInformation from "@/components/staffManagement/addNewStaff/NurseBasicInformation";
// import NurseExperinceDetails from "@/components/staffManagement/addNewStaff/NurseExperinceDetails";
// import UploadCertificate from "@/components/staffManagement/addNewStaff/UploadCertificate";
// import Navlink from "@/components/staffManagement/Navlink";
// import React, { useState } from "react";

// function page() {
//     const [categoryByProfession, setCategoryByProfession] = useState("");
//   return (
//     <div>
//       <Navlink />

//       {/* <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 pb-4 rounded-[15px] mt-4">
//         <div className="flex text-black font-semibold gap-[48px]">
//           <p className="text-blue-800">Nurse</p>
//           <p>Paramedical</p>
//           <p>Doctor</p>
//           <p>Supervisor</p>
//         </div>

        
//       </div> */}

//       <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
//         {/* <NurseBasicInformation />

//         <div>
//           <NurseExperinceDetails />
//         </div> */}
//          <NurseBasicInformation setCategoryByProfession={setCategoryByProfession} />
//         <NurseExperinceDetails categoryByProfession={categoryByProfession} />

//         <div className="px-[39px] pt-[15px]">
//           <UploadCertificate />

//           <div className="flex gap-x-[20px]">
//             <AddNurseAvailability categoryByProfession={categoryByProfession} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;







"use client";
import React, { useState } from "react";
import AddNurseAvailability from "@/components/staffManagement/addNewStaff/AddNurseAvailability";
import NurseBasicInformation from "@/components/staffManagement/addNewStaff/NurseBasicInformation";
import NurseExperinceDetails from "@/components/staffManagement/addNewStaff/NurseExperinceDetails";
import UploadCertificate from "@/components/staffManagement/addNewStaff/UploadCertificate";
import Navlink from "@/components/staffManagement/Navlink";

function Page() {
  const [categoryByProfession, setCategoryByProfession] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  // go to next step
  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div>
      <Navlink />

      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6 p-4">
        {/* Step 1: NurseBasicInformation */}
        <div
          className={`${
            activeStep === 1 ? "opacity-100" : "opacity-40 pointer-events-none"
          }`}
        >
          <NurseBasicInformation
            setCategoryByProfession={setCategoryByProfession}
            onComplete={handleNextStep} // call this when form is completed
          />
        </div>

        {/* Step 2: Experience */}
        <div
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
          className={`ps-8 ${
            activeStep === 3 ? "opacity-100" : "opacity-40 pointer-events-none"
          }`}
        >
          <UploadCertificate onComplete={handleNextStep} />
        </div>

        {/* Step 4: Availability */}
        <div
          className={`ps-8  ${
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
