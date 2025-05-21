import React, { useState, useEffect } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from "axios";
import { auth } from "../../firebase/firebase"; // Adjust path accordingly
import { getIdToken } from "firebase/auth";



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
    latitude: "",
    longitude: "",
  });
 

   
 

  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);


  useEffect(() => {
    const savedData = localStorage.getItem("propertyData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'city', 'name', 'locality', 'street', 
      'registrationId', 'gstNo'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    setErrors(prev => ({ ...prev, location: "" }));

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      setFormData(prev => ({
        ...prev,
        latitude: latitude.toString(),
        longitude: longitude.toString()
      }));

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (response.data && response.data.address) {
        const { address } = response.data;
        setFormData(prev => ({
          ...prev,
          city: address.city || address.town || address.county || "",
          locality: address.suburb || address.village || address.neighbourhood || "",
          street: address.road || address.pedestrian || address.footway || ""
        }));
      }
    } catch (error) {
      console.error("Location error:", error);
      setErrors(prev => ({
        ...prev,
        location: "Failed to get location. Please enter manually."
      }));
    } finally {
      setLoadingLocation(false);
    }
  };

 const handleSubmit = async () => {
  if (!validateForm()) return;
  setSubmitLoading(true);
  setErrors({});

  try {
    const user = auth.currentUser;

    if (!user) {
      setErrors({ submit: "User not logged in." });
      setSubmitLoading(false);
      return;
    }

    const token = await getIdToken(user, true); // Force refresh optional
    const response = await axios.post(
      "http://localhost:5000/api/auth/properties/register",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      localStorage.setItem("propertyData", JSON.stringify(formData));
      nextStep();
    }
  } catch (error) {
    console.error("Error during submission:", error);
    setErrors({ submit: "Failed to submit. Please try again." });
  } finally {
    setSubmitLoading(false);
  }
};

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h2 className="text-lg font-semibold mb-6">
        Provide the property address, license number, and required registrations
        for verification.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "city", placeholder: "City*" },
          { name: "name", placeholder: "PG/Hostel Name*" },
          { name: "locality", placeholder: "Locality*" },
          { name: "street", placeholder: "Street/Area/Landmark*" },
        ].map((field) => (
          <div key={field.name}>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`w-full p-3 border rounded-md focus:ring-2 ${
                errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={fetchLocation}
          disabled={loadingLocation}
          className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          <FaLocationCrosshairs className="mr-2" />
          {loadingLocation ? "Detecting location..." : "Use Current Location"}
        </button>
        {errors.location && (
          <p className="text-sm text-red-500 mt-1">{errors.location}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {[
          { name: "registrationId", placeholder: "Registration ID*" },
          { name: "gstNo", placeholder: "GST No*" },
          { name: "cgstNo", placeholder: "CGST No" },
          { name: "sgstNo", placeholder: "SGST No" },
        ].map((field) => (
          <div key={field.name}>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`w-full p-3 border rounded-md focus:ring-2 ${
                errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              This will be private to you
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitLoading}
        className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
      >
        {submitLoading ? "Processing..." : "Save and Continue"}
      </button>
    </div>
  );
};

export default PropertyRegistration;