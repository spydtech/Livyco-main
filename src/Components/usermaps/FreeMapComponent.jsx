// components/FreeMapComponent.jsx
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  FaMapMarkerAlt,
  FaStreetView,
  FaSatellite,
  FaSearchLocation,
  FaExternalLinkAlt,
  FaDirections,
  FaGlobeAmericas,
  FaMapPin,
  FaCompass,
  FaFreeCodeCamp,
  FaCrosshairs,
  FaLocationArrow
} from 'react-icons/fa';
import {
  IoLocationSharp
} from 'react-icons/io5';
import {
  RiMapPinRangeFill
} from 'react-icons/ri';
import { GrSatellite } from "react-icons/gr";
import { CgScrollV } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function FreeMapComponent({ pins = [], propertyName = "" }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapType, setMapType] = useState("street");
  const tileLayerRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const currentLocationCircleRef = useRef(null);
  const hasInitializedRef = useRef(false);

  // Function to open Google Maps with the pin location
  const openInGoogleMaps = (pin) => {
    const { lat, lng, address } = pin;
    const location = address
      ? encodeURIComponent(address)
      : `${lat},${lng}`;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  // Function to open Google Maps with directions
  const getDirections = (pin) => {
    const { lat, lng, address } = pin;
    const location = address
      ? encodeURIComponent(address)
      : `${lat},${lng}`;

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = [latitude, longitude];

        setCurrentLocation(location);
        setIsLocating(false);

        // Move map to current location
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView(location, 15);

          // Add or update current location circle (no pin/marker)
          if (currentLocationCircleRef.current) {
            mapInstanceRef.current.removeLayer(currentLocationCircleRef.current);
          }

          // Use a circle instead of a marker to show approximate location
          currentLocationCircleRef.current = L.circle(location, {
            color: '#4285F4',
            fillColor: '#4285F4',
            fillOpacity: 0.2,
            radius: 50 // 50 meters radius
          }).addTo(mapInstanceRef.current);

          // Add a small dot in the center
          L.circleMarker(location, {
            color: '#4285F4',
            fillColor: '#4285F4',
            fillOpacity: 0.8,
            radius: 4
          }).addTo(mapInstanceRef.current);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);

        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Initialize map and handle pins in one effect
  useEffect(() => {
    if (!mapRef.current || hasInitializedRef.current) return;

    const initializeMap = () => {
      const defaultCenter = [17.3850, 78.4867];
      const defaultZoom = 10;

      let center = defaultCenter;
      let zoom = defaultZoom;

      // Calculate center based on pins if available
      if (pins.length > 0) {
        const lats = pins.map(p => p.lat);
        const lngs = pins.map(p => p.lng);
        center = [
          (Math.min(...lats) + Math.max(...lats)) / 2,
          (Math.min(...lngs) + Math.max(...lngs)) / 2
        ];
        zoom = pins.length === 1 ? 15 : 13;
      }

      const map = L.map(mapRef.current).setView(center, zoom);
      mapInstanceRef.current = map;

      // Define tile layers
      const tileLayers = {
        street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
          maxZoom: 19,
        })
      };

      // Add the current map type layer
      tileLayerRef.current = tileLayers[mapType];
      tileLayerRef.current.addTo(map);

      // Add markers for each pin
      pins.forEach((pin, index) => {
        const marker = L.marker([pin.lat, pin.lng])
          .addTo(map)
          .bindPopup(`
            <div class="p-2 min-w-[200px]">
              <h3 class="font-semibold text-lg mb-1">${propertyName || 'Location'}</h3>
              <p class="text-sm text-gray-700 mb-2">${pin.address || `Location ${index + 1}`}</p>
              <div class="text-xs text-gray-500">
                <p><strong>Lat:</strong> ${pin.lat.toFixed(6)}</p>
                <p><strong>Lng:</strong> ${pin.lng.toFixed(6)}</p>
              </div>
              ${pins.length > 1 ? `<p class="text-xs text-blue-600 mt-1">Pin ${index + 1} of ${pins.length}</p>` : ''}
              
            </div>
          `);

        // Add unique global function for each marker
        window[`openGoogleMaps_${index}`] = () => openInGoogleMaps(pin);

        markersRef.current.push(marker);

        // Add click event to open popup on marker click
        marker.on('click', function () {
          this.openPopup();
        });
      });

      // Fit bounds to show all pins if there are multiple pins
      if (pins.length > 1 && markersRef.current.length > 0) {
        // Use setTimeout to ensure map is fully rendered
        setTimeout(() => {
          const group = new L.featureGroup(markersRef.current);
          const bounds = group.getBounds();

          if (bounds.isValid()) {
            map.fitBounds(bounds.pad(0.1));
          }
        }, 100);
      } else if (pins.length === 1) {
        // For single pin, ensure proper zoom
        setTimeout(() => {
          map.setView([pins[0].lat, pins[0].lng], 15);
        }, 100);
      }

      setIsMapReady(true);
      hasInitializedRef.current = true;
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        hasInitializedRef.current = false;
        setIsMapReady(false);
      }
    };
  }, []); // Empty dependency array - initialize once

  // Update pins when they change
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady || !pins.length) return;

    const map = mapInstanceRef.current;

    // Clear existing pins markers only (keep current location circle)
    markersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for each pin
    pins.forEach((pin, index) => {
      const marker = L.marker([pin.lat, pin.lng])
        .addTo(map)
        .bindPopup(`
          <div class="p-2 min-w-[200px]">
            <h3 class="font-semibold text-lg mb-1">${propertyName || 'Location'}</h3>
            <p class="text-sm text-gray-700 mb-2">${pin.address || `Location ${index + 1}`}</p>
            <div class="text-xs text-gray-500">
              <p><strong>Lat:</strong> ${pin.lat.toFixed(6)}</p>
              <p><strong>Lng:</strong> ${pin.lng.toFixed(6)}</p>
            </div>
            ${pins.length > 1 ? `<p class="text-xs text-blue-600 mt-1">Pin ${index + 1} of ${pins.length}</p>` : ''}
            <div class="mt-3 flex gap-2">
              <button onclick="window.openGoogleMaps_${index}" 
                class="flex-1 bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                
              </button>
            </div>
          </div>
        `);

      // Add unique global function for each marker
      window[`openGoogleMaps_${index}`] = () => openInGoogleMaps(pin);

      markersRef.current.push(marker);

      // Add click event to open popup on marker click
      marker.on('click', function () {
        this.openPopup();
      });
    });

    // Update map view based on pins
    if (pins.length > 0) {
      setTimeout(() => {
        if (pins.length === 1) {
          // Single pin - center on it with good zoom
          map.setView([pins[0].lat, pins[0].lng], 15);
        } else if (pins.length > 1 && markersRef.current.length > 0) {
          // Multiple pins - fit bounds
          const group = new L.featureGroup(markersRef.current);
          const bounds = group.getBounds();

          if (bounds.isValid()) {
            map.fitBounds(bounds.pad(0.1));
          }
        }
      }, 150);
    }

    // Cleanup function for global functions
    return () => {
      pins.forEach((_, index) => {
        if (window[`openGoogleMaps_${index}`]) {
          delete window[`openGoogleMaps_${index}`];
        }
      });
    };
  }, [pins, propertyName, isMapReady]);

  // Handle map type changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current || !isMapReady) return;

    // Remove current tile layer
    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    // Add new tile layer
    const tileLayers = {
      street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        maxZoom: 19,
      })
    };

    tileLayerRef.current = tileLayers[mapType];
    tileLayerRef.current.addTo(mapInstanceRef.current);
  }, [mapType, isMapReady]);

  // Function to switch map type
  const switchMapType = () => {
    setMapType(prev => prev === "street" ? "satellite" : "street");
  };

  // Function to focus on a specific pin
  const focusOnPin = (pin, index) => {
    if (mapInstanceRef.current && markersRef.current[index]) {
      mapInstanceRef.current.setView([pin.lat, pin.lng], 16);
      markersRef.current[index].openPopup();
    }
  };

  // Function to handle map container resize
  const handleMapResize = () => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();

        // Re-fit bounds if we have pins
        if (pins.length > 0 && markersRef.current.length > 0) {
          if (pins.length === 1) {
            mapInstanceRef.current.setView([pins[0].lat, pins[0].lng], 15);
          } else {
            const group = new L.featureGroup(markersRef.current);
            const bounds = group.getBounds();
            if (bounds.isValid()) {
              mapInstanceRef.current.fitBounds(bounds.pad(0.1));
            }
          }
        }
      }, 300);
    }
  };

  if (!pins.length) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <FaMapMarkerAlt className="text-4xl mb-2 text-gray-400 mx-auto" />
          <p className="text-gray-500">No location data available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border border-gray-300 z-0"
        onLoad={handleMapResize} // Handle when map container loads
      />

      {/* Map Controls */}
      <div className="mt-3 flex justify-center gap-2 flex-wrap">
        <button
          onClick={switchMapType}
          className="bg-[#144fb5] text-white px-4 py-2 rounded text-sm hover:bg-[#b0d1ff] hover:text-black transition-colors flex items-center gap-2"
        >
          {mapType === "street" ? (
            <>
              <GrSatellite className="text-lg" />
              Satellite View
            </>
          ) : (
            <>
              <FaStreetView className="text-lg" />
              Street View
            </>
          )}
        </button>

        {/* <button
          onClick={getCurrentLocation}
          disabled={isLocating}
          className="bg-[#facc14] text-black px-4 py-2 rounded text-sm hover:bg-yellow-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLocating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Locating...
            </>
          ) : (
            <>
              <FaCrosshairs className="text-sm" />
              My Location
            </>
          )}
        </button> */}

        {/* <button
          onClick={handleMapResize}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <FaSearchLocation className="text-sm" />
          Refit Map
        </button> */}
      </div>

      {/* Map Controls Info */}
      <div className="mt-2 text-sm text-black text-center flex items-center justify-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <FaCompass className="text-sm" />
          <span>Drag to move</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <CgScrollV className="text-sm" />
          <span>Scroll to zoom</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <CiLocationOn className="text-sm" />
          <span>Click pins for details</span>
        </div>
        {/* {currentLocation && (
          <>
            <span>•</span>
            <div className="flex items-center gap-1 text-green-600">
              <FaLocationArrow className="text-xs" />
              <span>Your location active</span>
            </div>
          </>
        )} */}
      </div>

      {/* Location Details */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <CiLocationOn className="text-black" />
          Location Details
        </h4>
        <div className="space-y-3">
          {pins.map((pin, index) => (
            <div
              key={index}
              className="text-sm text-black p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
              onClick={() => focusOnPin(pin, index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100  text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <CiLocationOn />
                      Pin {index + 1}
                    </span>
                  </div>
                  <p className="font-medium text-gray-800">{pin.address}</p>
                </div>
              </div>

              {/* Google Maps Actions */}
              <div className="mt-3 flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getDirections(pin);
                  }}
                  className="bg-[#facc14] text-black text-xs py-2 px-3 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                >
                  <FaDirections />
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Current Location Info */}
        {currentLocation && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <FaLocationArrow className="text-blue-500" />
              <h5 className="font-semibold text-blue-800">Your Current Location</h5>
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <p>Latitude: {currentLocation[0].toFixed(6)}</p>
              <p>Longitude: {currentLocation[1].toFixed(6)}</p>
              <p className="text-green-600 font-medium">✓ Location detected (shown as blue circle on map)</p>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}