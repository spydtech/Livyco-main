import React, { useState, useCallback, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapAPI } from "../PropertyController";
import axios from "axios";
import {
  
  FaSearch,
  FaCrosshairs,
  FaSatellite,
  FaStreetView,
  FaSave,
  FaTrash,
  FaLocationArrow,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import { GrSatellite } from "react-icons/gr";
import { CiSaveDown1,CiTrash,CiLocationOn } from "react-icons/ci";
// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapLocationClient({ propertyId, propertyName }) {
  const [pins, setPins] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);
  const [mapType, setMapType] = useState("street");

  const mapRef = useRef();

  // Fetch existing pins when component loads
  useEffect(() => {
    const fetchExistingPins = async () => {
      if (!propertyId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await mapAPI.getMapByProperty(propertyId);

        if (response.data && response.data.success && response.data.location && response.data.location.pins) {
          const existingPins = response.data.location.pins.map(pin => ({
            lat: Number(pin.lat),
            lng: Number(pin.lng),
            address: pin.address || `Location at ${pin.lat}, ${pin.lng}`
          }));
          setPins(existingPins);
        }
      } catch (error) {
        console.error('Error fetching existing pins:', error);
        if (error.response?.status !== 404) {
          console.warn('Failed to fetch existing map pins:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchExistingPins();
    } else {
      setLoading(false);
    }
  }, [propertyId, propertyName]);

  // Use LocationIQ for reverse geocoding
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.d9ded81b098baab4433252bccb34a41e&lat=${lat}&lon=${lng}&format=json`
      );

      if (response.data && response.data.display_name) {
        return response.data.display_name;
      } else {
        return `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      }
    } catch (error) {
      console.error('LocationIQ geocoding error:', error);
      if (error.response?.status === 429) {
        console.warn('Rate limit exceeded for LocationIQ');
      }
      return `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  // Get current location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 15);
        }
        setGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = "Unable to get your current location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += " Please allow location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += " Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += " Location request timed out.";
            break;
          default:
            errorMessage += " An unknown error occurred.";
            break;
        }

        alert(errorMessage);
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Use LocationIQ for forward geocoding (search)
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=pk.d9ded81b098baab4433252bccb34a41e&q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
      );

      if (response.data && response.data.length > 0) {
        const place = response.data[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        const address = place.display_name;

        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 15);
        }

        setSearchQuery("");
      } else {
        alert("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error('Search error:', error);
      alert("Search failed. Please try again.");
    }
  };

  const handleSave = async () => {
    if (pins.length === 0) {
      alert("Please drop at least one pin");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        propertyId: propertyId ? propertyId.toString() : "6873e55c7f1fe83a7ecb6138",
        name: propertyName || "Unnamed Property",
        pins: pins.map(pin => ({
          lat: Number(pin.lat),
          lng: Number(pin.lng),
          address: String(pin.address)
        }))
      };

      const response = await mapAPI.addOrUpdateMap(payload);

      if (response.data && response.data.success) {
        alert("Multiple map locations saved successfully!");
      } else {
        throw new Error('Save operation failed');
      }
    } catch (err) {
      console.error('Save error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      alert("Failed to save locations: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => setPins([]);

  // Map click handler component
  function MapClickHandler({ onMapClick }) {
    useMapEvents({
      click: onMapClick,
    });
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading existing locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Set Property Locations</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Click anywhere on the map or use the search box to add multiple pins.
          Click on pins in the list below to remove them.
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#facc14] text-black px-6 py-3 rounded-lg  transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <FaSearch className="text-sm" />
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={handleGetCurrentLocation}
            disabled={gettingLocation}
            className="border border-gray-300 text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-base font-medium"
          >
            {gettingLocation ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            ) : (
              <FaCrosshairs className="text-lg" />
            )}
            {gettingLocation ? "Locating..." : "My Location"}
          </button>

          <button
            onClick={() => setMapType(mapType === "street" ? "satellite" : "street")}
            className="border border-gray-300 text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-base font-medium"
          >
            {mapType === "street" ? (
              <GrSatellite className="text-lg" />
            ) : (
              <FaStreetView className="text-lg" />
            )}
            {mapType === "street" ? "Satellite" : "Street"}
          </button>

          <button
            onClick={handleSave}
            disabled={saving || pins.length === 0}
            className="border border-gray-300 text-black px-4 py-3 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base font-medium"
          >
            <CiSaveDown1 className="text-lg   " />
            {saving ? "Saving..." : `Save (${pins.length})`}
          </button>

          <button
            onClick={handleClear}
            disabled={pins.length === 0}
            className="border border-gray-300 text-black px-4 py-3 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base font-medium"
          >
            <CiTrash className="text-lg" />
            Clear All
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="h-80 md:h-96 w-full">
          <MapContainer
            center={pins.length > 0 ? [pins[0].lat, pins[0].lng] : [17.3850, 78.4867]}
            zoom={pins.length > 0 ? 15 : 13}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              attribution={mapType === "satellite"
                ? '&copy; <a href="https://www.esri.com/">Esri</a>'
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }
              url={mapType === "satellite"
                ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            />

            <MapClickHandler
              onMapClick={async (e) => {
                const lat = e.latlng.lat;
                const lng = e.latlng.lng;

                const roundedLat = Number(lat.toFixed(6));
                const roundedLng = Number(lng.toFixed(6));

                const existingPinIndex = pins.findIndex(pin =>
                  Math.abs(pin.lat - roundedLat) < 0.00001 && Math.abs(pin.lng - roundedLng) < 0.00001
                );

                if (existingPinIndex !== -1) {
                  setPins(prev => prev.filter((_, index) => index !== existingPinIndex));
                  return;
                }

                const address = await getAddressFromCoordinates(lat, lng);

                setPins((prev) => [...prev, {
                  lat: roundedLat,
                  lng: roundedLng,
                  address
                }]);
              }}
            />

            {pins.map((p, idx) => (
              <Marker key={idx} position={[p.lat, p.lng]}>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <strong className="text-sm">{p.address}</strong>
                    <div className="text-xs text-gray-500 mt-1">
                      <div>Lat: {p.lat.toFixed(5)}</div>
                      <div>Lng: {p.lng.toFixed(5)}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Pins List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CiLocationOn className="text-[#1e3b8a]" />
            Pins Added: <span className="text-[#1e3b8a]">{pins.length}</span>
          </h3>

        </div>

        {pins.length === 0 ? (
          <div className="text-center py-8">
            <CiLocationOn className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No pins yet. Click on the map to add locations.</p>
          </div>
        ) : (
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {pins.map((p, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:bg-red-50 transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  setPins(prev => prev.filter((_, index) => index !== i));
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-[red-100] text-[#1e3b8a] p-1 rounded">
                        <CiLocationOn className="text-lg" />
                      </div>
                      <span className="text-xs font-medium text-[#1e3b8a] bg-red-50 px-2 py-1 rounded">
                        Pin {i + 1}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                      {p.address}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p><span className="font-medium">Latitude:</span> {p.lat.toFixed(6)}</p>
                      <p><span className="font-medium">Longitude:</span> {p.lng.toFixed(6)}</p>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full group-hover:bg-red-200 transition-colors">
                    <FaMinus className="text-lg" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                  <CiTrash className="text-lg" />
                  Click to remove this pin
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}