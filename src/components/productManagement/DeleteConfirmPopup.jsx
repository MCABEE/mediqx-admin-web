// "use client";

// export default function DeleteConfirmPopup({
//   title = "Delete Product",
//   message = "Are you sure you want to delete this product?",
//   onCancel,
//   onConfirm,
//   loading,
// }) {
//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
//       <div className="bg-white w-[360px] rounded-[15px] p-6">
//         <h2 className="text-lg font-semibold text-black">{title}</h2>
//         <p className="text-sm text-gray-600 mt-2">{message}</p>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded-[10px] border"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             className="px-4 py-2 rounded-[10px] bg-red-600 text-white"
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













"use client";

export default function DeleteConfirmPopup({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-[15px] p-6 w-[320px]">
        <p className="text-black font-semibold text-lg">
          Delete Product?
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Are you sure you want to delete this product?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
