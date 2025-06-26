// "use client"
// import Navlink from "@/components/caseBooking/NavLink";
// import Link from "next/link";
// import React from "react";
// import { useSearchParams,useRouter } from "next/navigation";
// import AssignStaffTable from "@/components/caseBooking/AssignStaffTable";

// const page = ({ bookingId, onSelectNurse }) => {
// const router= useRouter()
//    const searchParams = useSearchParams();
//    const bookingId = searchParams.get("bookingId");
//   const fullName = searchParams.get("fullName");
//   const from = searchParams.get("from");
//   const to = searchParams.get("to");
//   const service = searchParams.get("service");
//   const schedule = searchParams.get("schedule");
//   const gender = searchParams.get("gender");
//   const language = searchParams.get("language");
//   const location = searchParams.get("location");


//   console.log(bookingId);
  
//   return (
//     <div>
//       <Navlink />
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
//         <div className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]">
//            <button onClick={() => router.back()} className="cursor-pointer">Back</button>
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px] ">
//           <p className="font-semibold">{fullName}</p>
//           <div className="flex justify-center items-center gap-[92px]">
//             {/* <p>12 April</p>
//             <p>Direct</p> */}
//           </div>
//         </div>
//       </div>
//       <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">
//             Patient Details
//           </h1>
//         </div>
//         <div className="grid grid-cols-2 gap-y-[10px] p-8 text-[16px] text-black">
//   <span className="font-medium">Service Period (From)</span>
//   <span>{from}</span>

//   <span className="font-medium">Service Period (To)</span>
//   <span>{to}</span>

//   <span className="font-medium">Service Required</span>
//   <span>{service}</span>

//   <span className="font-medium">Daily Schedule</span>
//   <span>{schedule}</span>

//   <span className="font-medium">Staff Preference</span>
//   <span>{gender}</span>

//   <span className="font-medium">Language</span>
//   <span>{language}</span>

//   <span className="font-medium">Location</span>
//   <span>{location}</span>
// </div>

//       </div>
//       <div className="w-full h-[56px] bg-[#C0D8F6] flex justify-between items-center rounded-[15px] ps-[19px] pe-[13px] mt-4">
//         <span className="text-[16px] text-black font-semibold">
//           Check Availability
//         </span>
//         <button className="w-[192px] h-[40px] rounded-[15px] bg-[#3674B5] flex justify-center items-center border text-[16px] text-white font-semibold">
//           Search
//         </button>
//       </div>
//       <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089943376!2d77.46612593299314!3d12.953945614011557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1744177352473!5m2!1sen!2sin"
//           loading="lazy"
//           className="w-full h-full "
//         ></iframe>
//       </div>

//       {/* <div className="w-full bg-white border border-[#8888888c] rounded-[15px] my-4 pt-[23px] pb-[19px]  px-6 text-[#3674B5] font-semibold text-[32px] flex justify-between">
//         <p>05 Results found</p>
//       </div>

//       <table className="w-full border-spacing-y-2 border-separate text-black mb-[200px] ">
//         <thead className="bg-[#C0D8F6]">
//           <tr className="p-2 bg-[#C0D8F6]">
//             <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               {" "}
//               Staff Name
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               {" "}
//               Location
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               {" "}
//               Qualification
//             </th>

//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="bg-white">
//             <td className="p-2">01</td>
//               <td className="border-l-4 border-[#C0D8F6] p-2">
//                 Pradeep Kumar N
//               </td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">Whitefield</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
//             <Link href={"/controlpanel/caseBooking/availabilityCalender"}>
//               <td className="border-l-4 border-[#C0D8F6] p-2">Assign</td>
//             </Link>
//           </tr>
//           <tr className="bg-white">
//             <td className="p-2">02</td>
//               <td className="border-l-4 border-[#C0D8F6] p-2">Sai Krishna G</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">Indiranagar</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
//             <Link href={"/controlpanel/caseBooking/availabilityCalender"}>
//               <td className="border-l-4 border-[#C0D8F6] p-2">Assign</td>
//             </Link>
//           </tr>
//           <tr className="bg-white">
//             <td className="p-2">03</td>
//               <td className="border-l-4 border-[#C0D8F6] p-2">
//                 Sruthi Lakshmi N
//               </td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">
//               Electronics City
//             </td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
//             <Link href={"/controlpanel/caseBooking/availabilityCalender"}>
//               <td className="border-l-4 border-[#C0D8F6] p-2">Assign</td>
//             </Link>
//           </tr>
//         </tbody>
//       </table> */}
//       {/* <AssignStaffTable/> */}
//       <AssignStaffTable bookingId={bookingId} onSelectNurse={(userId) => {
//   // You can now handle selected userId here
//   console.log("Selected Nurse User ID:", userId);

//   // Example: navigate to assign page with selected nurse
//   router.push(`/controlpanel/caseBooking/availabilityCalender?bookingId=${bookingId}&userId=${userId}`);
// }}
//  />
//     </div>
//   );
// };

// export default page;






// "use client";
// import Navlink from "@/components/caseBooking/NavLink";
// import React from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import AssignStaffTable from "@/components/caseBooking/AssignStaffTable";

// const Page = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const bookingId = searchParams.get("bookingId");
//   const fullName = searchParams.get("fullName");
//   const from = searchParams.get("from");
//   const to = searchParams.get("to");
//   const service = searchParams.get("service");
//   const schedule = searchParams.get("schedule");
//   const gender = searchParams.get("gender");
//   const language = searchParams.get("language");
//   const location = searchParams.get("location");
// console.log(bookingId);

//   return (
//     <div>
//       <Navlink />
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
//         <div className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]">
//           <button onClick={() => router.back()} className="cursor-pointer">
//             Back
//           </button>
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
//           <p className="font-semibold">{fullName}</p>
//         </div>
//       </div>

//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">Patient Details</h1>
//         </div>
//         <div className="grid grid-cols-2 gap-y-[10px] p-8 text-[16px] text-black">
//           <span className="font-medium">Service Period (From)</span>
//           <span>{from}</span>
//           <span className="font-medium">Service Period (To)</span>
//           <span>{to}</span>
//           <span className="font-medium">Service Required</span>
//           <span>{service}</span>
//           <span className="font-medium">Daily Schedule</span>
//           <span>{schedule}</span>
//           <span className="font-medium">Staff Preference</span>
//           <span>{gender}</span>
//           <span className="font-medium">Language</span>
//           <span>{language}</span>
//           <span className="font-medium">Location</span>
//           <span>{location}</span>
//         </div>
//       </div>

//       <div className="w-full h-[56px] bg-[#C0D8F6] flex justify-between items-center rounded-[15px] ps-[19px] pe-[13px] mt-4">
//         <span className="text-[16px] text-black font-semibold">
//           Check Availability
//         </span>
//         <button className="w-[192px] h-[40px] rounded-[15px] bg-[#3674B5] flex justify-center items-center border text-[16px] text-white font-semibold">
//           Search
//         </button>
//       </div>

//       <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089943376!2d77.46612593299314!3d12.953945614011557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1744177352473!5m2!1sen!2sin"
//           loading="lazy"
//           className="w-full h-full"
//         ></iframe>
//       </div>

//       <AssignStaffTable
//         onSelectNurse={(userId) => {
//           // router.push(
//           //   `/controlpanel/caseBooking/availabilityCalender?bookingId=${bookingId}&userId=${userId}`
//           // );
//           console.log(userId);
          
//         }}
//       />
//     </div>
//   );
// };

// export default Page;




"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navlink from "@/components/caseBooking/NavLink";
import AssignStaffTable from "@/components/caseBooking/AssignStaffTable";
import useBookingStore from "@/app/lib/store/bookingStore";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId");
  const fullName = searchParams.get("fullName");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const service = searchParams.get("service");
  const schedule = searchParams.get("schedule");
  const gender = searchParams.get("gender");
  const language = searchParams.get("language");
  const location = searchParams.get("location");
  console.log(bookingId);
  

  const { assignNurse } = useBookingStore();

  const handleAssign = async (userId) => {
    console.log(bookingId,userId);
    
    try {
      await assignNurse(bookingId, userId);
      console.log("Nurse assigned successfully!");
    } catch (error) {

      console.log ("Failed to assign nurse.");
     
    }
  };

  return (
    <div>
      <Navlink />

      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
       <div className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]">
          <button onClick={() => router.back()} className="cursor-pointer">
            Back
          </button>
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{fullName}</p>
        </div>
      </div>

      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="h-[72px] flex items-center px-8 border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Patient Details
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-y-[10px] p-8 text-[16px] text-black">
          <span className="font-medium">Service Period (From)</span>
          <span>{from}</span>
          <span className="font-medium">Service Period (To)</span>
          <span>{to}</span>
          <span className="font-medium">Service Required</span>
          <span>{service}</span>
          <span className="font-medium">Daily Schedule</span>
          <span>{schedule}</span>
          <span className="font-medium">Staff Preference</span>
          <span>{gender}</span>
          <span className="font-medium">Language</span>
          <span>{language}</span>
          <span className="font-medium">Location</span>
          <span>{location}</span>
        </div>
      </div>

      {/* <div className="w-full h-[56px] bg-[#C0D8F6] flex justify-between items-center rounded-[15px] ps-[19px] pe-[13px] mt-4">
        <span className="text-[16px] text-black font-semibold">
          Check Availability
        </span>
        <button className="w-[192px] h-[40px] rounded-[15px] bg-[#3674B5] text-white font-semibold">
          Search
        </button>
      </div> */}

      {/* <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!..."
          className="w-full h-full"
          loading="lazy"
        ></iframe>
      </div> */}

      <AssignStaffTable bookingId={bookingId} onSelectNurse={handleAssign} />
    </div>
  );
};

export default Page;
