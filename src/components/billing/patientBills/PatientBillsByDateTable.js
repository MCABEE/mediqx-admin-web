
"use client";

import Link from "next/link";
import { useEffect } from "react";
import usePatientBillsStore from "@/app/lib/store/patientBillingStore";
import { useRouter } from "next/navigation";

export default function PatientBillsByDateTable() {
  const {
    bills,
    page,
    totalPages,
    loading,
    year,
    month,
    setYear,
    setMonth,
    fetchBillsByService,
    summary,
  } = usePatientBillsStore();
  console.log(summary);
const router = useRouter();
  const years = [2023, 2024, 2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /* Fetch data when year/month/page changes */
  useEffect(() => {
    fetchBillsByService(1);
  }, [year, month]);

  return (
    <div>
      {/* FILTER SECTION */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-black text-[16px] font-semibold">
          {year}, {month}
        </h1>
      </div>

      {/* TABLE */}
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

        {/* <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Loading...
              </td>
            </tr>
          )}

          {!loading && bills.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No records found
              </td>
            </tr>
          )}

          {!loading &&
            bills.map((item) => (
              <tr
                key={item.serviceTypeId}
                className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
              >
                <td className="p-2 text-center">
                  <Link
                    href={`/controlpanel/billing/patient-bills/patient-bill-detailView/${item.serviceTypeId}`}
                    className="block w-full h-full text-blue-600 hover:underline"
                  >
                    {item.patientName}
                  </Link>
                </td>
                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  {item.serviceTypeName}
                </td>
                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  {item.payment}
                </td>
                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  {item.discount}
                </td>
                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  {item.netPay}
                </td>
              </tr>
            ))}
        </tbody> */}
        
<tbody>
  {loading && (
    <tr>
      <td colSpan={5} className="text-center p-4">
        Loading...
      </td>
    </tr>
  )}

  {!loading && bills.length === 0 && (
    <tr>
      <td colSpan={5} className="text-center p-4">
        No records found
      </td>
    </tr>
  )}

  {!loading &&
    bills.map((item) => (
      <tr
        key={item.serviceId}
        onClick={() =>
          router.push(
            `/controlpanel/billing/patient-bills/patient-bill-detailView/${item.serviceId}`
          )
        }
        className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
      >
        <td className="p-2 text-center  font-medium">
          {item.patientName}
        </td>
        <td className="border-l-4 text-center border-[#C0D8F6] p-2">
          {item.serviceTypeName}
        </td>
        <td className="border-l-4 text-center border-[#C0D8F6] p-2">
          {item.payment}
        </td>
        <td className="border-l-4 text-center border-[#C0D8F6] p-2">
          {item.discount}
        </td>
        <td className="border-l-4 text-center border-[#C0D8F6] p-2">
          {item.netPay}
        </td>
      </tr>
    ))}
</tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between my-4 gap-4">
        <button
          disabled={page === 1}
          onClick={() => fetchBills(page - 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-black font-semibold text-lg">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchBills(page + 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
        <span>Total Services</span>
        <span>{summary?.totalServices}</span>
      </div>
      <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
        <span>Total Payment</span>
        <span>{summary?.totalPayment}</span>
      </div>
      <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
        <span>Total Discount</span>
        <span>{summary?.totalDiscount}</span>
      </div>
      <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
        <span>Total Net Pay</span>
        <span>{summary?.totalNetPay}</span>
      </div>
    </div>
  );
}