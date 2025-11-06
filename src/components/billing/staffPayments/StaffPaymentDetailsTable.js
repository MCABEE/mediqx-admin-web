import React from 'react'

function StaffPaymentDetailsTable() {
  return (
    <div>
         {/* Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">Date</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Assigned Duty
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Starting
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Ending
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">TDS</th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Net Pay
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Example Row */}
          <tr className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition">
            <td className="p-2 text-center">
              
                01,sunday
             
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">24 Hrs</td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">07.00 AM</td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              08.10 PM
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              3500.00
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              32000.00
            </td>
          </tr>
          <tr className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition">
            <td className="p-2 text-center">
              
                01,sunday
             
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">24 Hrs</td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">07.00 AM</td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              08.10 PM
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

      {/* Totals */}
      <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md">
        <h1>Total Payment</h1>
        <h2 className="me-10">32000.00</h2>
      </div>
      <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
        <h1>Total TDS</h1>
        <h2 className="me-10">3200.00</h2>
      </div>
      <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
        <h1>Total Net Pay</h1>
        <h2 className="me-10">28800.00</h2>
      </div>

    </div>
  )
}

export default StaffPaymentDetailsTable