"use client";
import { useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import useBookingStore from "@/app/lib/store/bookingStore";

export default function Page() {
  const router = useRouter();
  const { id: serviceId } = useParams();
  const searchParams = useSearchParams();

  const booking = {
    diagnosis: searchParams.get("diagnosis"),
    startDate: searchParams.get("startDate"),
    scheduleType: searchParams.get("scheduleType"),
    durationType: searchParams.get("durationType"),
    serviceType: searchParams.get("serviceType"),
    weekdays: searchParams.get("weekdays")
      ? searchParams.get("weekdays").split(", ")
      : [],
    flexibility: searchParams.get("flexibility"),
    startTime: searchParams.get("startTime"),
    endTime: searchParams.get("endTime"),
  };

  const formatTime12h = (timeStr) => {
    if (!timeStr) return "-";
    try {
      const match = timeStr.match(/\d{2}:\d{2}:\d{2}/);
      if (!match) return "-";
      const [hours, minutes] = match[0].split(":");
      const date = new Date();
      date.setHours(Number(hours), Number(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "-";
    }
  };

  const { dutyLogs = {}, fetchDutyLogs, isLoading, error } = useBookingStore();

  useEffect(() => {
    if (serviceId) {
      fetchDutyLogs(serviceId, 1, 10);
    }
  }, [serviceId, fetchDutyLogs]);

  if (isLoading) return <p className="p-4">Loading duty logs...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  const logsArray = Array.isArray(dutyLogs?.dutyLogs) ? dutyLogs.dutyLogs : [];

  const staff = logsArray[0];

  const getFileUrl = (key) =>
    `https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/${key}`;

  const renderFiles = (files, type) => {
    const filtered = files?.filter((f) => f.type === type) || [];
    if (filtered.length === 0) return null;
    return (
      <div className="flex gap-2 mt-2 flex-wrap">
        {filtered.map((file) => {
          const url = getFileUrl(file.key);
          return (
            <img
              key={file.id}
              src={url}
              alt={file.fileName}
              className="size-14 object-cover rounded"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="">
      {/* Always Show Header */}
      <div className="w-full h-[48px] bg-[#C0D8F6]  rounded-[15px] flex">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">Patient Duty Logs</p>
        </div>
      </div>

      {/* If No Data */}
      {logsArray.length === 0 ? (
        <p className="p-4">No duty logs found</p>
      ) : (
        <>
          {/* Patient Details */}
          <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
            <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
              <div className="flex">
                <span className="w-[250px] font-medium">Diagnosis</span>
                <span>{booking.diagnosis || "-"}</span>
              </div>

              <div className="flex">
                <span className="w-[250px] font-medium">
                  Service Period From
                </span>
                <span>
                  {booking.startDate ? booking.startDate.split("T")[0] : "-"}
                </span>
              </div>

              <div className="flex">
                <span className="w-[250px] font-medium">
                  Single visit / periodically
                </span>
                <span>{booking.scheduleType || "-"}</span>
              </div>

              <div className="flex">
                <span className="w-[250px] font-medium">Duration</span>
                <span>{booking.durationType || "-"}</span>
              </div>

              <div className="flex">
                <span className="w-[250px] font-medium">Daily Schedule</span>
                <span>{booking.serviceType || "-"}</span>
              </div>

              <div className="flex">
                <span className="w-[250px] font-medium">Frequency</span>
                <span>
                  {Array.isArray(booking.weekdays)
                    ? booking.weekdays.join(", ")
                    : "-"}
                </span>
              </div>

              <div className="flex">
                <span className="w-[250px] font-medium">Flexibility</span>
                <span>{booking.flexibility || "-"}</span>
              </div>

              <div className="flex">
                <span className="w-[250px] font-medium">Time</span>
                <span>
                  {formatTime12h(booking.startTime)} -{" "}
                  {formatTime12h(booking.endTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Staff Details */}
          <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
            <div className="w-full h-[72px] flex items-center px-8 rounded-t-[15px] border-b border-[#BBBBBB]">
              <h1 className="text-[16px] font-semibold text-black">
                Staff Details
              </h1>
            </div>

            <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
              <div className="flex">
                <span className="w-[250px] font-medium">Staff Name</span>
                <span>{staff?.nurseFullName || "-"}</span>
              </div>
              <div className="flex">
                <span className="w-[250px] font-medium">Staff ID</span>
                <span>{staff?.staffId || "-"}</span>
              </div>
              <div className="flex">
                <span className="w-[250px] font-medium">Contact</span>
                <span>{staff?.NurseMobileNumber || "-"}</span>
              </div>
              <div className="flex">
                <span className="w-[250px] font-medium">Current Status</span>
                <span>{staff?.NurseStatus || "-"}</span>
              </div>
            </div>
          </div>

          {/* Duty Logs */}
          {logsArray.map((log) => (
            <div
              key={log.id}
              className="w-full bg-[#FEF2FF] border border-[#DDDDDD] rounded-[10px] mt-[10px] divide-y divide-[#DDDDDD]"
            >
              <div className="w-full flex justify-between px-[40px] py-[12px] text-[16px] font-semibold gap-4">
                <p>
                  {new Date(log.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    weekday: "long",
                  })}
                </p>
              </div>

              <div>
                <div className="flex px-[40px] py-[12px]">
                  <p className="w-[300px]">Arrival</p>
                  {log.reachedLocationAt
                    ? new Date(log.reachedLocationAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )
                    : "-"}
                </div>
              </div>

              <div className="px-[40px] py-[12px] gap-4">
                <h2 className="text-[16px] font-semibold">Patient Status</h2>
                <p className="text-[14px]">{log.patientStatus || "-"}</p>
                {renderFiles(log.files, "PATIENT_STATUS")}
              </div>

              <div className="px-[40px] py-[12px] gap-4">
                <h2 className="text-[16px] font-semibold">New Observations</h2>
                <p className="text-[14px]">{log.observations || "-"}</p>
                {renderFiles(log.files, "OBSERVATION")}
              </div>

              <div className="px-[40px] py-[12px] gap-4">
                <h2 className="text-[16px] font-semibold">
                  Procedures Performed
                </h2>
                <p className="text-[14px]">{log.proceduresPerformed || "-"}</p>
                {renderFiles(log.files, "PROCEDURE")}
              </div>

              <div className="px-[40px] py-[12px] gap-4">
                <h2 className="text-[16px] font-semibold">Next Follow-Up</h2>
                <p className="text-[14px]">{log.followUpNotes || "-"}</p>
                {renderFiles(log.files, "FOLLOW_UP")}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
