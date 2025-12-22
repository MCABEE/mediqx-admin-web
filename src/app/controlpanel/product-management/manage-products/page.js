// import Navlink from "@/components/productManagement/Navlink";
// import React from "react";

// function page() {
//   return (
//     <div>
//       <Navlink />
//      <div className="w-full h-full py-4 bg-white mt-4 border border-[#f4eded] rounded-[15px]">
//         <p className="text-[20px] text-black font-semibold pt-[19px] px-[24px]">
//           Glucometer
//         </p>
//         <div className="px-[24px] pt-[18px] flex gap-[11px]">
//           <img src="/glucometer.svg" alt="" className="size-[120px] rounded-[8px]" />
//           <div>
//             <p className="text-[14px] text-[#333333] pe-[120px]">
//               Glucometers help you understand which foods or activities are
//               responsible for the increase or decrease in the levels of your
//               blood sugar. They help you monitor sugar levels, and assist you in
//               controlling your diabetes from reachin
//             </p>
//             <p className="text-[14px] text-black pt-[14px] ">
//               Quantity/Unit: 01
//             </p>
//             <div className="flex gap-[53px] pt-[14px] text-black text-[14px]">
//               <p>Price: 600.00 </p>
//               <p className="text-[#008F27]">Discounted Price: 550.00</p>
//             </div>
//           </div>
//         </div>
//         <div className="px-[23px] py-4">
//           <p className="text-[14px] text-black font-semibold">
//             Patient Health Status
//           </p>
//           <div className="flex gap-[31px] text-black text-[16px]">
//             <p>Walkable with Support</p>

//             <p>Sepsis</p>
//             <p>Hospice care</p>
//           </div>
//           <p className="text-[14px] text-black font-semibold pt-[13px]">
//             Diagnosis
//           </p>
//           <div className="flex gap-[31px] text-black text-[16px]">
//             <p>Advanced Dementia</p>

//             <p>Sepsis</p>
//             <p>Hospice care</p>
//           </div>
//         </div>
//         <div className="flex gap-1.5 justify-end pe-4">
//           <button className="w-[96px] h-[40px] border  bg-[#3674B5] rounded-[15px] text-white">
//             Edit
//           </button>
//           <button className="w-[96px] h-[40px] border  bg-[#FF0000] rounded-[15px] text-white">
//             Delete
//           </button>
//         </div>
//       </div>
//       <div className="w-full h-full py-4 bg-white mt-4 border border-[#f4eded] rounded-[15px]">
//         <p className="text-[20px] text-black font-semibold pt-[19px] px-[24px]">
//           Glucometer
//         </p>
//         <div className="px-[24px] pt-[18px] flex gap-[11px]">
//           <img src="/glucometer.svg" alt="" className="size-[120px] rounded-[8px]" />
//           <div>
//             <p className="text-[14px] text-[#333333] pe-[120px]">
//               Glucometers help you understand which foods or activities are
//               responsible for the increase or decrease in the levels of your
//               blood sugar. They help you monitor sugar levels, and assist you in
//               controlling your diabetes from reachin
//             </p>
//             <p className="text-[14px] text-black pt-[14px] ">
//               Quantity/Unit: 01
//             </p>
//             <div className="flex gap-[53px] pt-[14px] text-black text-[14px]">
//               <p>Price: 600.00 </p>
//               <p className="text-[#008F27]">Discounted Price: 550.00</p>
//             </div>
//           </div>
//         </div>
//         <div className="px-[23px] py-4">
//           <p className="text-[14px] text-black font-semibold">
//             Patient Health Status
//           </p>
//           <div className="flex gap-[31px] text-black text-[16px]">
//             <p>Walkable with Support</p>

//             <p>Sepsis</p>
//             <p>Hospice care</p>
//           </div>
//           <p className="text-[14px] text-black font-semibold pt-[13px]">
//             Diagnosis
//           </p>
//           <div className="flex gap-[31px] text-black text-[16px]">
//             <p>Advanced Dementia</p>

//             <p>Sepsis</p>
//             <p>Hospice care</p>
//           </div>
//         </div>
//         <div className="flex gap-1.5 justify-end pe-4">
//           <button className="w-[96px] h-[40px] border  bg-[#3674B5] rounded-[15px] text-white">
//             Edit
//           </button>
//           <button className="w-[96px] h-[40px] border  bg-[#FF0000] rounded-[15px] text-white">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;









// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useEffect, useState } from "react";
// import useProductStore from "@/app/lib/store/useProductStore";
// import DeleteConfirmPopup from "@/components/productManagement/DeleteConfirmPopup";


// function Page() {
// const {
//   products,
//   fetchProducts,
//   deleteProduct,
//   loading,
//   page,
//   totalPages,
// } = useProductStore();

// const [deleteId, setDeleteId] = useState(null);

// useEffect(() => {
//   fetchProducts(1);
// }, [fetchProducts]);

//   return (
//     <div>
//       <Navlink />

//       {loading && (
//         <p className="text-center text-gray-500 mt-4">
//           Loading products...
//         </p>
//       )}

//       {!loading &&
//         products.map((product) => (
//           <div
//             key={product.id}
//             className="w-full h-full py-4 bg-white mt-4 border border-[#f4eded] rounded-[15px]"
//           >
//             <p className="text-[20px] text-black font-semibold pt-[19px] px-[24px]">
//               {product.productName}
//             </p>

//             <div className="px-[24px] pt-[18px] flex gap-[11px]">
//               <img
//                 src={product.imageUrl || "/glucometer.svg"}
//                 alt=""
//                 className="size-[120px] rounded-[8px]"
//               />

//               <div>
//                 <p className="text-[14px] text-[#333333] pe-[120px]">
//                   {product.description}
//                 </p>

//                 <p className="text-[14px] text-black pt-[14px]">
//                   Quantity/Unit: {product.quantity}
//                 </p>

//                 <div className="flex gap-[53px] pt-[14px] text-black text-[14px]">
//                   <p>Price: {product.mrpPrice}</p>
//                   <p className="text-[#008F27]">
//                     Discounted Price: {product.discountedPrice}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="px-[23px] py-4">
//               <p className="text-[14px] text-black font-semibold">
//                 Patient Health Status
//               </p>
//               <div className="flex gap-[31px] text-black text-[16px] flex-wrap">
//                 {product.healthStatuses?.map((h) => (
//                   <p key={h.id}>{h.status}</p>
//                 ))}
//               </div>

//               <p className="text-[14px] text-black font-semibold pt-[13px]">
//                 Diagnosis
//               </p>
//               <div className="flex gap-[31px] text-black text-[16px] flex-wrap">
//                 {product.diagnoses?.map((d) => (
//                   <p key={d.id}>{d.diagnosis}</p>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-1.5 justify-end pe-4">
//               <button className="w-[96px] h-[40px] bg-[#3674B5] rounded-[15px] text-white">
//                 Edit
//               </button>
//              <button
//   onClick={() => setDeleteId(product.id)}
//   className="w-[96px] h-[40px] bg-[#FF0000] rounded-[15px] text-white"
// >
//   Delete
// </button>

//             </div>
//           </div>
//         ))}

//       {/* PAGINATION */}
//       <div className="flex justify-center items-center gap-4 my-6">
//         <button
//           disabled={page === 1}
//           onClick={() => fetchProducts(page - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span className="text-black">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => fetchProducts(page + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>



//       {deleteId && (
//   <DeleteConfirmPopup
//     loading={loading}
//     onCancel={() => setDeleteId(null)}
//     onConfirm={async () => {
//       try {
//         await deleteProduct(deleteId);
//         setDeleteId(null);
//       } catch (err) {
//         alert(err.message);
//       }
//     }}
//   />
// )}

//     </div>
//   );
// }

// export default Page;







// "use client";

// import Navlink from "@/components/productManagement/Navlink";
// import React, { useEffect, useState } from "react";
// import useProductStore from "@/app/lib/store/useProductStore";
// import DeleteConfirmPopup from "@/components/productManagement/DeleteConfirmPopup";

// function Page() {
//   const {
//     products,
//     fetchProducts,
//     deleteProduct,
//     loading,
//     page,
//     totalPages,
//   } = useProductStore();

//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     fetchProducts(1);
//   }, [fetchProducts]);

//   return (
//     <div>
//       <Navlink />

//       {loading && (
//         <p className="text-center text-gray-500 mt-4">
//           Loading products...
//         </p>
//       )}

//       {!loading &&
//         products.map((item) => {
//           const product = item.product;
//           const image =
//             item.productImages?.find(
//               (img) => img.status === "COMPLETE"
//             )?.fileUrl || "/glucometer.svg";

//           return (
//             <div
//               key={product.id}
//               className="w-full py-4 bg-white mt-4 border border-[#f4eded] rounded-[15px]"
//             >
//               {/* TITLE */}
//               <p className="text-[20px] text-black font-semibold pt-[19px] px-[24px]">
//                 {product.productName}
//               </p>

//               {/* IMAGE + DESCRIPTION */}
//               <div className="px-[24px] pt-[18px] flex gap-[11px]">
//                 <img
//                   src={image}
//                   alt={product.productName}
//                   className="size-[120px] rounded-[8px] object-cover"
//                 />

//                 <div>
//                   <p className="text-[14px] text-[#333333] pe-[120px]">
//                     {product.description}
//                   </p>

//                   <p className="text-[14px] text-black pt-[14px]">
//                     Quantity/Unit: {product.quantity}
//                   </p>

//                   <div className="flex gap-[53px] pt-[14px] text-black text-[14px]">
//                     <p>Price: {product.mrpPrice}</p>
//                     <p className="text-[#008F27]">
//                       Discounted Price: {product.discountedPrice}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* HEALTH STATUS */}
//               <div className="px-[23px] py-4">
//                 <p className="text-[14px] text-black font-semibold">
//                   Patient Health Status
//                 </p>
//                 <div className="flex gap-[20px] text-black text-[16px] flex-wrap">
//                   {item.healthStatuses.map((h) => (
//                     <span key={h.id}>{h.status}</span>
//                   ))}
//                 </div>

//                 {/* DIAGNOSIS */}
//                 <p className="text-[14px] text-black font-semibold pt-[13px]">
//                   Diagnosis
//                 </p>
//                 <div className="flex gap-[20px] text-black text-[16px] flex-wrap">
//                   {item.diagnoses.map((d) => (
//                     <span key={d.id}>{d.diagnosis}</span>
//                   ))}
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex gap-2 justify-end pe-4">
//                 <button className="w-[96px] h-[40px] bg-[#3674B5] rounded-[15px] text-white">
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => setDeleteId(product.id)}
//                   className="w-[96px] h-[40px] bg-[#FF0000] rounded-[15px] text-white"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}

//       {/* PAGINATION */}
//       <div className="flex justify-center items-center gap-4 my-6">
//         <button
//           disabled={page === 1}
//           onClick={() => fetchProducts(page - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span className="text-black">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => fetchProducts(page + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* DELETE CONFIRM POPUP */}
//      {deleteId && (
//   <DeleteConfirmPopup
//     loading={loading}
//     onCancel={() => setDeleteId(null)}
//     onConfirm={async () => {
//       try {
//         await deleteProduct(deleteId);
//         setDeleteId(null);        // close popup
//         fetchProducts(page);     // refresh list
//       } catch (err) {
//         alert(err.message);
//       }
//     }}
//   />
// )}

//     </div>
//   );
// }

// export default Page;






"use client";

import Navlink from "@/components/productManagement/Navlink";
import React, { useEffect, useState } from "react";
import useProductStore from "@/app/lib/store/useProductStore";
import DeleteConfirmPopup from "@/components/productManagement/DeleteConfirmPopup";

export default function Page() {
  const {
    products,
    fetchProducts,
    deleteProduct,
    loading,
    page,
    totalPages,
  } = useProductStore();

  const [deleteId, setDeleteId] = useState(null);
console.log(products);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  /* ✅ DELETE HANDLER */
  // const handleDelete = async () => {
  //   const id = deleteId;

  //   // ✅ CLOSE POPUP FIRST
  //   setDeleteId(null);

  //   try {
  //     await deleteProduct(id);
  //     fetchProducts();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  const handleDelete = async () => {
  const id = deleteId;

  setDeleteId(null); // close popup

  try {
    await deleteProduct(id); // store refreshes automatically
  } catch (err) {
    alert(err.message);
  }
};
  return (
    <div>
      <Navlink />

      {loading && (
        <p className="text-center text-gray-500 mt-4">
          Loading products...
        </p>
      )}

      {!loading &&
        products.map((item) => {
          const product = item.product;
          const image =
            item.productImages?.find(
              (img) => img.status === "COMPLETE"
            )?.fileUrl || "/glucometer.svg";

          return (
            <div
              key={product.id}
              className="w-full py-4 bg-white mt-4 border border-[#f4eded] rounded-[15px]"
            >
              <p className="text-[20px] font-semibold px-[24px] pt-[19px]">
                {product.productName}
              </p>

              <div className="px-[24px] pt-[18px] flex gap-[11px]">
                <img
                  src={image}
                  className="size-[120px] rounded-[8px] object-cover"
                />

                <div>
                  <p className="text-[14px] text-[#333333]">
                    {product.description}
                  </p>

                  <p className="text-[14px] pt-[14px]">
                    Quantity/Unit: {product.quantity}
                  </p>

                  <div className="flex gap-[40px] pt-[14px] text-[14px]">
                    <p>Price: {product.mrpPrice}</p>
                    <p className="text-[#008F27]">
                      Discounted Price: {product.discountedPrice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-[23px] py-4">
                <p className="font-semibold text-[14px]">
                  Patient Health Status
                </p>
                <div className="flex gap-3 flex-wrap">
                  {item.healthStatuses.map((h) => (
                    <span key={h.id}>{h.status}</span>
                  ))}
                </div>

                <p className="font-semibold text-[14px] pt-3">
                  Diagnosis
                </p>
                <div className="flex gap-3 flex-wrap">
                  {item.diagnoses.map((d) => (
                    <span key={d.id}>{d.diagnosis}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pe-4">
                <button className="w-[96px] h-[40px] bg-[#3674B5] text-white rounded-[15px]">
                  Edit
                </button>

                <button
                  onClick={() => setDeleteId(product.id)}
                  className="w-[96px] h-[40px] bg-[#FF0000] text-white rounded-[15px]"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 my-6">
        <button
          disabled={page === 1}
          onClick={() => fetchProducts(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchProducts(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* DELETE POPUP */}
      {deleteId && (
        <DeleteConfirmPopup
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
