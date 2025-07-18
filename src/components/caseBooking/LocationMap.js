// "use client";

// import React, { useEffect, useRef } from "react";

// // Sample user data
// const users = [
//   {
//     userId: "user001",
//     name: "Alice Paul",
//     latitude: 10.0287,
//     longitude: 76.3539,
//   },
//   {
//     userId: "user002",
//     name: "Benny Mathew",
//     latitude: 9.9945,
//     longitude: 76.3632,
//   },
//   {
//     userId: "user003",
//     name: "Clara George",
//     latitude: 10.0059,
//     longitude: 76.3724,
//   },
//   {
//     userId: "user004",
//     name: "Deepak Joseph",
//     latitude: 10.0352,
//     longitude: 76.3317,
//   },
//   {
//     userId: "user005",
//     name: "Elizabeth Kurian",
//     latitude: 10.0179,
//     longitude: 76.3146,
//   },
//   {
//     userId: "user006",
//     name: "Firoz Khan",
//     latitude: 9.9982,
//     longitude: 76.3369,
//   },
//   {
//     userId: "user007",
//     name: "Greeshma Das",
//     latitude: 10.0208,
//     longitude: 76.3691,
//   },
//   {
//     userId: "user008",
//     name: "Harish Nair",
//     latitude: 10.0456,
//     longitude: 76.3498,
//   },
//   {
//     userId: "user009",
//     name: "Irene John",
//     latitude: 10.0013,
//     longitude: 76.3294,
//   },
//   {
//     userId: "user010",
//     name: "Jithin Thomas",
//     latitude: 10.0211,
//     longitude: 76.3452,
//   },
// ];

// const LocationMap = () => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     if (!window.mapboxgl) return;

//     window.mapboxgl.accessToken = "pk.eyJ1IjoiYW50b3ZhbGl5aWwiLCJhIjoiY21idW9qZmlrMGQzYjJqczFzamw3c2s3NCJ9.ObVsvuHhN1xd6WV6b-hJ0Q"; 

//     const map = new window.mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [76.34, 10.02], // Center around Kochi
//       zoom: 12,
//     });

//     // Add markers with popups
//     users.forEach((user) => {
//       const popup = new window.mapboxgl.Popup({ offset: 25 }).setText(user.name);

//       new window.mapboxgl.Marker({ color: "#1D4ED8" }) // blue marker
//         .setLngLat([user.longitude, user.latitude])
//         .setPopup(popup)
//         .addTo(map);
//     });

//     return () => map.remove();
//   }, []);

//   return (
//     <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
//       <div ref={mapContainerRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default LocationMap;











// "use client";

// import React, { useEffect, useRef } from "react";

// // Patient location
// const patient = {
//   name: "Patient Home",
//   latitude: 10.0155,
//   longitude: 76.3402,
// };

// // Nearby nurse data
// const users = [
//   {
//     userId: "user001",
//     name: "Alice Paul",
//     latitude: 10.0287,
//     longitude: 76.3539,
//   },
//   {
//     userId: "user002",
//     name: "Benny Mathew",
//     latitude: 9.9945,
//     longitude: 76.3632,
//   },
//   {
//     userId: "user003",
//     name: "Clara George",
//     latitude: 10.0059,
//     longitude: 76.3724,
//   },
//   {
//     userId: "user004",
//     name: "Deepak Joseph",
//     latitude: 10.0352,
//     longitude: 76.3317,
//   },
//   {
//     userId: "user005",
//     name: "Elizabeth Kurian",
//     latitude: 10.0179,
//     longitude: 76.3146,
//   },
//   {
//     userId: "user006",
//     name: "Firoz Khan",
//     latitude: 9.9982,
//     longitude: 76.3369,
//   },
//   {
//     userId: "user007",
//     name: "Greeshma Das",
//     latitude: 10.0208,
//     longitude: 76.3691,
//   },
//   {
//     userId: "user008",
//     name: "Harish Nair",
//     latitude: 10.0456,
//     longitude: 76.3498,
//   },
//   {
//     userId: "user009",
//     name: "Irene John",
//     latitude: 10.0013,
//     longitude: 76.3294,
//   },
//   {
//     userId: "user010",
//     name: "Jithin Thomas",
//     latitude: 10.0211,
//     longitude: 76.3452,
//   },
// ];

// const LocationMap = () => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     if (!window.mapboxgl) return;

//     // window.mapboxgl.accessToken = ""; 
//     window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


//     const map = new window.mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [patient.longitude, patient.latitude],
//       zoom: 13,
//     });

//     // Patient Marker (Red)
//     const patientPopup = new window.mapboxgl.Popup({ offset: 25 }).setText(patient.name);
//     new window.mapboxgl.Marker({ color: "#DC2626" }) // Red
//       .setLngLat([patient.longitude, patient.latitude])
//       .setPopup(patientPopup)
//       .addTo(map);

//     // Nurse Markers (Blue)
//     users.forEach((user) => {
//       const popup = new window.mapboxgl.Popup({ offset: 25 }).setText(user.name);
//       new window.mapboxgl.Marker({ color: "#1D4ED8" }) // Blue
//         .setLngLat([user.longitude, user.latitude])
//         .setPopup(popup)
//         .addTo(map);
//     });

//     return () => map.remove();
//   }, []);

//   return (
//     <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
//       <div ref={mapContainerRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default LocationMap;



// "use client";

// import useNurseStore from "@/app/lib/store/nurseStore";
// import React, { useEffect, useRef } from "react";

// const patient = {
//   name: "Patient Home",
//   latitude: 10.0155,
//   longitude: 76.3402,
// };

// const LocationMap = () => {
//   const mapContainerRef = useRef(null);
//   const { nurses, fetchNurses } = useNurseStore();
//   const currentPage = 1;
//   const limit = 20;

//   useEffect(() => {
//     fetchNurses(currentPage, limit, "APPROVED");
//   }, [currentPage, limit, fetchNurses]);

//   useEffect(() => {
//     if (!window.mapboxgl || !nurses || nurses.length === 0) return;

//     window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

//     const map = new window.mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [patient.longitude, patient.latitude],
//       zoom: 13,
//     });

//     // Patient Marker
//     const patientPopup = new window.mapboxgl.Popup({ offset: 25 }).setText(patient.name);
//     new window.mapboxgl.Marker({ color: "#DC2626" }) // Red
//       .setLngLat([patient.longitude, patient.latitude])
//       .setPopup(patientPopup)
//       .addTo(map);

//     // Nurse Markers
//     nurses.forEach((nurse) => {
//       if (!nurse.latitude || !nurse.longitude) return;

//       const popup = new window.mapboxgl.Popup({ offset: 25 }).setText(nurse.name || "Unnamed Nurse");
//       new window.mapboxgl.Marker({ color: "#1D4ED8" }) // Blue
//         .setLngLat([nurse.longitude, nurse.latitude])
//         .setPopup(popup)
//         .addTo(map);
//     });

//     return () => map.remove();
//   }, [nurses]);

//   return (
//     <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
//       <div ref={mapContainerRef} className="w-full h-full" />
//     </div>
//   );
// };

// // export default LocationMap;

// "use client";

// import React, { useEffect, useRef } from "react";
// import useNurseStore from "@/app/lib/store/nurseStore";

// const LocationMap = () => {
//   const mapContainerRef = useRef(null);
//   const { users, fetchNurses } = useNurseStore();

//   useEffect(() => {
//     fetchNurses(1, 100, "APPROVED");
//   }, [fetchNurses]);

//   useEffect(() => {
//     if (
//       typeof window === "undefined" ||
//       !window.mapboxgl ||
//       !mapContainerRef.current ||
//       !Array.isArray(users) ||
//       users.length === 0
//     )
//       return;

//     window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

//     const map = new window.mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [78.0, 10.0], // Default center
//       zoom: 6,
//     });

//     users.forEach((nurse) => {
//       const lat = parseFloat(nurse.latitude);
//       const lng = parseFloat(nurse.longitude);

//       if (!lat || !lng || isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return;

//       const popup = new window.mapboxgl.Popup({ offset: 25 }).setHTML(
//         `<strong>${nurse.fullName}</strong><br/>${nurse.location}`
//       );

//       new window.mapboxgl.Marker({ color: "#1D4ED8" })
//         .setLngLat([lng, lat])
//         .setPopup(popup)
//         .addTo(map);
//     });

//     return () => map.remove();
//   }, [users]);

//   return (
//     <div className="w-full h-[400px] rounded-[15px] overflow-hidden mt-2 border border-gray-300">
//       <div ref={mapContainerRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default LocationMap;




"use client";

import React, { useEffect, useRef } from "react";
import useNurseStore from "@/app/lib/store/nurseStore";

const LocationMap = () => {
  const mapContainerRef = useRef(null);
  const hasFetchedRef = useRef(false); // ✅ only fetch once
  const { users, fetchNurses } = useNurseStore();

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchNurses(1, 100, "APPROVED");
      hasFetchedRef.current = true;
    }
  }, [fetchNurses]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.mapboxgl ||
      !mapContainerRef.current ||
      !Array.isArray(users) ||
      users.length === 0
    ) {
      return;
    }

    window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new window.mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.0, 10.0],
      zoom: 6,
    });

    users.forEach((nurse) => {
      const lat = parseFloat(nurse.latitude);
      const lng = parseFloat(nurse.longitude);

      if (!lat || !lng || isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return;

      const popup = new window.mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${nurse.fullName}</strong><br/>${nurse.location || ""}`
      );

      new window.mapboxgl.Marker({ color: "#1D4ED8" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, [users]);

  return (
    <div className="w-full h-[400px] rounded-[15px] overflow-hidden mt-2 border border-gray-300">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default LocationMap;

