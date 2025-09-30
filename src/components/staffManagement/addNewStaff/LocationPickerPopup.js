// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from "mapbox-gl";
// import useBookingStore from "@/app/lib/store/bookingStore";

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

// const toNumber = (v) => {
//   const n = typeof v === "number" ? v : parseFloat(v);
//   return Number.isFinite(n) ? n : null;
// };

// const formatCoord = (v) => {
//   const n = typeof v === "number" ? v : parseFloat(v);
//   return Number.isFinite(n) ? n.toFixed(6) : "NA";
// };

// const LocationPickerPopup = ({ currentLat, currentLng, onClose, onUpdated }) => {
//   const { fetchCoordinatesByText } = useBookingStore();

//   const [searchText, setSearchText] = useState("");
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState([]); // array of { name, latitude, longitude }
//   const [error, setError] = useState("");

//   const initialCoords =
//     currentLat != null && currentLng != null
//       ? { latitude: toNumber(currentLat), longitude: toNumber(currentLng) }
//       : null;

//   const [newCoordinates, setNewCoordinates] = useState(initialCoords);
//   const [locationName, setLocationName] = useState("");

//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   // reverse geocode using Mapbox
//   const fetchLocationName = async (lat, lng) => {
//     if (lat == null || lng == null) {
//       setLocationName("");
//       return;
//     }
//     try {
//       const res = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
//       );
//       const data = await res.json();
//       if (data?.features?.length > 0) {
//         setLocationName(data.features[0].place_name);
//       } else {
//         setLocationName("");
//       }
//     } catch (err) {
//       console.error("Reverse geocode error:", err);
//       setLocationName("");
//     }
//   };

//   // initialize map
//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     const center = initialCoords
//       ? [initialCoords.longitude, initialCoords.latitude]
//       : [78.9629, 20.5937]; // India center fallback

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center,
//       zoom: initialCoords ? 14 : 4,
//     });

//     mapRef.current = map;

//     // Add click handler: set marker and coords
//     map.on("click", async (e) => {
//       const { lng, lat } = e.lngLat;
//       const latN = toNumber(lat);
//       const lngN = toNumber(lng);
//       if (latN == null || lngN == null) return;

//       if (markerRef.current) {
//         markerRef.current.setLngLat([lngN, latN]);
//       } else {
//         markerRef.current = new mapboxgl.Marker({ draggable: true })
//           .setLngLat([lngN, latN])
//           .addTo(map);

//         markerRef.current.on("dragend", async () => {
//           const { lng: dlng, lat: dlat } = markerRef.current.getLngLat();
//           const latNum = toNumber(dlat);
//           const lngNum = toNumber(dlng);
//           setNewCoordinates({ latitude: latNum, longitude: lngNum });
//           await fetchLocationName(latNum, lngNum);
//         });
//       }

//       setNewCoordinates({ latitude: latN, longitude: lngN });
//       await fetchLocationName(latN, lngN);
//     });

//     // If we have initial coordinates, place marker
//     if (initialCoords) {
//       if (!markerRef.current) {
//         markerRef.current = new mapboxgl.Marker({ draggable: true })
//           .setLngLat([initialCoords.longitude, initialCoords.latitude])
//           .addTo(map);

//         markerRef.current.on("dragend", async () => {
//           const { lng: dlng, lat: dlat } = markerRef.current.getLngLat();
//           const latNum = toNumber(dlat);
//           const lngNum = toNumber(dlng);
//           setNewCoordinates({ latitude: latNum, longitude: lngNum });
//           await fetchLocationName(latNum, lngNum);
//         });
//       } else {
//         markerRef.current.setLngLat([initialCoords.longitude, initialCoords.latitude]);
//       }
//       fetchLocationName(initialCoords.latitude, initialCoords.longitude);
//     }

//     return () => {
//       map.remove();
//       mapRef.current = null;
//       markerRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // run once

//   // When newCoordinates changes, move marker and center map
//   useEffect(() => {
//     if (!mapRef.current || !newCoordinates) return;
//     const lng = toNumber(newCoordinates.longitude);
//     const lat = toNumber(newCoordinates.latitude);
//     if (lat == null || lng == null) return;

//     if (markerRef.current) {
//       markerRef.current.setLngLat([lng, lat]);
//     } else {
//       markerRef.current = new mapboxgl.Marker({ draggable: true })
//         .setLngLat([lng, lat])
//         .addTo(mapRef.current);

//       markerRef.current.on("dragend", async () => {
//         const { lng: dlng, lat: dlat } = markerRef.current.getLngLat();
//         const latNum = toNumber(dlat);
//         const lngNum = toNumber(dlng);
//         setNewCoordinates({ latitude: latNum, longitude: lngNum });
//         await fetchLocationName(latNum, lngNum);
//       });
//     }

//     mapRef.current.flyTo({ center: [lng, lat], zoom: 14, essential: true });
//     fetchLocationName(lat, lng);
//   }, [newCoordinates]);

//   // Search using fetchCoordinatesByText from booking store
//   const handleSearch = async () => {
//     if (!searchText.trim()) {
//       setError("Please enter a location to search.");
//       return;
//     }
//     setError("");
//     setSearchLoading(true);
//     setSearchResults([]);
//     try {
//       const res = await fetchCoordinatesByText(searchText.trim());
//       // handle many possible shapes returned by the store:
//       // - array of results
//       // - single object { latitude, longitude, name }
//       // - if your store returns mapbox features, map them

//       let results = [];

//       if (Array.isArray(res)) {
//         // normalize array items
//         results = res
//           .map((r) => {
//             if (!r) return null;
//             // common shapes: { latitude, longitude, name } or { lat, lon, place_name } or mapbox feature
//             if (r.latitude && r.longitude) {
//               return { name: r.name || r.place_name || r.displayName || `${r.latitude}, ${r.longitude}`, latitude: toNumber(r.latitude), longitude: toNumber(r.longitude) };
//             }
//             if (r.lat && r.lon) {
//               return { name: r.name || r.place_name || `${r.lat}, ${r.lon}`, latitude: toNumber(r.lat), longitude: toNumber(r.lon) };
//             }
//             if (r.center && r.place_name) {
//               // mapbox feature style: center: [lng, lat]
//               return { name: r.place_name, latitude: toNumber(r.center[1]), longitude: toNumber(r.center[0]) };
//             }
//             return null;
//           })
//           .filter(Boolean);
//       } else if (res && typeof res === "object") {
//         // maybe a single object
//         if (res.latitude && res.longitude) {
//           results = [{ name: res.name || res.place_name || `${res.latitude}, ${res.longitude}`, latitude: toNumber(res.latitude), longitude: toNumber(res.longitude) }];
//         } else if (res.center && res.place_name) {
//           results = [{ name: res.place_name, latitude: toNumber(res.center[1]), longitude: toNumber(res.center[0]) }];
//         }
//       }

//       if (results.length === 0) {
//         setError("No results found.");
//       } else {
//         setSearchResults(results);
//         setError("");
//       }
//     } catch (err) {
//       console.error("Search failed:", err);
//       setError("Search failed. Try again.");
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleSelectResult = (r) => {
//     setNewCoordinates({ latitude: r.latitude, longitude: r.longitude });
//     setLocationName(r.name || "");
//     setSearchResults([]);
//     setSearchText("");
//   };

//   const handleSave = () => {
//     if (!newCoordinates) {
//       setError("Please pick a location first.");
//       return;
//     }
//     const payload = {
//       latitude: toNumber(newCoordinates.latitude),
//       longitude: toNumber(newCoordinates.longitude),
//       mapLocation: locationName || "",
//     };
//     if (onUpdated) onUpdated(payload);
//     if (onClose) onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-5 md:p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold">Pick Location</h3>
//           <div className="flex gap-2">
//             <button
//               onClick={() => {
//                 if (onClose) onClose();
//               }}
//               className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm disabled:opacity-50"
//             >
//               Save
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="md:col-span-1">
//             <label className="block text-sm font-medium mb-1">Search place or address</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 placeholder="Search..."
//                 className="flex-1 h-10 px-3 border rounded-lg outline-none"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={searchLoading || !searchText.trim()}
//                 className="px-3 rounded-lg bg-blue-600 text-white"
//               >
//                 {searchLoading ? "Searching..." : "Search"}
//               </button>
//             </div>

//             {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

//             {searchResults.length > 0 && (
//               <div className="max-h-56 overflow-auto border rounded-md p-1">
//                 {searchResults.map((r, i) => (
//                   <div
//                     key={`${r.latitude}-${r.longitude}-${i}`}
//                     onClick={() => handleSelectResult(r)}
//                     className="p-2 cursor-pointer hover:bg-gray-100 rounded"
//                   >
//                     <div className="text-sm font-medium">{r.name}</div>
//                     <div className="text-xs text-gray-500">
//                       {formatCoord(r.latitude)}, {formatCoord(r.longitude)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="mt-4 text-sm">
//               <div><strong>Selected:</strong></div>
//               <div className="text-sm text-gray-700">{locationName || "None"}</div>
//               <div className="text-xs text-gray-500">
//                 {newCoordinates ? `${formatCoord(newCoordinates.latitude)}, ${formatCoord(newCoordinates.longitude)}` : ""}
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-2">
//             <div className="h-80 rounded-md overflow-hidden border" ref={mapContainerRef} />
//             <p className="text-xs text-gray-500 mt-2">Click the map to place a marker. Drag the marker to adjust.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationPickerPopup;






"use client";
import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import useBookingStore from "@/app/lib/store/bookingStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const toNumber = (v) => {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

const formatCoord = (v) => {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n.toFixed(6) : "NA";
};

const LocationPickerPopup = ({ currentLat, currentLng, onClose, onUpdated }) => {
  const { fetchCoordinatesByText } = useBookingStore();

  const initialCoords =
    currentLat != null && currentLng != null
      ? { latitude: toNumber(currentLat), longitude: toNumber(currentLng) }
      : null;

  const [newCoordinates, setNewCoordinates] = useState(initialCoords);
  const [locationName, setLocationName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // reverse geocode for name
  const fetchLocationName = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();
      if (data?.features?.length > 0) {
        setLocationName(data.features[0].place_name);
      } else {
        setLocationName("");
      }
    } catch {
      setLocationName("");
    }
  };

  // init map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const center = initialCoords
      ? [initialCoords.longitude, initialCoords.latitude]
      : [78.9629, 20.5937];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom: initialCoords ? 14 : 4,
    });

    mapRef.current = map;

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      const latN = toNumber(lat);
      const lngN = toNumber(lng);
      if (latN == null || lngN == null) return;

      placeMarker(lngN, latN);
    });

    if (initialCoords) {
      placeMarker(initialCoords.longitude, initialCoords.latitude);
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placeMarker = (lng, lat) => {
    if (!mapRef.current) return;

    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat]);
    } else {
      markerRef.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      markerRef.current.on("dragend", () => {
        const { lng: dlng, lat: dlat } = markerRef.current.getLngLat();
        setNewCoordinates({ latitude: toNumber(dlat), longitude: toNumber(dlng) });
        fetchLocationName(dlat, dlng);
      });
    }

    setNewCoordinates({ latitude: lat, longitude: lng });
    fetchLocationName(lat, lng);
    mapRef.current.flyTo({ center: [lng, lat], zoom: 14, essential: true });
  };

  // search single best result
  const handleSearch = async () => {
    if (!searchText.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetchCoordinatesByText(searchText.trim());
      let best = null;

      if (Array.isArray(res) && res.length > 0) {
        const r = res[0];
        if (r.latitude && r.longitude) {
          best = { latitude: toNumber(r.latitude), longitude: toNumber(r.longitude), name: r.name || r.place_name };
        } else if (r.center) {
          best = { latitude: toNumber(r.center[1]), longitude: toNumber(r.center[0]), name: r.place_name };
        }
      } else if (res && res.latitude && res.longitude) {
        best = { latitude: toNumber(res.latitude), longitude: toNumber(res.longitude), name: res.name || res.place_name };
      }

      if (!best) {
        setError("No results found");
        return;
      }

      placeMarker(best.longitude, best.latitude);
      if (best.name) setLocationName(best.name);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!newCoordinates) {
      setError("Pick a location first.");
      return;
    }
    onUpdated({
      latitude: newCoordinates.latitude,
      longitude: newCoordinates.longitude,
      mapLocation: locationName || "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pick Location</h3>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>

        <div className="mb-3 flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search place..."
            className="flex-1 h-10 px-3 border rounded-lg outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-3 rounded-lg bg-blue-600 text-white"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

        <div className="h-80 rounded-md overflow-hidden border" ref={mapContainerRef} />
        <div className="mt-3 text-sm">
          <div><strong>Selected:</strong> {locationName || "None"}</div>
          {newCoordinates && (
            <div className="text-xs text-gray-500">
              {formatCoord(newCoordinates.latitude)}, {formatCoord(newCoordinates.longitude)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPickerPopup;
