// "use client";

// import React, { useEffect, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";

// export default function EditAmbulancePopup({
//   ambulance,
//   loading,
//   onCancel,
//   onSave,
// }) {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     mobileNumber: "",
//     gender: "MALE",
//     ambulanceName: "",
//     customerCareNumber: "",
//     ambulanceType: "",
//     vehicleType: "",
//     latitude: "",
//     longitude: "",
//     mapLocation: "",
//   });

//   /* PREFILL */
//   useEffect(() => {
//     if (!ambulance) return;

//     setForm({
//       fullName: ambulance.fullName ?? "",
//       email: ambulance.email ?? "",
//       mobileNumber: ambulance.mobileNumber ?? "",
//       gender: ambulance.gender ?? "MALE",
//       ambulanceName: ambulance.ambulanceName ?? "",
//       customerCareNumber: ambulance.customerCareNumber ?? "",
//       ambulanceType: ambulance.ambulanceType ?? "",
//       vehicleType: ambulance.vehicleType ?? "",
//       latitude: ambulance.latitude ?? "",
//       longitude: ambulance.longitude ?? "",
//       mapLocation: ambulance.mapLocation ?? "",
//     });
//   }, [ambulance]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//       <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative">

//         {/* CLOSE */}
//         <button
//           onClick={onCancel}
//           className="absolute top-4 right-4 text-gray-600"
//         >
//           <AiOutlineClose size={20} />
//         </button>

//         <h2 className="text-xl font-semibold mb-6 text-center">
//           Edit Ambulance
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <Input label="Driver Name" name="fullName" value={form.fullName} onChange={handleChange} />
//           <Input label="Email" name="email" value={form.email} onChange={handleChange} />
//           <Input label="Mobile Number" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
//           <Input label="Customer Care" name="customerCareNumber" value={form.customerCareNumber} onChange={handleChange} />
//           <Input label="Ambulance Name" name="ambulanceName" value={form.ambulanceName} onChange={handleChange} />

//           <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//           </Select>

//           <Select label="Ambulance Type" name="ambulanceType" value={form.ambulanceType} onChange={handleChange}>
//             <option value="BASIC_LIFE_SUPPORT">Basic Life Support</option>
//             <option value="CARDIAC_AMBULANCE">Cardiac Ambulance</option>
//             <option value="ICU_LEVEL_1">ICU Level 1</option>
//             <option value="ICU_LEVEL_2">ICU Level 2</option>
//             <option value="ICU_LEVEL_3">ICU Level 3</option>
//           </Select>

//           <Select label="Vehicle Type" name="vehicleType" value={form.vehicleType} onChange={handleChange}>
//             <option value="MARUTI_OMNI">Maruti Omni</option>
//             <option value="FORCE_TRAVELLER">Force Traveller</option>
//             <option value="TATA_WINGER_AMBULANCE">Tata Winger</option>
//             <option value="TOYOTA_HIACE">Toyota Hiace</option>
//           </Select>

//           <Input label="Latitude" name="latitude" value={form.latitude} onChange={handleChange} />
//           <Input label="Longitude" name="longitude" value={form.longitude} onChange={handleChange} />
//         </div>

//         <div className="mt-4">
//           <Input label="Map Location" name="mapLocation" value={form.mapLocation} onChange={handleChange} />
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-200 rounded-lg"
//           >
//             Cancel
//           </button>

//           <button
//             disabled={loading}
//             onClick={() => onSave(form)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------- INPUTS -------- */
// function Input({ label, ...props }) {
//   return (
//     <div className="flex flex-col">
//       <label className="text-sm font-medium mb-1">{label}</label>
//       <input {...props} className="border rounded-lg px-3 py-2" />
//     </div>
//   );
// }

// function Select({ label, children, ...props }) {
//   return (
//     <div className="flex flex-col">
//       <label className="text-sm font-medium mb-1">{label}</label>
//       <select {...props} className="border rounded-lg px-3 py-2">
//         {children}
//       </select>
//     </div>
//   );
// }











// "use client";

// import React, { useState } from "react";
// import useAmbulanceStore from "@/app/lib/store/useAmbulanceStore";

// function EditAmbulancePopup({ ambulance, onClose }) {
//   const { updateAmbulance } = useAmbulanceStore();

//   const [form, setForm] = useState({
//     fullName: ambulance.fullName || "",
//     email: ambulance.email || "",
//     mobileNumber: ambulance.mobileNumber || "",
//     ambulanceName: ambulance.ambulanceName || "",
//     customerCareNumber: ambulance.customerCareNumber || "",
//     ambulanceType: ambulance.ambulanceType || "",
//     vehicleType: ambulance.vehicleType || "",
//     mapLocation: ambulance.mapLocation || "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await updateAmbulance(ambulance.id, form);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white w-[650px] rounded-[15px] p-6">
//         <h2 className="text-[20px] font-semibold mb-6">
//           Edit Ambulance Service
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           {/* Ambulance Name */}
//           <input
//             name="ambulanceName"
//             value={form.ambulanceName}
//             onChange={handleChange}
//             placeholder="Ambulance Name"
//             className="border p-2 rounded"
//           />

//           {/* Ambulance Type */}
//           <select
//             name="ambulanceType"
//             value={form.ambulanceType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Ambulance Type</option>
//             <option value="BASIC_LIFE_SUPPORT">Basic Life Support</option>
//             <option value="CARDIAC_AMBULANCE">Cardiac Ambulance</option>
//             <option value="ICU_LEVEL_1">ICU Level 1</option>
//             <option value="ICU_LEVEL_2">ICU Level 2</option>
//             <option value="ICU_LEVEL_3">ICU Level 3</option>
//           </select>

//           {/* Vehicle Type */}
//           <select
//             name="vehicleType"
//             value={form.vehicleType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Vehicle Type</option>
//             <option value="MARUTI_OMNI">Maruti Omni</option>
//             <option value="FORCE_TRAVELLER">Force Traveller</option>
//             <option value="TATA_WINGER_AMBULANCE">Tata Winger</option>
//             <option value="TOYOTA_HIACE">Toyota Hiace</option>
//           </select>

//           {/* Driver Name */}
//           <input
//             name="fullName"
//             value={form.fullName}
//             onChange={handleChange}
//             placeholder="Driver Name"
//             className="border p-2 rounded"
//           />

//           {/* Mobile */}
//           <input
//             name="mobileNumber"
//             value={form.mobileNumber}
//             onChange={handleChange}
//             placeholder="Mobile Number"
//             className="border p-2 rounded"
//           />

//           {/* Email */}
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 rounded"
//           />

//           {/* Customer Care */}
//           <input
//             name="customerCareNumber"
//             value={form.customerCareNumber}
//             onChange={handleChange}
//             placeholder="Customer Care Number"
//             className="border p-2 rounded"
//           />

//           {/* Location */}
//           <input
//             name="mapLocation"
//             value={form.mapLocation}
//             onChange={handleChange}
//             placeholder="Location"
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 border rounded"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-[#09B438] text-white rounded"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditAmbulancePopup;















// "use client";

// import React, { useState } from "react";
// import useAmbulanceStore from "@/app/lib/store/useAmbulanceStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// function EditAmbulancePopup({ ambulance, onClose }) {
//   const { updateAmbulance } = useAmbulanceStore();

//   // FORM STATE
//   const [form, setForm] = useState({
//     fullName: ambulance.fullName || "",
//     email: ambulance.email || "",
//     mobileNumber: ambulance.mobileNumber || "",
//     ambulanceName: ambulance.ambulanceName || "",
//     customerCareNumber: ambulance.customerCareNumber || "",
//     ambulanceType: ambulance.ambulanceType || "",
//     vehicleType: ambulance.vehicleType || "",
//   });

//   // LOCATION STATE (same pattern as nurse form)
//   const [location, setLocation] = useState({
//     latitude: ambulance.latitude || "",
//     longitude: ambulance.longitude || "",
//     mapLocation: ambulance.mapLocation || "",
//   });

//   const [showLocationPopup, setShowLocationPopup] = useState(false);

//   // HANDLE INPUT CHANGE
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // SUBMIT
//   const handleSubmit = async () => {
//     const payload = {
//       ...form,
//       latitude: location.latitude,
//       longitude: location.longitude,
//       mapLocation: location.mapLocation,
//     };

//     await updateAmbulance(ambulance.id, payload);
//     onClose();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//         <div className="bg-white w-[650px] rounded-[15px] p-6">
//           <h2 className="text-[20px] font-semibold mb-6">
//             Edit Ambulance Service
//           </h2>

//           <div className="grid grid-cols-2 gap-4">
//             {/* Ambulance Name */}
//             <input
//               name="ambulanceName"
//               value={form.ambulanceName}
//               onChange={handleChange}
//               placeholder="Ambulance Name"
//               className="border p-2 rounded"
//             />

//             {/* Ambulance Type */}
//             <select
//               name="ambulanceType"
//               value={form.ambulanceType}
//               onChange={handleChange}
//               className="border p-2 rounded"
//             >
//               <option value="">Select Ambulance Type</option>
//               <option value="BASIC_LIFE_SUPPORT">Basic Life Support</option>
//               <option value="CARDIAC_AMBULANCE">Cardiac Ambulance</option>
//               <option value="ICU_LEVEL_1">ICU Level 1</option>
//               <option value="ICU_LEVEL_2">ICU Level 2</option>
//               <option value="ICU_LEVEL_3">ICU Level 3</option>
//             </select>

//             {/* Vehicle Type */}
//             <select
//               name="vehicleType"
//               value={form.vehicleType}
//               onChange={handleChange}
//               className="border p-2 rounded"
//             >
//               <option value="">Select Vehicle Type</option>
//               <option value="MARUTI_OMNI">Maruti Omni</option>
//               <option value="FORCE_TRAVELLER">Force Traveller</option>
//               <option value="TATA_WINGER_AMBULANCE">Tata Winger</option>
//               <option value="TOYOTA_HIACE">Toyota Hiace</option>
//             </select>

//             {/* Driver Name */}
//             <input
//               name="fullName"
//               value={form.fullName}
//               onChange={handleChange}
//               placeholder="Driver Name"
//               className="border p-2 rounded"
//             />

//             {/* Mobile */}
//             <input
//               name="mobileNumber"
//               value={form.mobileNumber}
//               onChange={handleChange}
//               placeholder="Mobile Number"
//               className="border p-2 rounded"
//             />

//             {/* Email */}
//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="border p-2 rounded"
//             />

//             {/* Customer Care */}
//             <input
//               name="customerCareNumber"
//               value={form.customerCareNumber}
//               onChange={handleChange}
//               placeholder="Customer Care Number"
//               className="border p-2 rounded"
//             />

//             {/* LOCATION (click → popup) */}
//             <input
//               type="text"
//               value={location.mapLocation || ""}
//               placeholder="Select Location"
//               readOnly
//               onClick={() => setShowLocationPopup(true)}
//               className="border p-2 rounded cursor-pointer bg-white col-span-2"
//             />
//           </div>

//           {/* ACTIONS */}
//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               onClick={onClose}
//               className="px-6 py-2 border rounded"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 bg-[#09B438] text-white rounded"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* LOCATION PICKER POPUP */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={location.latitude}
//           currentLng={location.longitude}
//           bookingId={null}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={(coords) => {
//             // coords = { latitude, longitude, mapLocation }
//             setLocation(coords);
//             setShowLocationPopup(false);
//           }}
//         />
//       )}
//     </>
//   );
// }

// export default EditAmbulancePopup;






// "use client";

// import React, { useState } from "react";
// import useAmbulanceStore from "@/app/lib/store/useAmbulanceStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// function EditAmbulancePopup({ ambulance, onClose }) {
//   const { updateAmbulance, fetchAmbulances } = useAmbulanceStore();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   // FORM STATE
//   const [form, setForm] = useState({
//     fullName: ambulance.fullName || "",
//     email: ambulance.email || "",
//     mobileNumber: ambulance.mobileNumber?.replace("+91", "") || "",
//     ambulanceName: ambulance.ambulanceName || "",
//     customerCareNumber:
//       ambulance.customerCareNumber?.replace("+91", "") || "",
//     ambulanceType: ambulance.ambulanceType || "",
//     vehicleType: ambulance.vehicleType || "",
//   });

//   // LOCATION STATE
//   const [location, setLocation] = useState({
//     latitude: ambulance.latitude || "",
//     longitude: ambulance.longitude || "",
//     mapLocation: ambulance.mapLocation || "",
//   });

//   const [showLocationPopup, setShowLocationPopup] = useState(false);

//   // HANDLE CHANGE
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // only numbers for phone fields
//     if (
//       (name === "mobileNumber" || name === "customerCareNumber") &&
//       (!/^\d*$/.test(value) || value.length > 10)
//     ) {
//       return;
//     }

//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // VALIDATION
//   const validate = () => {
//     const newErrors = {};

//     if (!form.ambulanceName) newErrors.ambulanceName = "Required";
//     if (!form.fullName) newErrors.fullName = "Required";
//     if (form.mobileNumber.length !== 10)
//       newErrors.mobileNumber = "Must be 10 digits";
//     if (
//       form.customerCareNumber &&
//       form.customerCareNumber.length !== 10
//     )
//       newErrors.customerCareNumber = "Must be 10 digits";
//     if (!form.ambulanceType) newErrors.ambulanceType = "Required";
//     if (!form.vehicleType) newErrors.vehicleType = "Required";
//     if (!location.latitude || !location.longitude)
//       newErrors.location = "Select location";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // SUBMIT
//   const handleSubmit = async () => {
//     if (!validate()) return;

//     setIsSubmitting(true);

//     const payload = {
//       ...form,
//       mobileNumber: `+91${form.mobileNumber}`,
//       customerCareNumber: form.customerCareNumber
//         ? `+91${form.customerCareNumber}`
//         : "",
//       latitude: location.latitude,
//       longitude: location.longitude,
//       mapLocation: location.mapLocation,
//     };

//     try {
//       await updateAmbulance(ambulance.id, payload);

//       // refresh list once
//       await fetchAmbulances(1, { filter: "ALL" });

//       onClose();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//         <div className="bg-white w-[700px] rounded-[16px] p-8">
//           <h2 className="text-[20px] font-semibold mb-6">
//             Edit Ambulance Service
//           </h2>

//           <div className="grid grid-cols-2 gap-4">
//             {/* Ambulance Name */}
//             <input
//               name="ambulanceName"
//               value={form.ambulanceName}
//               onChange={handleChange}
//               placeholder="Ambulance Name"
//               className="input"
//             />

//             {/* Ambulance Type */}
//             <select
//               name="ambulanceType"
//               value={form.ambulanceType}
//               onChange={handleChange}
//               className="input"
//             >
//               <option value="">Ambulance Type</option>
//               <option value="BASIC_LIFE_SUPPORT">Basic Life Support</option>
//               <option value="CARDIAC_AMBULANCE">Cardiac Ambulance</option>
//               <option value="ICU_LEVEL_1">ICU Level 1</option>
//               <option value="ICU_LEVEL_2">ICU Level 2</option>
//               <option value="ICU_LEVEL_3">ICU Level 3</option>
//             </select>

//             {/* Vehicle Type */}
//             <select
//               name="vehicleType"
//               value={form.vehicleType}
//               onChange={handleChange}
//               className="input"
//             >
//               <option value="">Vehicle Type</option>
//               <option value="MARUTI_OMNI">Maruti Omni</option>
//               <option value="FORCE_TRAVELLER">Force Traveller</option>
//               <option value="TATA_WINGER_AMBULANCE">Tata Winger</option>
//               <option value="TOYOTA_HIACE">Toyota Hiace</option>
//             </select>

//             {/* Driver Name */}
//             <input
//               name="fullName"
//               value={form.fullName}
//               onChange={handleChange}
//               placeholder="Driver Name"
//               className="input"
//             />

//             {/* Mobile */}
//             <div className="flex gap-2 items-center">
//               <span className="px-3 py-2 border rounded">+91</span>
//               <input
//                 name="mobileNumber"
//                 value={form.mobileNumber}
//                 onChange={handleChange}
//                 placeholder="Mobile Number"
//                 className="input flex-1"
//               />
//             </div>

//             {/* Email */}
//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="input"
//             />

//             {/* Customer Care */}
//             <div className="flex gap-2 items-center">
//               <span className="px-3 py-2 border rounded">+91</span>
//               <input
//                 name="customerCareNumber"
//                 value={form.customerCareNumber}
//                 onChange={handleChange}
//                 placeholder="Customer Care"
//                 className="input flex-1"
//               />
//             </div>

//             {/* Location */}
//             <input
//               type="text"
//               value={location.mapLocation || ""}
//               placeholder="Select Location"
//               readOnly
//               onClick={() => setShowLocationPopup(true)}
//               className="input col-span-2 cursor-pointer bg-white"
//             />
//           </div>

//           {/* ERROR */}
//           {errors.location && (
//             <p className="text-red-500 text-sm mt-2">
//               {errors.location}
//             </p>
//           )}

//           {/* ACTIONS */}
//           <div className="flex justify-end gap-4 mt-8">
//             <button
//               onClick={onClose}
//               className="px-6 py-2 border rounded-[12px]"
//             >
//               Cancel
//             </button>

//             <button
//               disabled={isSubmitting}
//               onClick={handleSubmit}
//               className="px-6 py-2 bg-[#09B438] text-white rounded-[12px] disabled:opacity-50"
//             >
//               {isSubmitting ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* LOCATION PICKER */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={location.latitude}
//           currentLng={location.longitude}
//           bookingId={null}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={(coords) => {
//             setLocation(coords);
//             setShowLocationPopup(false);
//           }}
//         />
//       )}
//     </>
//   );
// }

// export default EditAmbulancePopup;




"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useAmbulanceStore from "@/app/lib/store/useAmbulanceStore";
import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

function EditAmbulancePopup({ ambulance, onClose }) {
  const { updateAmbulance, fetchAmbulances } = useAmbulanceStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    ambulanceName: ambulance.ambulanceName || "",
    ambulanceType: ambulance.ambulanceType || "",
    vehicleType: ambulance.vehicleType || "",
    fullName: ambulance.fullName || "",
    email: ambulance.email || "",
    mobileNumber: ambulance.mobileNumber?.replace("+91", "") || "",
    customerCareNumber:
      ambulance.customerCareNumber?.replace("+91", "") || "",
  });

  const [location, setLocation] = useState({
    latitude: ambulance.latitude || "",
    longitude: ambulance.longitude || "",
    mapLocation: ambulance.mapLocation || "",
  });

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only digits for phone fields
    if (
      (name === "mobileNumber" || name === "customerCareNumber") &&
      (!/^\d*$/.test(value) || value.length > 10)
    ) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    if (!form.ambulanceName) newErrors.ambulanceName = "Ambulance name required";
    if (!form.ambulanceType) newErrors.ambulanceType = "Select ambulance type";
    if (!form.vehicleType) newErrors.vehicleType = "Select vehicle type";
    if (!form.fullName) newErrors.fullName = "Driver name required";

    if (!form.mobileNumber || form.mobileNumber.length !== 10)
      newErrors.mobileNumber = "Enter valid 10 digit number";

    if (
      form.customerCareNumber &&
      form.customerCareNumber.length !== 10
    )
      newErrors.customerCareNumber = "Must be 10 digits";

    if (!location.latitude || !location.longitude)
      newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      ...form,
      mobileNumber: `+91${form.mobileNumber}`,
      customerCareNumber: form.customerCareNumber
        ? `+91${form.customerCareNumber}`
        : "",
      latitude: location.latitude,
      longitude: location.longitude,
      mapLocation: location.mapLocation,
    };

    try {
      await updateAmbulance(ambulance.id, payload);

      // Refresh list once
    //   await fetchAmbulances(1, { filter: "ALL" });

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="relative bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl border border-gray-200">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Ambulance Service
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Ambulance Name */}
            <Input
              label="Ambulance Name"
              name="ambulanceName"
              value={form.ambulanceName}
              onChange={handleChange}
              error={errors.ambulanceName}
            />

            {/* Ambulance Type */}
            <Select
              label="Ambulance Type"
              name="ambulanceType"
              value={form.ambulanceType}
              onChange={handleChange}
              error={errors.ambulanceType}
              options={[
                { label: "Select", value: "" },
                { label: "Basic Life Support", value: "BASIC_LIFE_SUPPORT" },
                { label: "Cardiac Ambulance", value: "CARDIAC_AMBULANCE" },
                { label: "ICU Level 1", value: "ICU_LEVEL_1" },
                { label: "ICU Level 2", value: "ICU_LEVEL_2" },
                { label: "ICU Level 3", value: "ICU_LEVEL_3" },
              ]}
            />

            {/* Vehicle Type */}
            <Select
              label="Vehicle Type"
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              error={errors.vehicleType}
              options={[
                { label: "Select", value: "" },
                { label: "Maruti Omni", value: "MARUTI_OMNI" },
                { label: "Force Traveller", value: "FORCE_TRAVELLER" },
                { label: "Tata Winger", value: "TATA_WINGER_AMBULANCE" },
                { label: "Toyota Hiace", value: "TOYOTA_HIACE" },
              ]}
            />

            {/* Driver Name */}
            <Input
              label="Driver Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            {/* Mobile */}
            <PhoneInput
              label="Mobile Number"
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              error={errors.mobileNumber}
            />

            {/* Email */}
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            {/* Customer Care */}
            <PhoneInput
              label="Customer Care Number"
              name="customerCareNumber"
              value={form.customerCareNumber}
              onChange={handleChange}
              error={errors.customerCareNumber}
            />

            {/* Location */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Location
              </label>
              <button
                type="button"
                onClick={() => setShowLocationPopup(true)}
                className="w-full border border-gray-300 rounded-lg p-2 text-left text-sm"
              >
                {location.mapLocation || "Pick location on map"}
              </button>
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* LOCATION PICKER */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={location.latitude}
          currentLng={location.longitude}
          bookingId={null}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(coords) => {
            setLocation(coords);
            setShowLocationPopup(false);
          }}
        />
      )}
    </>
  );
}

/* ---------- SMALL UI HELPERS ---------- */

const Input = ({ label, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg p-2 text-sm"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>
    <select
      {...props}
      className="w-full border border-gray-300 rounded-lg p-2 text-sm"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PhoneInput = ({ label, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>
    <div className="flex gap-2">
      <span className="px-3 py-2 border rounded-lg text-sm bg-gray-50">
        +91
      </span>
      <input
        {...props}
        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default EditAmbulancePopup;
