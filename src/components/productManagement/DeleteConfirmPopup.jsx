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
