"use client";
import React, { useEffect, useRef, useState } from "react";

const LocationMap = ({ latitude, longitude, fullName, nurses = [] }) => {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.mapboxgl ||
      !mapContainerRef.current
    )
      return;

    window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const patientLat = parseFloat(latitude);
    const patientLng = parseFloat(longitude);

    const map = new window.mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [patientLng || 78.0, patientLat || 10.0],
      zoom: 13,
    });

    map.on("load", () => setMapLoaded(true));

    nurses.forEach((nurse) => {
      if (!nurse.latitude || !nurse.longitude) return;

      new window.mapboxgl.Marker({ color: "#1D4ED8" })
        .setLngLat([parseFloat(nurse.longitude), parseFloat(nurse.latitude)])
        .setPopup(
          new window.mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${nurse.fullName}</strong><br/>${nurse.location || ""}`
          )
        )
        .addTo(map);
    });

    if (patientLat && patientLng) {
      new window.mapboxgl.Marker({ color: "#DC2626" })
        .setLngLat([patientLng, patientLat])
        .setPopup(
          new window.mapboxgl.Popup().setHTML(`<strong>${fullName}</strong>`)
        )
        .addTo(map);
    }

    return () => map.remove();
  }, [nurses, latitude, longitude, fullName]);

  return (
    <div className="w-full h-[400px] rounded-[15px] mt-2 relative overflow-hidden">
      {/* Shimmer Loader */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite] rounded-[15px]" />
      )}

      {/* Map */}
      <div ref={mapContainerRef} className="w-full h-full rounded-[15px]" />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -450px 0;
          }
          100% {
            background-position: 450px 0;
          }
        }
        div[ref] {
          background-size: 1000px 100%;
        }
      `}</style>
    </div>
  );
};

export default LocationMap;
