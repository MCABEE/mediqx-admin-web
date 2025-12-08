import React from 'react'

function UserAccessTable() {
  return (
    <div>
      <div className='bg-[#C0D8F6] font-semibold rounded-[15px] mt-2 px-8 py-2'>
        All Co-Admin
      </div>
         {/* Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full border-spacing-y-2 border-separate text-black">
          <thead className="bg-[#C0D8F6]">
            <tr>
              <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">
                No
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Name
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Email ID
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Role
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                Manage
              </th>
            </tr>

         
          </thead>
          <tbody>
             <tr
              className="bg-white cursor-pointer hover:bg-gray-100"
            >
              <td className="p-2">1</td>
              <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
                Sevv
              </td>
              <td className="border-l-4 border-[#C0D8F6] p-2">kejkhg@gmail,.ke</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">Hr Managerere</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">{">"}</td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}

        <div className="flex justify-between my-4 gap-4">
          <button className="px-4 py-1 rounded bg-[#5f9de9] text-white disabled:opacity-50">
            Prev
          </button>
          <span className="text-sm font-medium self-center">Page 3 of 9</span>
          <button className="px-4 py-1 rounded bg-[#5f9de9] text-white disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserAccessTable