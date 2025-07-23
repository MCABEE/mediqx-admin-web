// import React, { useState } from "react";
// import useBookingStore from "@/app/lib/store/bookingStore";

// const UpdateLocationPopup = ({ currentLat, currentLng, onClose, onSave }) => {
//   const { fetchCoordinatesByText } = useBookingStore();
//   const [searchText, setSearchText] = useState("");
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [newCoordinates, setNewCoordinates] = useState(null);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!searchText.trim()) {
//       setError("Please enter a location to search.");
//       return;
//     }

//     setSearchLoading(true);
//     setError("");

//     try {
//       const result = await fetchCoordinatesByText(searchText.trim());

//       if (result?.latitude && result?.longitude) {
//         setNewCoordinates({
//           latitude: result.latitude,
//           longitude: result.longitude,
//           name: result.name,
//         });
//       } else {
//         setNewCoordinates(null);
//         setError("No coordinates found for this location.");
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Failed to fetch coordinates.");
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleSave = () => {
//     if (newCoordinates) {
//       onSave(newCoordinates); // Call parent with updated lat/lng
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Update Location</h2>

//         <div className="mb-4 text-sm text-gray-700">
//           <div>Current Latitude: {currentLat || "NA"}</div>
//           <div>Current Longitude: {currentLng || "NA"}</div>
//         </div>

//         <div className="flex mt-4 gap-4 items-end">
//           <div className="flex-1">
//             <h3 className="text-base font-medium text-[#333333] mb-2">Search Location</h3>
//             <input
//               type="text"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               placeholder="Search place or address"
//               className="border border-[#BBBBBB] text-black w-full h-[40px] rounded-[10px] p-3 outline-none"
//             />
//           </div>

//           <button
//             onClick={handleSearch}
//             className="h-[40px] bg-[#3674B5] text-white rounded-[10px] px-4 disabled:opacity-50"
//             disabled={!searchText.trim() || searchLoading}
//           >
//             {searchLoading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//         {newCoordinates && (
//           <div className="mt-4 text-sm text-gray-700">
//             <div>Latitude: {newCoordinates.latitude}</div>
//             <div>Longitude: {newCoordinates.longitude}</div>
//             {newCoordinates.name && (
//               <div className="text-gray-600 mt-1">Place: {newCoordinates.name}</div>
//             )}
//           </div>
//         )}

//         <div className="mt-6 flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//             disabled={!newCoordinates}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateLocationPopup;



















import React, { useState } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";

const UpdateLocationPopup = ({ currentLat, currentLng, bookingId, onClose, onUpdated }) => {
  const { fetchCoordinatesByText, updateBookingLocation } = useBookingStore();
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [newCoordinates, setNewCoordinates] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError("Please enter a location to search.");
      return;
    }

    setSearchLoading(true);
    setError("");

    try {
      const result = await fetchCoordinatesByText(searchText.trim());

      if (result?.latitude && result?.longitude) {
        setNewCoordinates({
          latitude: result.latitude,
          longitude: result.longitude,
          name: result.name,
        });
      } else {
        setNewCoordinates(null);
        setError("No coordinates found for this location.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch coordinates.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newCoordinates) return;
    setSaving(true);

    const payload = {
      latitude: newCoordinates.latitude,
      longitude: newCoordinates.longitude,
    };

    const result = await updateBookingLocation(bookingId, payload);

    if (result.success) {
      if (onUpdated) onUpdated();
      onClose();
    } else {
      setError(result.error || "Failed to update location.");
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Location</h2>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div>Current Latitude: <span className="font-medium text-gray-900">{currentLat || "NA"}</span></div>
          <div>Current Longitude: <span className="font-medium text-gray-900">{currentLng || "NA"}</span></div>
        </div>

        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="w-full flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Location</label>
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

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {newCoordinates && (
          <div className="mt-5 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-1">
            <div><strong>Latitude:</strong> {newCoordinates.latitude}</div>
            <div><strong>Longitude:</strong> {newCoordinates.longitude}</div>
            {newCoordinates.name && (
              <div className="text-gray-600"><strong>Place:</strong> {newCoordinates.name}</div>
            )}
          </div>
        )}

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
