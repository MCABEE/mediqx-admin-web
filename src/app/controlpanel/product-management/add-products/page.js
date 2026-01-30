// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useEffect, useRef, useState } from "react";
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

//   const { listedServices: healthStatuses, fetchServices } =
//     useHealthStatusStore();

//   const { listedDiagnoses, fetchDiagnosesList } =
//     useDiagnosisStore();

//   const fileRef = useRef(null);

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

//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchServices(1, 100);
//     fetchDiagnosesList(1, 100);
//   }, [fetchServices, fetchDiagnosesList]);

//   /* ---------------- HELPERS ---------------- */

//   const toggleArray = (id, array, setter) => {
//     setter(array.includes(id) ? array.filter((x) => x !== id) : [...array, id]);
//   };

//   const validate = () => {
//     if (!form.productName.trim()) return "Product name is required";
//     if (!form.description.trim()) return "Description is required";
//     if (!form.quantity) return "Quantity is required";
//     if (!form.mrpPrice) return "MRP price is required";
//     if (!form.discountedPrice) return "Discounted price is required";
//     if (+form.discountedPrice > +form.mrpPrice)
//       return "Discounted price cannot exceed MRP";
//     if (!form.referralCommissionAmount)
//       return "Referral commission amount is required";
//     if (!productImage) return "Product image is required";
//     if (healthStatusIds.length === 0)
//       return "Select at least one health status";
//     if (diagnosisIds.length === 0)
//       return "Select at least one diagnosis";

//     return "";
//   };

//   const resetAll = () => {
//     setForm({
//       productName: "",
//       description: "",
//       quantity: "",
//       mrpPrice: "",
//       discountedPrice: "",
//       referralCommissionAmount: "",
//     });
//     setHealthStatusIds([]);
//     setDiagnosisIds([]);
//     setProductImage(null);
//     setErrorMessage("");
//     setSuccessMessage("");
//     if (fileRef.current) fileRef.current.value = "";
//   };

//   /* ---------------- SUBMIT ---------------- */

//   const handleSubmit = async () => {
//     setErrorMessage("");
//     setSuccessMessage("");

//     const validationError = validate();
//     if (validationError) {
//       setErrorMessage(validationError);
//       return;
//     }

//     try {
//       /* 1️⃣ CREATE PRODUCT */
//       const res = await addProduct({
//         productName: form.productName.trim(),
//         description: form.description.trim(),
//         quantity: Number(form.quantity),
//         mrpPrice: Number(form.mrpPrice),
//         discountedPrice: Number(form.discountedPrice),
//         referralCommissionAmount: Number(form.referralCommissionAmount),
//         healthStatusIds,
//         diagnosisIds,
//       });

//       const productId = res.id;
//       if (!productId) throw new Error("Product ID not returned");

//       /* 2️⃣ UPLOAD IMAGE */
//       setUploading(true);

//       const { signedUrl, fileId } = await generateUploadUrl({
//         productId, // passed as userId internally
//         fileName: productImage.name,
//         contentType: productImage.type,
//         type: "PRODUCT_IMAGE",
//       });

//       const uploadRes = await fetch(signedUrl, {
//         method: "PUT",
//         headers: { "Content-Type": productImage.type },
//         body: productImage,
//       });

//       if (!uploadRes.ok) throw new Error("Image upload failed");

//       await confirmFileUpload(fileId, "PRODUCT_IMAGE");
//       setUploadedFile("PRODUCT_IMAGE", fileId);

//       setSuccessMessage("Product added successfully ✅");
//       resetAll();
//     } catch (err) {
//       setErrorMessage(err.message || "Something went wrong");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------------- UI ---------------- */

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
//           <input
//             key={key}
//             value={form[key]}
//             onChange={(e) =>
//               setForm({ ...form, [key]: e.target.value })
//             }
//             placeholder={label}
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px] outline-none"
//           />
//         ))}

//         <textarea
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           placeholder="Description"
//           className="w-[328px] h-[144px] border border-[#BBBBBB] rounded-[15px] px-[32px] pt-2 outline-none"
//         />

//         {/* PRODUCT IMAGE */}
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           onChange={(e) => setProductImage(e.target.files[0])}
//           disabled={uploading}
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[16px] file:border-0 file:bg-transparent"
//         />

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

//         {/* BUTTON + MESSAGES */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading || uploading}
//           className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] mt-4"
//         >
//           {loading || uploading ? "Saving..." : "Save"}
//         </button>

//         {errorMessage && (
//           <p className="text-red-500 text-sm">
//             {errorMessage}
//           </p>
//         )}

//         {successMessage && (
//           <p className="text-green-600 text-sm">
//             {successMessage}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }








// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useEffect, useRef, useState } from "react";
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

//   const { listedServices: healthStatuses, fetchServices } =
//     useHealthStatusStore();

//   const { listedDiagnoses, fetchDiagnosesList } =
//     useDiagnosisStore();

//   const fileRef = useRef(null);

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

//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchServices(1, 100);
//     fetchDiagnosesList(1, 100);
//   }, [fetchServices, fetchDiagnosesList]);

//   /* ---------------- HELPERS ---------------- */

//   const toggleArray = (id, array, setter) => {
//     setter(array.includes(id) ? array.filter((x) => x !== id) : [...array, id]);
//   };

//   const validate = () => {
//     if (!form.productName.trim()) return "Product name is required";
//     if (!form.description.trim()) return "Description is required";
//     if (!form.quantity) return "Quantity is required";
//     if (!form.mrpPrice) return "MRP price is required";
//     if (!form.discountedPrice) return "Discounted price is required";
//     if (+form.discountedPrice > +form.mrpPrice)
//       return "Discounted price cannot exceed MRP";
//     if (!form.referralCommissionAmount)
//       return "Referral commission amount is required";
//     if (!productImage) return "Product image is required";
//     if (healthStatusIds.length === 0)
//       return "Select at least one health status";
//     if (diagnosisIds.length === 0)
//       return "Select at least one diagnosis";

//     return "";
//   };

//   const resetAll = () => {
//     setForm({
//       productName: "",
//       description: "",
//       quantity: "",
//       mrpPrice: "",
//       discountedPrice: "",
//       referralCommissionAmount: "",
//     });
//     setHealthStatusIds([]);
//     setDiagnosisIds([]);
//     setProductImage(null);
//     setErrorMessage("");
//     setSuccessMessage("");
//     if (fileRef.current) fileRef.current.value = "";
//   };

//   /* ---------------- SUBMIT ---------------- */

//   const handleSubmit = async () => {
//     setErrorMessage("");
//     setSuccessMessage("");

//     const validationError = validate();
//     if (validationError) {
//       setErrorMessage(validationError);
//       return;
//     }

//     try {
//       /* 1️⃣ CREATE PRODUCT */
//       const res = await addProduct({
//         productName: form.productName.trim(),
//         description: form.description.trim(),
//         quantity: Number(form.quantity),
//         mrpPrice: Number(form.mrpPrice),
//         discountedPrice: Number(form.discountedPrice),
//         referralCommissionAmount: Number(form.referralCommissionAmount),
//         healthStatusIds,
//         diagnosisIds,
//       });

//       const productId = res.id;
//       if (!productId) throw new Error("Product ID not returned");

//       /* 2️⃣ UPLOAD IMAGE */
//       setUploading(true);

//       const { signedUrl, fileId } = await generateUploadUrl({
//         productId, // passed as userId internally
//         fileName: productImage.name,
//         contentType: productImage.type,
//         type: "PRODUCT_IMAGE",
//       });

//       const uploadRes = await fetch(signedUrl, {
//         method: "PUT",
//         headers: { "Content-Type": productImage.type },
//         body: productImage,
//       });

//       if (!uploadRes.ok) throw new Error("Image upload failed");

//       await confirmFileUpload(fileId, "PRODUCT_IMAGE");
//       setUploadedFile("PRODUCT_IMAGE", fileId);

//       setSuccessMessage("Product added successfully ✅");
//       resetAll();
//     } catch (err) {
//       setErrorMessage(err.message || "Something went wrong");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------------- UI ---------------- */

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
//           <input
//             key={key}
//             value={form[key]}
//             onChange={(e) =>
//               setForm({ ...form, [key]: e.target.value })
//             }
//             placeholder={label}
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[32px] outline-none"
//           />
//         ))}

//         <textarea
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           placeholder="Description"
//           className="w-[328px] h-[144px] border border-[#BBBBBB] rounded-[15px] px-[32px] pt-2 outline-none"
//         />

//         {/* PRODUCT IMAGE */}
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           onChange={(e) => setProductImage(e.target.files[0])}
//           disabled={uploading}
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-[16px] file:border-0 file:bg-transparent"
//         />

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

//         {/* BUTTON + MESSAGES */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading || uploading}
//           className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] mt-4"
//         >
//           {loading || uploading ? "Saving..." : "Save"}
//         </button>

//         {errorMessage && (
//           <p className="text-red-500 text-sm">
//             {errorMessage}
//           </p>
//         )}

//         {successMessage && (
//           <p className="text-green-600 text-sm">
//             {successMessage}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }











// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useEffect, useRef, useState } from "react";
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

//   const { listedServices: healthStatuses, fetchServices } =
//     useHealthStatusStore();

//   const { listedDiagnoses, fetchDiagnosesList } =
//     useDiagnosisStore();

//   const fileRef = useRef(null);

//   const [form, setForm] = useState({
//     productName: "",
//     description: "",
//     purchaseRate: "",
//     quantity: "",
//     mrpPrice: "",
//     gstTax: "",
//     discountPercent: "",
//     hsnCode: "",
//     referralCommissionAmount: "",
//   });

//   const [healthStatusIds, setHealthStatusIds] = useState([]);
//   const [diagnosisIds, setDiagnosisIds] = useState([]);
//   const [productImage, setProductImage] = useState(null);

//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchServices(1, 100);
//     fetchDiagnosesList(1, 100);
//   }, [fetchServices, fetchDiagnosesList]);

//   /* ---------------- HELPERS ---------------- */

//   const toggleArray = (id, array, setter) => {
//     setter(array.includes(id) ? array.filter((x) => x !== id) : [...array, id]);
//   };

//   const validate = () => {
//     if (!form.productName.trim()) return "Product name is required";
//     if (!form.description.trim()) return "Description is required";
//     if (!form.purchaseRate) return "Purchase rate is required";
//     if (!form.quantity) return "Quantity is required";
//     if (!form.mrpPrice) return "MRP price is required";
//     if (!form.gstTax) return "GST tax is required";
//     if (!form.discountPercent) return "Discount % is required";
//     if (!form.hsnCode) return "HSN code is required";
//     if (!form.referralCommissionAmount)
//       return "Referral commission amount is required";
//     if (!productImage) return "Product image is required";
//     if (healthStatusIds.length === 0)
//       return "Select at least one health status";
//     if (diagnosisIds.length === 0)
//       return "Select at least one diagnosis";

//     return "";
//   };

//   const resetAll = () => {
//     setForm({
//       productName: "",
//       description: "",
//       purchaseRate: "",
//       quantity: "",
//       mrpPrice: "",
//       gstTax: "",
//       discountPercent: "",
//       hsnCode: "",
//       referralCommissionAmount: "",
//     });
//     setHealthStatusIds([]);
//     setDiagnosisIds([]);
//     setProductImage(null);
//     setErrorMessage("");
//     setSuccessMessage("");
//     if (fileRef.current) fileRef.current.value = "";
//   };

//   /* ---------------- SUBMIT ---------------- */

//   const handleSubmit = async () => {
//     setErrorMessage("");
//     setSuccessMessage("");

//     const validationError = validate();
//     if (validationError) {
//       setErrorMessage(validationError);
//       return;
//     }

//     try {
//       /* 1️⃣ CREATE PRODUCT */
//       const res = await addProduct({
//         productName: form.productName.trim(),
//         description: form.description.trim(),
//         purchaseRate: Number(form.purchaseRate),
//         quantity: Number(form.quantity),
//         mrpPrice: Number(form.mrpPrice),
//         gstTax: Number(form.gstTax),
//         discountPercent: Number(form.discountPercent),
//         hsnCode: Number(form.hsnCode),
//         referralCommissionAmount: Number(form.referralCommissionAmount),
//         healthStatusIds,
//         diagnosisIds,
//       });

//       const productId = res.id;
//       if (!productId) throw new Error("Product ID not returned");

//       /* 2️⃣ UPLOAD IMAGE */
//       setUploading(true);

//       const { signedUrl, fileId } = await generateUploadUrl({
//         productId,
//         fileName: productImage.name,
//         contentType: productImage.type,
//         type: "PRODUCT_IMAGE",
//       });

//       const uploadRes = await fetch(signedUrl, {
//         method: "PUT",
//         headers: { "Content-Type": productImage.type },
//         body: productImage,
//       });

//       if (!uploadRes.ok) throw new Error("Image upload failed");

//       await confirmFileUpload(fileId, "PRODUCT_IMAGE");
//       setUploadedFile("PRODUCT_IMAGE", fileId);

//       setSuccessMessage("Product added successfully ✅");
//       resetAll();
//     } catch (err) {
//       setErrorMessage(err.message || "Something went wrong");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div>
//       <Navlink />

//       <div className="border border-[#f1d7d7] rounded-[15px] p-[23px] flex flex-col gap-[16px] bg-white mt-2">
//         <p className="font-semibold">Add Product Details</p>

//         {/* PRODUCT NAME */}
//         <input
//           value={form.productName}
//           onChange={(e) =>
//             setForm({ ...form, productName: e.target.value })
//           }
//           placeholder="Product Name"
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         />

//         {/* DESCRIPTION */}
//         <textarea
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           placeholder="Description"
//           className="w-[328px] h-[120px] border rounded-[15px] px-[32px] pt-2"
//         />

//         {/* PURCHASE RATE */}
//         <input
//           type="number"
//           value={form.purchaseRate}
//           onChange={(e) =>
//             setForm({ ...form, purchaseRate: e.target.value })
//           }
//           placeholder="Purchase Rate"
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         />

//         {/* QUANTITY */}
//         <input
//           type="number"
//           value={form.quantity}
//           onChange={(e) =>
//             setForm({ ...form, quantity: e.target.value })
//           }
//           placeholder="Quantity"
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         />

//         {/* MRP */}
//         <input
//           type="number"
//           value={form.mrpPrice}
//           onChange={(e) =>
//             setForm({ ...form, mrpPrice: e.target.value })
//           }
//           placeholder="MRP Price"
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         />

//         {/* GST TAX */}
//         <select
//           value={form.gstTax}
//           onChange={(e) =>
//             setForm({ ...form, gstTax: e.target.value })
//           }
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         >
//           <option value="">GST Tax %</option>
//           {[5, 12, 18].map((v) => (
//             <option key={v} value={v}>{v}%</option>
//           ))}
//         </select>

//         {/* DISCOUNT */}
//         <input
//           type="number"
//           value={form.discountPercent}
//           onChange={(e) =>
//             setForm({ ...form, discountPercent: e.target.value })
//           }
//           placeholder="Discount %"
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         />

//         {/* HSN CODE */}
//         <input
//           type="number"
//           value={form.hsnCode}
//           onChange={(e) =>
//             setForm({ ...form, hsnCode: e.target.value })
//           }
//           placeholder="HSN Code"
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         />

//         {/* REFERRAL COMMISSION */}
//         <input
//           type="number"
//           value={form.referralCommissionAmount}
//           onChange={(e) =>
//             setForm({ ...form, referralCommissionAmount: e.target.value })
//           }
//           placeholder="Referral Commission Amount"
//           className="w-[328px] h-[40px] border rounded-[15px] px-[32px]"
//         />

//         {/* IMAGE */}
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           onChange={(e) => setProductImage(e.target.files[0])}
//           disabled={uploading}
//           className="w-[328px] h-[40px] border rounded-[15px] px-[16px]"
//         />

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

//         <button
//           onClick={handleSubmit}
//           disabled={loading || uploading}
//           className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] mt-4"
//         >
//           {loading || uploading ? "Saving..." : "Save"}
//         </button>

//         {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//         {successMessage && (
//           <p className="text-green-600 text-sm">{successMessage}</p>
//         )}
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
    purchaseRate: "",
    quantity: "",
    mrpPrice: "",
    gstTax: "",
    discountPercent: "",
    discountedPrice: "",
    hsnCode: "",
    referralCommissionAmount: "",
  });

  const [healthStatusIds, setHealthStatusIds] = useState([]);
  const [diagnosisIds, setDiagnosisIds] = useState([]);
  const [productImage, setProductImage] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchServices(1, 100);
    fetchDiagnosesList(1, 100);
  }, [fetchServices, fetchDiagnosesList]);

  /* ---------------- AUTO CALCULATE DISCOUNTED PRICE ---------------- */

  useEffect(() => {
    const mrp = Number(form.mrpPrice);
    const discount = Number(form.discountPercent);

    if (mrp > 0 && discount >= 0) {
      const discounted = mrp - (mrp * discount) / 100;
      setForm((prev) => ({
        ...prev,
        discountedPrice: discounted.toFixed(2),
      }));
    } else {
      setForm((prev) => ({ ...prev, discountedPrice: "" }));
    }
  }, [form.mrpPrice, form.discountPercent]);

  /* ---------------- HELPERS ---------------- */

  const toggleArray = (id, array, setter) => {
    setter(array.includes(id) ? array.filter((x) => x !== id) : [...array, id]);
  };

  const validate = () => {
    if (!form.productName.trim()) return "Product name is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.purchaseRate) return "Purchase rate is required";
    if (!form.quantity) return "Quantity is required";
    if (!form.mrpPrice) return "MRP price is required";
    if (!form.gstTax) return "GST tax is required";
    if (!form.discountPercent) return "Discount % is required";
    if (!form.hsnCode.trim()) return "HSN code is required";
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
      purchaseRate: "",
      quantity: "",
      mrpPrice: "",
      gstTax: "",
      discountPercent: "",
      discountedPrice: "",
      hsnCode: "",
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
      const res = await addProduct({
        productName: form.productName.trim(),
        description: form.description.trim(),
        purchaseRate: Number(form.purchaseRate),
        quantity: Number(form.quantity),
        mrpPrice: Number(form.mrpPrice),
        gstTaxPercent: Number(form.gstTax),
        discountPercent: Number(form.discountPercent),
        discountedPrice: Number(form.discountedPrice),
        hsnCode: form.hsnCode.trim(),
        referralCommissionAmount: Number(form.referralCommissionAmount),
        healthStatusIds,
        diagnosisIds,
      });

      const productId = res.id;
      if (!productId) throw new Error("Product ID not returned");

      setUploading(true);

      const { signedUrl, fileId } = await generateUploadUrl({
        productId,
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

  const inputClass =
    "w-full h-[42px] border border-gray-400 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#3674B5]";
  const textareaClass =
    "w-full h-[120px] border border-gray-400 rounded-xl px-4 pt-2 outline-none focus:ring-2 focus:ring-[#3674B5]";

  return (
    <div>
      <Navlink />

       <div className="border border-[#f1d7d7] rounded-[15px] p-[23px] flex flex-col gap-[16px] bg-white mt-2">
      <div className="max-w-[420px] p-4  space-y-4">
        <h2 className="font-semibold text-lg">Add Product Details</h2>

        <input
          className={inputClass}
          placeholder="Product Name"
          value={form.productName}
          onChange={(e) =>
            setForm({ ...form, productName: e.target.value })
          }
        />

        <textarea
          className={textareaClass}
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          className={inputClass}
          placeholder="Purchase Rate"
          value={form.purchaseRate}
          onChange={(e) =>
            setForm({ ...form, purchaseRate: e.target.value })
          }
        />

        <input
          type="number"
          className={inputClass}
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <input
          type="number"
          className={inputClass}
          placeholder="MRP Price"
          value={form.mrpPrice}
          onChange={(e) =>
            setForm({ ...form, mrpPrice: e.target.value })
          }
        />

        <select
          className={inputClass}
          value={form.gstTax}
          onChange={(e) =>
            setForm({ ...form, gstTax: e.target.value })
          }
        >
          <option value="">GST Tax %</option>
          {[5, 12, 18].map((v) => (
            <option key={v} value={v}>
              {v}%
            </option>
          ))}
        </select>

        <input
          type="number"
          className={inputClass}
          placeholder="Discount %"
          value={form.discountPercent}
          onChange={(e) =>
            setForm({ ...form, discountPercent: e.target.value })
          }
        />

        <input
          className={`${inputClass} bg-gray-100 cursor-not-allowed`}
          placeholder="Discounted Price"
          value={form.discountedPrice}
          readOnly
        />

        <input
          type="text"
          className={inputClass}
          placeholder="HSN Code"
          value={form.hsnCode}
          onChange={(e) =>
            setForm({ ...form, hsnCode: e.target.value })
          }
        />

        <input
          type="number"
          className={inputClass}
          placeholder="Referral Commission Amount"
          value={form.referralCommissionAmount}
          onChange={(e) =>
            setForm({ ...form, referralCommissionAmount: e.target.value })
          }
        />

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className={inputClass}
          onChange={(e) => setProductImage(e.target.files[0])}
        />

        <div>
          <p className="font-semibold mb-2">Patient Health Status</p>
          <div className="grid grid-cols-2 gap-2">
            {healthStatuses.map((item) => (
              <label key={item.id} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={healthStatusIds.includes(item.id)}
                  onChange={() =>
                    toggleArray(
                      item.id,
                      healthStatusIds,
                      setHealthStatusIds
                    )
                  }
                />
                {item.status}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Diagnosis</p>
          <div className="grid grid-cols-2 gap-2">
            {listedDiagnoses.map((item) => (
              <label key={item.id} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={diagnosisIds.includes(item.id)}
                  onChange={() =>
                    toggleArray(
                      item.id,
                      diagnosisIds,
                      setDiagnosisIds
                    )
                  }
                />
                {item.diagnosis}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || uploading}
          className="w-full h-[42px] bg-[#3674B5] text-white rounded-xl font-medium"
        >
          {loading || uploading ? "Saving..." : "Save Product"}
        </button>

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-blue-600 text-sm">{successMessage}</p>
        )}
      </div>
      </div>
    </div>
  );
}
