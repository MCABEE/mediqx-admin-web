// import Navlink from "@/components/productManagement/Navlink";
// import React from "react";

// function page() {
//   return (
//     <div>
//       <Navlink />

//       <div className="border border-[#f1d7d7] rounded-[15px] p-[23px] flex flex-col gap-[16px] bg-[#FFFFFF] mt-2">
//         <p className="pb-[12px] font-semibold">Add Product Details</p>
//         <input
//           type="text"
//           placeholder="Product Name"
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
//         />
//         <textarea
//           placeholder="Description"
//           name=""
//           id=""
//           className="w-[328px] h-[144px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none pt-2"
//         ></textarea>
//         <select className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none bg-white">
//           <option value="" disabled selected>
//             Quantity
//           </option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//         <input
//           type="text"
//           placeholder="MRP Price"
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
//         />
//         <input
//           type="text"
//           placeholder="Discounted Price"
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
//         />
//         <input
//           type="text"
//           placeholder="Referral Commission Amount"
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[16px] outline-none file:border-0 file:bg-transparent file:text-[14px] file:font-light"
//         />
//         <button className="w-[328px] h-[40px] bg-[#3674B5] border border-[#BBBBBB] rounded-[15px] text-[14px] text-white font-light px-[16px] outline-none file:border-0 file:bg-transparent file:text-[14px] file:font-light">
//           Next
//         </button>

//         <p className="text-[14px] font-semibold text-black  ">
//           Patient Health Status
//         </p>
//         <div className="grid grid-cols-2">
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">
//               Walkable with Support
//             </span>
//           </div>
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">
//               Walkable with Support
//             </span>
//           </div>
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">
//               Walkable with Support
//             </span>
//           </div>
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">
//               Walkable with Support
//             </span>
//           </div>
//         </div>
//         <p className="text-[14px] font-semibold text-black pt-[30px] ">
//           Diagnosis
//         </p>
//         <div className="grid grid-cols-2">
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">Advanced Dementia</span>
//           </div>
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">Advanced Dementia</span>
//           </div>
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">Advanced Dementia</span>
//           </div>
//           <div className="flex gap-2 pt-4">
//             <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
//             <span className="text-[16px] text-black ">
//               Walkable with Support
//             </span>
//           </div>
//         </div>
//         <button className="w-[328px] h-[40px] bg-[#3674B5] border border-[#BBBBBB] rounded-[15px] text-[14px] text-white font-light px-[16px] outline-none file:border-0 file:bg-transparent file:text-[14px] file:font-light my-[55px]">
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default page;













// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useEffect, useState } from "react";
// import useProductStore from "@/app/lib/store/useProductStore";
// import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
// import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";

// export default function Page() {
//   const { addProduct, loading } = useProductStore();

//   const { listedServices: healthStatuses, fetchServices: fetchHealthStatuses } =
//     useHealthStatusStore();

//   const { listedDiagnoses, fetchDiagnosesList } = useDiagnosisStore();

//   const [form, setForm] = useState({
//     productName: "",
//     description: "",
//     quantity: "",
//     mrpPrice: "",
//     discountedPrice: "",
//     referralCommissionAmount: "",
//   });

//   const [healthStatusIds, setHealthStatusIds] = useState([]);
//   const [diagnosisIds, setDiagnosisIds] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     fetchHealthStatuses(1, 100);
//     fetchDiagnosesList(1, 100);
//   }, []);

//   const toggleArray = (id, array, setter) => {
//     setter(
//       array.includes(id)
//         ? array.filter((x) => x !== id)
//         : [...array, id]
//     );
//   };

//   const validate = () => {
//     const e = {};

//     if (!form.productName) e.productName = "Product name required";
//     if (!form.description) e.description = "Description required";
//     if (!form.quantity) e.quantity = "Quantity required";
//     if (!form.mrpPrice) e.mrpPrice = "MRP required";
//     if (!form.discountedPrice) e.discountedPrice = "Discounted price required";
//     if (Number(form.discountedPrice) > Number(form.mrpPrice))
//       e.discountedPrice = "Discounted price cannot exceed MRP";
//     if (!form.referralCommissionAmount)
//       e.referralCommissionAmount = "Referral commission required";
//     if (healthStatusIds.length === 0)
//       e.healthStatusIds = "Select at least one health status";
//     if (diagnosisIds.length === 0)
//       e.diagnosisIds = "Select at least one diagnosis";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     const payload = {
//       productName: form.productName,
//       description: form.description,
//       quantity: Number(form.quantity),
//       mrpPrice: Number(form.mrpPrice),
//       discountedPrice: Number(form.discountedPrice),
//       referralCommissionAmount: Number(form.referralCommissionAmount),
//       healthStatusIds,
//       diagnosisIds,
//     };

//     try {
//       await addProduct(payload);
//       alert("Product added successfully");
//       setForm({
//         productName: "",
//         description: "",
//         quantity: "",
//         mrpPrice: "",
//         discountedPrice: "",
//         referralCommissionAmount: "",
//       });
//       setHealthStatusIds([]);
//       setDiagnosisIds([]);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div>
//       <Navlink />

//       <div className="border border-[#f1d7d7] rounded-[15px] p-[23px] flex flex-col gap-[16px] bg-white mt-2">
//         <p className="font-semibold">Add Product Details</p>

//         {[
//           ["productName", "Product Name"],
//           ["mrpPrice", "MRP Price"],
//           ["discountedPrice", "Discounted Price"],
//           ["referralCommissionAmount", "Referral Commission Amount"],
//         ].map(([key, label]) => (
//           <div key={key}>
//             <input
//               value={form[key]}
//               onChange={(e) =>
//                 setForm({ ...form, [key]: e.target.value })
//               }
//               placeholder={label}
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px] outline-none"
//             />
//             {errors[key] && (
//               <p className="text-red-500 text-sm">{errors[key]}</p>
//             )}
//           </div>
//         ))}

//         <textarea
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           placeholder="Description"
//           className="w-[328px] h-[144px] border border-[#BBBBBB] rounded-[15px] px-[32px] pt-2 outline-none"
//         />
//         {errors.description && (
//           <p className="text-red-500 text-sm">{errors.description}</p>
//         )}

 

//         <select
//           value={form.quantity}
//           onChange={(e) =>
//             setForm({ ...form, quantity: e.target.value })
//           }
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px]"
//         >
//           <option value="">Quantity</option>
//           {[1, 2, 3, 4, 5].map((q) => (
//             <option key={q}>{q}</option>
//           ))}
//         </select>

//         {/* HEALTH STATUS */}
//         <p className="font-semibold">Patient Health Status</p>
//         <div className="grid grid-cols-2">
//           {healthStatuses.map((item) => (
//             <label key={item.id} className="flex gap-2 pt-2">
//               <input
//                 type="checkbox"
//                 checked={healthStatusIds.includes(item.id)}
//                 onChange={() =>
//                   toggleArray(item.id, healthStatusIds, setHealthStatusIds)
//                 }
//               />
//               {item.status}
//             </label>
//           ))}
//         </div>
//         {errors.healthStatusIds && (
//           <p className="text-red-500 text-sm">{errors.healthStatusIds}</p>
//         )}

//         {/* DIAGNOSIS */}
//         <p className="font-semibold pt-4">Diagnosis</p>
//         <div className="grid grid-cols-2">
//           {listedDiagnoses.map((item) => (
//             <label key={item.id} className="flex gap-2 pt-2">
//               <input
//                 type="checkbox"
//                 checked={diagnosisIds.includes(item.id)}
//                 onChange={() =>
//                   toggleArray(item.id, diagnosisIds, setDiagnosisIds)
//                 }
//               />
//               {item.diagnosis}
//             </label>
//           ))}
//         </div>
//         {errors.diagnosisIds && (
//           <p className="text-red-500 text-sm">{errors.diagnosisIds}</p>
//         )}

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] my-6"
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// }















// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useEffect, useState } from "react";
// import useProductStore from "@/app/lib/store/useProductStore";
// import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
// import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";

// export default function Page() {
//   const {
//     addProduct,
//     generateUploadUrl,
//     confirmFileUpload,
//     setUploadedFile,
//     loading,
//   } = useProductStore();

//   const { listedServices: healthStatuses, fetchServices: fetchHealthStatuses } =
//     useHealthStatusStore();

//   const { listedDiagnoses, fetchDiagnosesList } = useDiagnosisStore();

//   const [form, setForm] = useState({
//     productName: "",
//     description: "",
//     quantity: "",
//     mrpPrice: "",
//     discountedPrice: "",
//     referralCommissionAmount: "",
//   });

//   const [healthStatusIds, setHealthStatusIds] = useState([]);
//   const [diagnosisIds, setDiagnosisIds] = useState([]);
//   const [productImage, setProductImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchHealthStatuses(1, 100);
//     fetchDiagnosesList(1, 100);
//   }, [fetchHealthStatuses, fetchDiagnosesList]);

//   const toggleArray = (id, array, setter) => {
//     setter(
//       array.includes(id)
//         ? array.filter((x) => x !== id)
//         : [...array, id]
//     );
//   };

//   const validate = () => {
//     const e = {};

//     if (!form.productName) e.productName = "Product name required";
//     if (!form.description) e.description = "Description required";
//     if (!form.quantity) e.quantity = "Quantity required";
//     if (!form.mrpPrice) e.mrpPrice = "MRP required";
//     if (!form.discountedPrice) e.discountedPrice = "Discounted price required";
//     if (+form.discountedPrice > +form.mrpPrice)
//       e.discountedPrice = "Discounted price cannot exceed MRP";
//     if (!form.referralCommissionAmount)
//       e.referralCommissionAmount = "Referral commission required";
//     if (healthStatusIds.length === 0)
//       e.healthStatusIds = "Select at least one health status";
//     if (diagnosisIds.length === 0)
//       e.diagnosisIds = "Select at least one diagnosis";
//     if (!productImage)
//       e.productImage = "Product image is required";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       /* ---------------- 1️⃣ CREATE PRODUCT ---------------- */
//       const res = await addProduct({
//         productName: form.productName,
//         description: form.description,
//         quantity: Number(form.quantity),
//         mrpPrice: Number(form.mrpPrice),
//         discountedPrice: Number(form.discountedPrice),
//         referralCommissionAmount: Number(
//           form.referralCommissionAmount
//         ),
//         healthStatusIds,
//         diagnosisIds,
//       });

//       const productId = res.id;
//       if (!productId) throw new Error("Product ID not returned");

//       /* ---------------- 2️⃣ UPLOAD PRODUCT IMAGE ---------------- */
//       setUploading(true);

//       const { signedUrl, fileId } = await generateUploadUrl({
//         productId, // ✅ PASSED AS userId INTERNALLY
//         fileName: productImage.name,
//         contentType: productImage.type,
//         type: "PRODUCT_IMAGE",
//         productId:productId,
//       });

//       const uploadRes = await fetch(signedUrl, {
//         method: "PUT",
//         headers: { "Content-Type": productImage.type },
//         body: productImage,
//       });

//       if (!uploadRes.ok) throw new Error("Image upload failed");

//       await confirmFileUpload(fileId, "PRODUCT_IMAGE");
//       setUploadedFile("PRODUCT_IMAGE", fileId);

//       console.log("Product added successfully");

//       /* ---------------- RESET ---------------- */
//       setForm({
//         productName: "",
//         description: "",
//         quantity: "",
//         mrpPrice: "",
//         discountedPrice: "",
//         referralCommissionAmount: "",
//       });
//       setHealthStatusIds([]);
//       setDiagnosisIds([]);
//       setProductImage(null);
//     } catch (err) {
//       console.log(err.message || "Something went wrong");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <Navlink />

//       <div className="border border-[#f1d7d7] rounded-[15px] p-[23px] flex flex-col gap-[16px] bg-white mt-2">
//         <p className="font-semibold">Add Product Details</p>

//         {[
//           ["productName", "Product Name"],
//           ["mrpPrice", "MRP Price"],
//           ["discountedPrice", "Discounted Price"],
//           ["referralCommissionAmount", "Referral Commission Amount"],
//         ].map(([key, label]) => (
//           <div key={key}>
//             <input
//               value={form[key]}
//               onChange={(e) =>
//                 setForm({ ...form, [key]: e.target.value })
//               }
//               placeholder={label}
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px] outline-none"
//             />
//             {errors[key] && (
//               <p className="text-red-500 text-sm">{errors[key]}</p>
//             )}
//           </div>
//         ))}

//         <textarea
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           placeholder="Description"
//           className="w-[328px] h-[144px] border border-[#BBBBBB] rounded-[15px] px-[32px] pt-2 outline-none"
//         />
//         {errors.description && (
//           <p className="text-red-500 text-sm">{errors.description}</p>
//         )}

//         {/* PRODUCT IMAGE */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setProductImage(e.target.files[0])}
//           disabled={uploading}
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[16px] file:border-0 file:bg-transparent"
//         />
//         {errors.productImage && (
//           <p className="text-red-500 text-sm">{errors.productImage}</p>
//         )}

//         <select
//           value={form.quantity}
//           onChange={(e) =>
//             setForm({ ...form, quantity: e.target.value })
//           }
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px]"
//         >
//           <option value="">Quantity</option>
//           {[1, 2, 3, 4, 5].map((q) => (
//             <option key={q}>{q}</option>
//           ))}
//         </select>

//         {/* HEALTH STATUS */}
//         <p className="font-semibold">Patient Health Status</p>
//         <div className="grid grid-cols-2">
//           {healthStatuses.map((item) => (
//             <label key={item.id} className="flex gap-2 pt-2">
//               <input
//                 type="checkbox"
//                 checked={healthStatusIds.includes(item.id)}
//                 onChange={() =>
//                   toggleArray(item.id, healthStatusIds, setHealthStatusIds)
//                 }
//               />
//               {item.status}
//             </label>
//           ))}
//         </div>
//         {errors.healthStatusIds && (
//           <p className="text-red-500 text-sm">{errors.healthStatusIds}</p>
//         )}

//         {/* DIAGNOSIS */}
//         <p className="font-semibold pt-4">Diagnosis</p>
//         <div className="grid grid-cols-2">
//           {listedDiagnoses.map((item) => (
//             <label key={item.id} className="flex gap-2 pt-2">
//               <input
//                 type="checkbox"
//                 checked={diagnosisIds.includes(item.id)}
//                 onChange={() =>
//                   toggleArray(item.id, diagnosisIds, setDiagnosisIds)
//                 }
//               />
//               {item.diagnosis}
//             </label>
//           ))}
//         </div>
//         {errors.diagnosisIds && (
//           <p className="text-red-500 text-sm">{errors.diagnosisIds}</p>
//         )}

//         <button
//           onClick={handleSubmit}
//           disabled={loading || uploading}
//           className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] my-6"
//         >
//           {loading || uploading ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// }











"use client";

import Navlink from "@/components/productManagement/Navlink";
import React, { useEffect, useRef, useState } from "react";
import useProductStore from "@/app/lib/store/useProductStore";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";

export default function Page() {
  const {
    addProduct,
    generateUploadUrl,
    confirmFileUpload,
    setUploadedFile,
    loading,
  } = useProductStore();

  const { listedServices: healthStatuses, fetchServices } =
    useHealthStatusStore();

  const { listedDiagnoses, fetchDiagnosesList } =
    useDiagnosisStore();

  const fileRef = useRef(null);

  const [form, setForm] = useState({
    productName: "",
    description: "",
    quantity: "",
    mrpPrice: "",
    discountedPrice: "",
    referralCommissionAmount: "",
  });

  const [healthStatusIds, setHealthStatusIds] = useState([]);
  const [diagnosisIds, setDiagnosisIds] = useState([]);
  const [productImage, setProductImage] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices(1, 100);
    fetchDiagnosesList(1, 100);
  }, [fetchServices, fetchDiagnosesList]);

  /* ---------------- HELPERS ---------------- */

  const toggleArray = (id, array, setter) => {
    setter(array.includes(id) ? array.filter((x) => x !== id) : [...array, id]);
  };

  const validate = () => {
    if (!form.productName.trim()) return "Product name is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.quantity) return "Quantity is required";
    if (!form.mrpPrice) return "MRP price is required";
    if (!form.discountedPrice) return "Discounted price is required";
    if (+form.discountedPrice > +form.mrpPrice)
      return "Discounted price cannot exceed MRP";
    if (!form.referralCommissionAmount)
      return "Referral commission amount is required";
    if (!productImage) return "Product image is required";
    if (healthStatusIds.length === 0)
      return "Select at least one health status";
    if (diagnosisIds.length === 0)
      return "Select at least one diagnosis";

    return "";
  };

  const resetAll = () => {
    setForm({
      productName: "",
      description: "",
      quantity: "",
      mrpPrice: "",
      discountedPrice: "",
      referralCommissionAmount: "",
    });
    setHealthStatusIds([]);
    setDiagnosisIds([]);
    setProductImage(null);
    setErrorMessage("");
    setSuccessMessage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      /* 1️⃣ CREATE PRODUCT */
      const res = await addProduct({
        productName: form.productName.trim(),
        description: form.description.trim(),
        quantity: Number(form.quantity),
        mrpPrice: Number(form.mrpPrice),
        discountedPrice: Number(form.discountedPrice),
        referralCommissionAmount: Number(form.referralCommissionAmount),
        healthStatusIds,
        diagnosisIds,
      });

      const productId = res.id;
      if (!productId) throw new Error("Product ID not returned");

      /* 2️⃣ UPLOAD IMAGE */
      setUploading(true);

      const { signedUrl, fileId } = await generateUploadUrl({
        productId, // passed as userId internally
        fileName: productImage.name,
        contentType: productImage.type,
        type: "PRODUCT_IMAGE",
      });

      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": productImage.type },
        body: productImage,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");

      await confirmFileUpload(fileId, "PRODUCT_IMAGE");
      setUploadedFile("PRODUCT_IMAGE", fileId);

      setSuccessMessage("Product added successfully ✅");
      resetAll();
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div>
      <Navlink />

      <div className="border border-[#f1d7d7] rounded-[15px] p-[23px] flex flex-col gap-[16px] bg-white mt-2">
        <p className="font-semibold">Add Product Details</p>

        {[
          ["productName", "Product Name"],
          ["mrpPrice", "MRP Price"],
          ["discountedPrice", "Discounted Price"],
          ["referralCommissionAmount", "Referral Commission Amount"],
        ].map(([key, label]) => (
          <input
            key={key}
            value={form[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            placeholder={label}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px] outline-none"
          />
        ))}

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
          className="w-[328px] h-[144px] border border-[#BBBBBB] rounded-[15px] px-[32px] pt-2 outline-none"
        />

        {/* PRODUCT IMAGE */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => setProductImage(e.target.files[0])}
          disabled={uploading}
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[16px] file:border-0 file:bg-transparent"
        />

        <select
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px]"
        >
          <option value="">Quantity</option>
          {[1, 2, 3, 4, 5].map((q) => (
            <option key={q}>{q}</option>
          ))}
        </select>

        {/* HEALTH STATUS */}
        <p className="font-semibold">Patient Health Status</p>
        <div className="grid grid-cols-2">
          {healthStatuses.map((item) => (
            <label key={item.id} className="flex gap-2 pt-2">
              <input
                type="checkbox"
                checked={healthStatusIds.includes(item.id)}
                onChange={() =>
                  toggleArray(item.id, healthStatusIds, setHealthStatusIds)
                }
              />
              {item.status}
            </label>
          ))}
        </div>

        {/* DIAGNOSIS */}
        <p className="font-semibold pt-4">Diagnosis</p>
        <div className="grid grid-cols-2">
          {listedDiagnoses.map((item) => (
            <label key={item.id} className="flex gap-2 pt-2">
              <input
                type="checkbox"
                checked={diagnosisIds.includes(item.id)}
                onChange={() =>
                  toggleArray(item.id, diagnosisIds, setDiagnosisIds)
                }
              />
              {item.diagnosis}
            </label>
          ))}
        </div>

        {/* BUTTON + MESSAGES */}
        <button
          onClick={handleSubmit}
          disabled={loading || uploading}
          className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] mt-4"
        >
          {loading || uploading ? "Saving..." : "Save"}
        </button>

        {errorMessage && (
          <p className="text-red-500 text-sm">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="text-green-600 text-sm">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
}
