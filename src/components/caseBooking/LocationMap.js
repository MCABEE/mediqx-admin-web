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











"use client";

import React, { useEffect, useRef } from "react";

// Patient location
const patient = {
  name: "Patient Home",
  latitude: 10.0155,
  longitude: 76.3402,
};

// Nearby nurse data
const users = [
  {
    userId: "user001",
    name: "Alice Paul",
    latitude: 10.0287,
    longitude: 76.3539,
  },
  {
    userId: "user002",
    name: "Benny Mathew",
    latitude: 9.9945,
    longitude: 76.3632,
  },
  {
    userId: "user003",
    name: "Clara George",
    latitude: 10.0059,
    longitude: 76.3724,
  },
  {
    userId: "user004",
    name: "Deepak Joseph",
    latitude: 10.0352,
    longitude: 76.3317,
  },
  {
    userId: "user005",
    name: "Elizabeth Kurian",
    latitude: 10.0179,
    longitude: 76.3146,
  },
  {
    userId: "user006",
    name: "Firoz Khan",
    latitude: 9.9982,
    longitude: 76.3369,
  },
  {
    userId: "user007",
    name: "Greeshma Das",
    latitude: 10.0208,
    longitude: 76.3691,
  },
  {
    userId: "user008",
    name: "Harish Nair",
    latitude: 10.0456,
    longitude: 76.3498,
  },
  {
    userId: "user009",
    name: "Irene John",
    latitude: 10.0013,
    longitude: 76.3294,
  },
  {
    userId: "user010",
    name: "Jithin Thomas",
    latitude: 10.0211,
    longitude: 76.3452,
  },
];

const LocationMap = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!window.mapboxgl) return;

    window.mapboxgl.accessToken = "pk.eyJ1IjoiYW50b3ZhbGl5aWwiLCJhIjoiY21idW9qZmlrMGQzYjJqczFzamw3c2s3NCJ9.ObVsvuHhN1xd6WV6b-hJ0Q"; // Replace with your token

    const map = new window.mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [patient.longitude, patient.latitude],
      zoom: 13,
    });

    // Patient Marker (Red)
    const patientPopup = new window.mapboxgl.Popup({ offset: 25 }).setText(patient.name);
    new window.mapboxgl.Marker({ color: "#DC2626" }) // Red
      .setLngLat([patient.longitude, patient.latitude])
      .setPopup(patientPopup)
      .addTo(map);

    // Nurse Markers (Blue)
    users.forEach((user) => {
      const popup = new window.mapboxgl.Popup({ offset: 25 }).setText(user.name);
      new window.mapboxgl.Marker({ color: "#1D4ED8" }) // Blue
        .setLngLat([user.longitude, user.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return (
    <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default LocationMap;

