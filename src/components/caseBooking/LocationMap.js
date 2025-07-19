"use client";

import React, { useEffect, useRef } from "react";
import useNurseStore from "@/app/lib/store/nurseStore";

const LocationMap = ({ latitude, longitude, fullName }) => {
  const mapContainerRef = useRef(null);
  const hasFetchedRef = useRef(false);
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
      !Array.isArray(users)
    ) {
      return;
    }

    window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const latCenter = parseFloat(latitude) || 10.0;
    const lngCenter = parseFloat(longitude) || 78.0;

    const map = new window.mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lngCenter, latCenter],
      zoom: 6,
    });

    // ✅ Add nurse markers
    users.forEach((nurse) => {
      const lat = parseFloat(nurse.latitude);
      const lng = parseFloat(nurse.longitude);

      if (!lat || !lng || isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return;

      const popup = new window.mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${nurse.fullName}</strong><br/>${nurse.location || ""}`
      );

      new window.mapboxgl.Marker({ color: "#1D4ED8" }) // blue marker
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
    });

    // ✅ Add patient marker
    const patientLat = parseFloat(latitude);
    const patientLng = parseFloat(longitude);

    if (!isNaN(patientLat) && !isNaN(patientLng) && patientLat !== 0 && patientLng !== 0) {
      const popup = new window.mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${fullName || "Patient"}</strong><br/>Patient Location`
      );

      new window.mapboxgl.Marker({ color: "#DC2626" }) // red marker
        .setLngLat([patientLng, patientLat])
        .setPopup(popup)
        .addTo(map);
    }

    return () => map.remove();
  }, [users, latitude, longitude, fullName]);

  return (
    <div className="w-full h-[400px] rounded-[15px] overflow-hidden mt-2 border border-gray-300">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default LocationMap;
