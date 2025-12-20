"use client";

import { useRouter } from "next/navigation";

function page() {
  const supervisors = [
    {
      id: 1,
      staffName: "Anita Joseph",
      rating: "4.5 ",
      date: "12 Aug 2025",
      patientName: "Ramesh Kumar",
    },
    {
      id: 2,
      staffName: "Rahul Menon",
      rating: "4.2",
      date: "10 Aug 2025",
      patientName: "Suma Devi",
    },
    {
      id: 3,
      staffName: "Sneha Kumar",
      rating: "4.8 ",
      date: "08 Aug 2025",
      patientName: "Arjun Nair",
    },
  ];

  const page = 1;
  const totalPages = 3;
  const router = useRouter();

const handleRowClick = (id) => {
  router.push(`/controlpanel/rating-and-review/rating-and-review-reply/${id}`); 
};

  return (
    <>
      <div className="overflow-x-auto mt-2">
        <div className="w-full bg-[#C0D8F6] py-2.5 px-[23px] rounded-t-[15px] flex items-center">
          <p className="text-[16px] font-semibold text-black ">
            Rating and Reviews
          </p>
        </div>
        <table className="w-full border-spacing-y-2 border-separate text-black">
          <thead className="bg-white border border-[#888888]">
            <tr>
              <th className="p-2 text-base">No</th>
              <th className="p-2 text-base border-l-4 border-[#C0D8F6] text-left">
                Staff Name
              </th>
              <th className="p-2 text-base border-l-4 border-[#C0D8F6] text-left">
                Rating
              </th>
              <th className="p-2 text-base border-l-4 border-[#C0D8F6] text-left">
                Date
              </th>
              <th className="p-2 text-base border-l-4 border-[#C0D8F6] text-left">
                Patient Name
              </th>
            </tr>
          </thead>

          <tbody>
            {supervisors.map((item, index) => (
              <tr
                key={item.id}
                 onClick={() => handleRowClick(item.id)}
                className="bg-white hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-2 text-center">{index + 1}</td>

                <td className="p-2 border-l-4 border-[#C0D8F6]">
                  {item.staffName}
                </td>

                <td className="p-2 border-l-4 border-[#C0D8F6]">
                  {item.rating}★
                </td>

                <td className="p-2 border-l-4 border-[#C0D8F6]">{item.date}</td>

                <td className="p-2 border-l-4 border-[#C0D8F6]">
                  {item.patientName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (UI only) */}
        <div className="flex justify-between my-4 px-4">
          <button className="px-4 py-1 rounded bg-[#5f9de9] text-white opacity-50 cursor-not-allowed">
            Prev
          </button>

          <span className="text-sm font-medium self-center">
            Page {page} of {totalPages}
          </span>

          <button className="px-4 py-1 rounded bg-[#5f9de9] text-white">
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default page;