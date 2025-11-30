import Link from 'next/link'
import React from 'react'

function PatientBillsByDateTable() {
  return (
      <div>
      {/* Filter Section */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
            <option>Year</option>
          </select>
          <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
            <option>Month</option>
          </select>
        </div>
        <h1 className="text-black text-[16px] font-semibold">2025, November</h1>
      </div>

      {/* Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">Patient Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Services
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Payment
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Discount
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Net Pay
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Example Row */}
          <tr className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition">
            <td className="p-2 text-center">
              <Link
                href="/controlpanel/billing/staff-payment-details"
                className="block w-full h-full"
              >
                George Thomas
              </Link>
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">24</td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              35500.00
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              3500.00
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              32000.00
            </td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between my-4 gap-4">
        <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="text-black font-semibold text-lg">2 / 3</span>
        <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>

    </div>
  )
}

export default PatientBillsByDateTable