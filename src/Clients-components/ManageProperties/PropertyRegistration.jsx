import React, { useState, useEffect } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
const PropertyRegistration = ({ nextStep }) => {
  const [formData, setFormData] = useState({
    city: "",
    name: "",
    locality: "",
    street: "",
    registrationId: "",
    gstNo: "",
    cgstNo: "",
    sgstNo: "",
  });

  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("propertyData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("propertyData", JSON.stringify(formData));

    alert("Form data saved successfully!");
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);

        try {
          // Fetch address from OpenStreetMap API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data && data.address) {
            setFormData({
              ...formData,
              city: data.address.city || data.address.town || "",
              locality: data.address.suburb || data.address.village || "",
              street:
                data.address.road ||
                data.address.neighbourhood ||
                data.display_name ||
                "",
            });
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        alert("Unable to retrieve location. Please check your permissions.");
        console.error(error);
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="mx-auto p-6">
      <h2 className="text-lg font-semibold mb-6">
        Provide the property address, license number, and required registrations
        for verification.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "city", placeholder: "City*" },
          { name: "name", placeholder: "PG/Hostel Name *" },
          { name: "locality", placeholder: "Locality *" },
          { name: "street", placeholder: "Street/Area/Landmark *" },
        ].map((field) => (
          <div key={field.name}>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div
        className="flex items-center mt-6 cursor-pointer"
        onClick={fetchLocation}
      >
        <span className="mr-2 text-blue-500">
          <FaLocationCrosshairs />
        </span>
        <label className="text-green-700">
          {loadingLocation ? "Fetching location..." : "Use Current Location"}
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {[
          { name: "registrationId", placeholder: "Registration ID *" },
          { name: "gstNo", placeholder: "GST No *" },
          { name: "cgstNo", placeholder: "CGST No *" },
          { name: "sgstNo", placeholder: "SGST No *" },
        ].map((field) => (
          <div key={field.name}>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              This will be private to you
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          handleSubmit();
          nextStep();
        }}
        className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
      >
        Save and Continue
      </button>
    </div>
  );
};

export default PropertyRegistration;
