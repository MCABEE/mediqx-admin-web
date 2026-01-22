"use client";

import Navlink from "@/components/productManagement/Navlink";
import React, { useEffect, useState } from "react";
import useProductStore from "@/app/lib/store/useProductStore";
import DeleteConfirmPopup from "@/components/productManagement/DeleteConfirmPopup";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import EditProductPopup from "@/components/productManagement/EditProductPopup";

export default function Page() {
  const {
    products,
    fetchProducts,
    deleteProduct,
    updateProduct,
    loading,
    editingId,
    page,
    totalPages,
  } = useProductStore();

  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts(1, search);
  }, []);

  /* ---------- DELETE ---------- */
  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      fetchProducts(page, search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navlink />

      {/* SEARCH */}
      <div className="w-full border border-[#8888888c] h-[48px] bg-white mt-2 rounded-[15px] flex items-center px-6">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            fetchProducts(1, value);
          }}
          className="w-full h-full bg-transparent outline-none"
        />
      </div>

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
              <div className="flex justify-between items-center">
                <p className="text-[20px] font-semibold px-[24px] pt-[19px]">
                  {product.productName}
                </p>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2 pe-4">

                     <button
                  onClick={() => setEditItem(item)}
                  className="text-xl text-[#3674B5] rounded-[15px]  hover:scale-110 cursor-pointer"
                >
                  <MdModeEditOutline/>
                </button>
                  <button
                    onClick={() => setDeleteId(product.id)}
                    className="text-xl text-[#ff0000a9] rounded-[15px] hover:scale-110 cursor-pointer"
                  >
                    <MdDelete />
                  </button>

                  
               
                </div>
              </div>

              <div className="px-[24px] pt-[18px] flex gap-[11px]">
                <img
                  src={image}
                  className="size-[120px] rounded-[8px] object-cover"
                  alt="product"
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

              {/* HEALTH STATUS */}
              <div className="px-[23px] py-4">
                <p className="font-semibold text-[14px]">
                  Patient Health Status
                </p>
                <div className="flex gap-3 flex-wrap">
                  {item.healthStatuses.map((h) => (
                    <span
                      key={h.id}
                      className="px-2 py-1 bg-[#F0F4F9] rounded"
                    >
                      {h.status}
                    </span>
                  ))}
                </div>

                <p className="font-semibold text-[14px] pt-3">
                  Diagnosis
                </p>
                <div className="flex gap-3 flex-wrap">
                  {item.diagnoses.map((d) => (
                    <span
                      key={d.id}
                      className="px-2 py-1 bg-[#F0F4F9] rounded"
                    >
                      {d.diagnosis}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

      {/* PAGINATION */}
      <div className="flex justify-between items-center gap-4 my-6">
        <button
          disabled={page === 1}
          onClick={() => fetchProducts(page - 1, search)}
          className="px-4 py-2 border bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchProducts(page + 1, search)}
          className="px-4 py-2 border bg-blue-500 text-white rounded disabled:opacity-50"
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

      {/* EDIT POPUP */}
      {editItem && (
        // <EditProductPopup
        //   product={editItem.product}
        //   loading={editingId === editItem.product.id}
        //   onCancel={() => setEditItem(null)}
        //   onSave={async (payload) => {
        //     await updateProduct(editItem.product.id, {
        //       ...payload,
        //       healthStatusIds: editItem.healthStatuses.map((h) => h.id),
        //       diagnosisIds: editItem.diagnoses.map((d) => d.id),
        //     });
        //     setEditItem(null);
        //   }}
        // />

//         <EditProductPopup
//   product={editItem.product}
//   loading={editingId === editItem.product.id}

//   selectedHealthStatusIds={editItem.healthStatuses.map(h => h.id)}
//   selectedDiagnosisIds={editItem.diagnoses.map(d => d.id)}

//   onCancel={() => setEditItem(null)}
//   onSave={async (payload) => {
//     await updateProduct(editItem.product.id, {
//       ...payload,
//       healthStatusIds: payload.healthStatusIds,
//       diagnosisIds: payload.diagnosisIds,
//     });
//     setEditItem(null);
//   }}
// />

<EditProductPopup
  product={editItem.product}
  loading={editingId === editItem.product.id}

  selectedHealthStatusIds={editItem.healthStatuses.map(h => h.id)}
  selectedDiagnosisIds={editItem.diagnoses.map(d => d.id)}

  onCancel={() => setEditItem(null)}
  onSave={async (payload) => {
    await updateProduct(editItem.product.id, {
      ...payload,
      healthStatusIds: payload.healthStatusIds,
      diagnosisIds: payload.diagnosisIds,
    });

    // ✅ REFRESH LIST WITH CURRENT PAGE
    await fetchProducts(page, search);

    // ✅ CLOSE POPUP
    setEditItem(null);
  }}
/>


      )}
    </div>
  );
}
