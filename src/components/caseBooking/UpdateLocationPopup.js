"use client";

import React, { useState, useRef, useEffect } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const formatCoord = (v) => {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n.toFixed(6) : "NA";
};

const toNumber = (v) => {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

const UpdateLocationPopup = ({
  currentLat,
  currentLng,
  bookingId,
  onClose,
  onUpdated,
}) => {
  const { fetchCoordinatesByText, updateBookingLocation } = useBookingStore();

  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const initialCoords =
    currentLat != null && currentLng != null
      ? { latitude: toNumber(currentLat), longitude: toNumber(currentLng) }
      : null;

  const [newCoordinates, setNewCoordinates] = useState(initialCoords);
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // reverse geocode to human-readable name
  const fetchLocationName = async (lat, lng) => {
    if (lat == null || lng == null) {
      setLocationName("");
      return;
    }
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();
      if (data?.features?.length > 0) {
        setLocationName(data.features[0].place_name);
      } else {
        setLocationName("Unknown location");
      }
    } catch (err) {
      console.error("Reverse geocode error:", err);
      setLocationName("Unknown location");
    }
  };

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // default center (India center) if nothing else
    const defaultCenter = initialCoords
      ? [initialCoords.longitude, initialCoords.latitude]
      : [78.9629, 20.5937];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: defaultCenter,
      zoom: initialCoords ? 14 : 5,
    });

    mapRef.current = map;

    // click on map to set marker
    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      const latN = toNumber(lat);
      const lngN = toNumber(lng);
      if (latN == null || lngN == null) return;

      // if marker exists, move it; else create it
      if (markerRef.current) {
        markerRef.current.setLngLat([lngN, latN]);
      } else {
        markerRef.current = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lngN, latN])
          .addTo(map);

        // attach drag handler once
        markerRef.current.on("dragend", async () => {
          const { lng: dlng, lat: dlat } = markerRef.current.getLngLat();
          const latNum = toNumber(dlat);
          const lngNum = toNumber(dlng);
          setNewCoordinates({ latitude: latNum, longitude: lngNum });
          await fetchLocationName(latNum, lngNum);
        });
      }

      setNewCoordinates({ latitude: latN, longitude: lngN });
      await fetchLocationName(latN, lngN);
    });

    // If no initial coords, try to get device location silently
    if (!initialCoords && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = toNumber(pos.coords.latitude);
          const lng = toNumber(pos.coords.longitude);
          if (lat != null && lng != null) {
            map.flyTo({ center: [lng, lat], zoom: 14, essential: true });
            // create marker if not exists
            if (!markerRef.current) {
              markerRef.current = new mapboxgl.Marker({ draggable: true })
                .setLngLat([lng, lat])
                .addTo(map);

              markerRef.current.on("dragend", async () => {
                const { lng: dlng, lat: dlat } = markerRef.current.getLngLat();
                const latNum = toNumber(dlat);
                const lngNum = toNumber(dlng);
                setNewCoordinates({ latitude: latNum, longitude: lngNum });
                await fetchLocationName(latNum, lngNum);
              });
            } else {
              markerRef.current.setLngLat([lng, lat]);
            }
            setNewCoordinates({ latitude: lat, longitude: lng });
            fetchLocationName(lat, lng);
          }
        },
        (err) => {
          // silently ignore geolocation errors
          console.warn("Silent geolocation failed:", err);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // keep map/marker in sync when newCoordinates changes externally (e.g., search result)
  useEffect(() => {
    if (!mapRef.current || !newCoordinates) return;

    const lng = toNumber(newCoordinates.longitude);
    const lat = toNumber(newCoordinates.latitude);
    if (lat == null || lng == null) return;

    // add marker or move existing
    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat]);
    } else {
      markerRef.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      markerRef.current.on("dragend", async () => {
        const { lng: dlng, lat: dlat } = markerRef.current.getLngLat();
        const latNum = toNumber(dlat);
        const lngNum = toNumber(dlng);
        setNewCoordinates({ latitude: latNum, longitude: lngNum });
        await fetchLocationName(latNum, lngNum);
      });
    }

    // center map on new coords
    mapRef.current.flyTo({ center: [lng, lat], zoom: 14, essential: true });

    // update location name (if not set yet)
    fetchLocationName(lat, lng);
  }, [newCoordinates]);

  // Handle search action -> set newCoordinates (expects fetchCoordinatesByText to return {latitude, longitude, name?})
  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError("Please enter a location to search.");
      return;
    }
    setError("");
    setSearchLoading(true);

    try {
      const result = await fetchCoordinatesByText(searchText.trim());
      // guard and convert
      const lat = toNumber(result?.latitude);
      const lng = toNumber(result?.longitude);
      if (lat == null || lng == null) {
        setError("No coordinates found for this location.");
        setSearchLoading(false);
        return;
      }

      // set coordinates and name (if returned)
      setNewCoordinates({ latitude: lat, longitude: lng });
      if (result.name) setLocationName(result.name);
      else await fetchLocationName(lat, lng);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch coordinates.");
    } finally {
      setSearchLoading(false);
    }
  };

  // Save updated location -> send mapLocation (string) + lat/lng
  const handleSave = async () => {
    if (!newCoordinates) {
      setError("No location selected.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      latitude: toNumber(newCoordinates.latitude),
      longitude: toNumber(newCoordinates.longitude),
      currentServiceAddress: locationName || "",
    };

    try {
      const result = await updateBookingLocation(bookingId, payload);
      // assume updateBookingLocation returns { success: boolean, ... }
      if (result?.success) {
        if (onUpdated) onUpdated();
        onClose();
      } else {
        setError(result?.error || "Failed to update location.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update location.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Update Location
        </h2>

        {/* Coordinates & search */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          {/* <div>
            Latitude:{" "}
            <span className="font-medium text-gray-900">
              {newCoordinates ? formatCoord(newCoordinates.latitude) : "NA"}
            </span>
          </div>
          <div>
            Longitude:{" "}
            <span className="font-medium text-gray-900">
              {newCoordinates ? formatCoord(newCoordinates.longitude) : "NA"}
            </span>
          </div> */}
        </div>

        <div className="flex flex-col sm:flex-row items-end gap-3 mb-3">
          <div className="w-full flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Location
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search place or address"
              className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchText.trim() || searchLoading}
            className="h-10 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Map */}
        <div className="h-[300px] w-full rounded-lg overflow-hidden border border-gray-300">
          <div ref={mapContainerRef} className="h-full w-full" />
        </div>

        {/* Location info */}
        <div className="mt-4 text-center text-sm text-gray-700 space-y-1">
          {locationName ? (
            <p className="font-medium text-gray-900">📍 {locationName}</p>
          ) : (
            <p className="text-gray-500">Tap the map or search to pick a location</p>
          )}
          <p className="text-xs text-gray-500">You can drag the marker or click the map</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!newCoordinates || saving}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLocationPopup;