"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";
import usePatientBillsStore from "@/app/lib/store/patientBillingStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Page() {
  const router = useRouter();
  const { id: serviceId } = useParams();

  const { details, fetchDetails, loading } = usePatientBillsStore();

  useEffect(() => {
    if (serviceId) {
      fetchDetails(serviceId);
    }
  }, [serviceId]);

  if (loading || !details) {
    return <div className="p-6 text-black">Loading...</div>;
  }

  const {
    patient,
    serviceTypeName,
    diagnosis,
    schedule,
    duration,
    startDate,
    endDate,
    payment,
    discount,
    netPayment,
    advancePay,
    sanctionedBy,
    assignedStaff,
    supervisor,
    status,
  } = details;

  /* =====================================================
     RUPEE FORMATTER
  ===================================================== */
  const formatRupee = (amount) => {
    if (amount === null || amount === undefined) return "₹0";
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  /* =====================================================
     PDF DOWNLOAD FUNCTION
  ===================================================== */
  const downloadPdf = () => {
    const doc = new jsPDF();

    /* ===== TITLE ===== */
    doc.setFontSize(16);
    doc.text("Patient Service Report", 14, 15);

    /* ===== BASIC INFO ===== */
    doc.setFontSize(11);
    doc.text(`Patient Name: ${patient?.name}`, 14, 25);
    doc.text(`Gender / Age: ${patient?.gender}, ${patient?.age} Yrs`, 14, 32);
    doc.text(`Status: ${status}`, 14, 39);

    /* ===== SERVICE DETAILS TABLE ===== */
    const tableData = [
      ["Diagnosis", diagnosis],
      ["Service Type", serviceTypeName],
      ["Schedule", schedule],
      ["Duration", duration],
      ["Start Date", startDate],
      ["End Date", endDate],
      ["Payment", payment],
      ["Discount", discount],
      ["Net Payment", netPayment],
      ["Advance Pay", advancePay],
      ["Sanctioned By", sanctionedBy],
      ["Assigned Staff", assignedStaff || "Not Assigned"],
      ["Supervisor", supervisor || "-"],
    ];

    autoTable(doc, {
      startY: 46,
      head: [["Field", "Value"]],
      body: tableData,
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [192, 216, 246], // UI blue
        textColor: 0,
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 110 },
      },
    });

    /* ===== SAVE FILE ===== */
    doc.save(`${patient?.name}_service_report.pdf`);
  };

  return (
    <div>
      {/* Back Button */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      {/* Header */}
      <div className="px-[38px] mt-4 flex justify-between">
        <div>
          <h1 className="text-black font-semibold text-[20px]">
            {patient?.name}
          </h1>
          <p className="text-black font-semibold">
            {patient?.gender}, {patient?.age} Yrs
          </p>
        </div>
      </div>

      {/* Service Banner */}
      <div className="flex rounded-[15px] h-[48px] mt-2">
        <div className="bg-[#3674B5] rounded-l-[15px] w-[30%] text-white flex justify-center items-center">
          {status}
        </div>
        <div className="bg-[#C0D8F6] w-[70%] text-black border-l-4 border-[#F0F4F9] rounded-r-[15px] flex items-center ps-6">
          {serviceTypeName}
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border border-[#999999] rounded-[15px] mt-4 mb-6 pb-4">
        <h1 className="text-[16px] font-semibold text-black pb-[18px] px-[39px] border-b border-[#999999] pt-[15px]">
          Service Details
        </h1>

        <div className="flex flex-col text-black gap-[18px] px-[39px] my-4">
          <DetailRow label="Diagnosis" value={diagnosis} />
          <DetailRow label="Service Type" value={serviceTypeName} />
          <DetailRow label="Schedule" value={schedule} />
          <DetailRow label="Duration" value={duration} />
          <DetailRow label="Start Date" value={startDate} />
          <DetailRow label="End Date" value={endDate} />
          <DetailRow label="Payment" value={formatRupee(payment)} />
          <DetailRow label="Discount" value={formatRupee(discount)} />
          <DetailRow label="Sanctioned by" value={sanctionedBy} />
          <DetailRow label="Net Payment" value={formatRupee(netPayment)} />
          <DetailRow label="Advance Pay" value={formatRupee(advancePay)} />
          <DetailRow
            label="Assigned Staff"
            value={assignedStaff || "Not Assigned"}
          />
          <DetailRow label="Supervisor" value={supervisor || "-"} />
        </div>

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={downloadPdf}
          className="w-[240px] h-[48px] rounded-[12px] font-semibold text-black bg-[#FFC8AB] cursor-pointer hover:bg-[#f5c4a9] mt-[16px] ms-[39px]"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   REUSABLE ROW
===================================================== */
function DetailRow({ label, value }) {
  return (
    <div className="flex gap-[18px]">
      <span className="w-[280px] font-medium">{label}</span>
      <span className="flex-1">{value ?? "-"}</span>
    </div>
  );
}
