"use client";

import React, { useEffect } from "react";
import usePatientBillsStore from "@/app/lib/store/patientBillingStore";

export default function PatientProductsTable({ patientId }) {
  const {
    products,
    productsLoading,
    fetchProducts,
  } = usePatientBillsStore();

  /* 🔹 Call API inside component */
  useEffect(() => {
    
      fetchProducts(patientId);
    
  }, [patientId]);

  return (
    <>
      {/* Header */}
      <div className="bg-white rounded-[15px]  w-full flex items-center mt-8">
        <h1 className="bg-[#3674B5] text-white px-8 py-4 rounded-l-[15px]">
          Products
        </h1>
      </div>

      {/* Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
       


         <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Product Name
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              MRP
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Discount
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Net Pay
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
             Status
            </th>
          </tr>
        </thead>

        <tbody>
          {productsLoading && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Loading products...
              </td>
            </tr>
          )}

          {!productsLoading && products.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No products found
              </td>
            </tr>
          )}

          {!productsLoading &&
            products.map((item, index) => (
              <tr
                key={item.productCartId}
                className="bg-white hover:bg-[#E8F1FD] "
              >
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">{item.productName}</td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">₹{item.mrpPrice}</td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                  ₹{item.discountValue}
                </td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">₹{item.discountedPrice}</td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">{item.salesStatus}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}