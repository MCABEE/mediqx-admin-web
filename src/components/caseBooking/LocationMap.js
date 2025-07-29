"use client";
import React, { useEffect, useRef, useState } from "react";

const LocationMap = ({ latitude, longitude, fullName, nurses = [] }) => {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!window.mapboxgl || !mapContainerRef.current) return;

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

    const bounds = new window.mapboxgl.LngLatBounds();

    // ✅ Add patient marker
    if (patientLat && patientLng) {
      new window.mapboxgl.Marker({ color: "#DC2626" })
        .setLngLat([patientLng, patientLat])
        .setPopup(
          new window.mapboxgl.Popup().setHTML(`<strong>${fullName}</strong>`)
        )
        .addTo(map);

      bounds.extend([patientLng, patientLat]);
    }

    // ✅ Add nurse markers
    nurses.forEach((nurse) => {
      if (!nurse.latitude || !nurse.longitude) return;

      const nurseLng = parseFloat(nurse.longitude);
      const nurseLat = parseFloat(nurse.latitude);

      new window.mapboxgl.Marker({ color: "#1D4ED8" })
        .setLngLat([nurseLng, nurseLat])
        .setPopup(
          new window.mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${nurse.fullName}</strong><br/>${nurse.location || ""}`
          )
        )
        .addTo(map);

      bounds.extend([nurseLng, nurseLat]);
    });

    // ✅ Fit map to show all markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 50 });
    }

    return () => map.remove();
  }, [latitude, longitude, fullName, nurses]);

  return (
    <div className="w-full h-[400px] rounded-[15px] mt-2 relative overflow-hidden">
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-[15px]" />
      )}
      <div ref={mapContainerRef} className="w-full h-full rounded-[15px]" />
    </div>
  );
};

export default LocationMap;
