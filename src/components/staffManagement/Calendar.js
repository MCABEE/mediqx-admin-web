"use client";
import { useState, useEffect } from "react";
import useNurseStore from "@/app/lib/store/nurseStore";
import { CiSearch } from "react-icons/ci";

const Calendar = () => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [search, setSearch] = useState("");
  const [selectedNurse, setSelectedNurse] = useState(null); // ✅ Selected nurse info
  const [nurseId, setNurseId] = useState(null); // ✅ Nurse ID for calendar
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { fetchNurseCalendar, calendarData, isLoading, fetchNurses, users } =
    useNurseStore();

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

  const availableMonths = months
    .map((month, index) => ({ name: month, value: index + 1 }))
    .filter((m) =>
      year === today.getFullYear() ? m.value >= today.getMonth() + 1 : true
    );

  const availableYears = Array.from(
    { length: 4 },
    (_, i) => today.getFullYear() + i
  );

  const getMonthDates = (month, year) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDate =
      year === today.getFullYear() && month === today.getMonth() + 1
        ? today
        : firstDay;
    return {
      monthStart: startDate.toISOString(),
      monthEnd: lastDay.toISOString(),
    };
  };

  // ✅ Fetch calendar whenever nurseId, month, or year changes
  useEffect(() => {
    if (!nurseId) return;
    const { monthStart, monthEnd } = getMonthDates(selectedMonth, year);
    fetchNurseCalendar(nurseId, monthStart, monthEnd);
  }, [nurseId, selectedMonth, year]);

  // ✅ Debounced Search
  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => {
      if (search.trim().length > 0) {
        fetchNurses(1, 10, "APPROVED", search);
      }
    }, 400);
    setDebounceTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [search]);

  const getColor = (status) => {
    switch (status) {
      case "leave":
        return "bg-red-300";
      case "available":
        return "bg-green-300";
      case "on-duty":
        return "bg-gray-300";
      default:
        return "bg-gray-200";
    }
  };

  const days =
    calendarData?.data?.map((day) => ({
      date: new Date(day.date).getDate(),
      status: day.status,
    })) || [];

  const handleSelectNurse = (nurse) => {
    setSelectedNurse(nurse);
    setNurseId(nurse.userId);
    setSearch(""); // clear search input
  };

  return (
    <>
      {/* ✅ Search Bar */}
      <div className="relative w-full bg-white border border-[#888888] px-6 pb-4 pt-6 rounded-[15px] mt-4">
        <div className="w-[297px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB]  rounded-[15px] ps-4 pe-4 flex items-center gap-2">
          <CiSearch className="text-xl" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Employee"
            className="w-full h-full outline-none placeholder:text-black ps-2 "
          />
        </div>

        {/* ✅ Suggestions Dropdown */}
        {search && users.length > 0 && (
          <div className="absolute bg-white  rounded-md mt-1 w-[297px] shadow-lg z-10">
            {users.map((nurse) => (
              <div
                key={nurse.userId}
                onClick={() => handleSelectNurse(nurse)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-sm font-medium">{nurse.fullName}</p>
                <p className="text-xs text-gray-500">{nurse.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Calendar Section */}
      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
        <h1 className="font-semibold text-[#333333] text-[20px] py-[26px] border-b border-[#BBBBBB] px-[38px]">
          {selectedNurse ? selectedNurse.fullName : "Select a Nurse"}
        </h1>

        <div className="flex justify-between text-black items-center mb-4 px-[38px] py-[15px] border-b border-[#BBBBBB]">
          <h2 className="text-lg font-bold">
            {months[selectedMonth - 1]} {year}
          </h2>

          <div className="flex gap-3">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 rounded-[5px] bg-[#B6E9C4]"></div>
              Available
            </div>

            {/* ✅ Year Dropdown */}
            <select
              className="p-2 border outline-none border-[#BBBBBB] rounded-[15px]"
              value={year}
              onChange={(e) => {
                const newYear = Number(e.target.value);
                setYear(newYear);
                if (
                  newYear === today.getFullYear() &&
                  selectedMonth < today.getMonth() + 1
                ) {
                  setSelectedMonth(today.getMonth() + 1);
                }
              }}
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* ✅ Month Dropdown */}
            <select
              className="p-2 border outline-none border-[#BBBBBB] rounded-[15px]"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {availableMonths.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ✅ Calendar Days */}
        <div className="grid grid-cols-7 gap-x-2 gap-y-3 px-[38px] py-8 text-black">
          {isLoading ? (
            <p className="col-span-7 text-center">Loading...</p>
          ) : !nurseId ? (
            <p className="col-span-7 text-center">
              Select a nurse to view calendar
            </p>
          ) : days.length > 0 ? (
            days.map((day, idx) => (
              <div
                key={idx}
                className={`p-4 text-center rounded ${getColor(day.status)}`}
              >
                {day.date}
              </div>
            ))
          ) : (
            <p className="col-span-7 text-center">No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
