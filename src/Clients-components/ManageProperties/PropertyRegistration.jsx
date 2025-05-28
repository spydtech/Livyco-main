import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertyAPI, handleApiError } from "../PropertyController";
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
    latitude: "",
    longitude: "",
  });

  const [existingProperty, setExistingProperty] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProperty = async () => {
    try {
      const response = await propertyAPI.getProperty();
      if (response.data.success) {
        setExistingProperty(response.data.property);
        // Pre-fill form if property exists
        if (response.data.property) {
          setFormData({
            city: response.data.property.city || "",
            name: response.data.property.name || "",
            locality: response.data.property.locality || "",
            street: response.data.property.street || "",
            registrationId: response.data.property.registrationId || "",
            gstNo: response.data.property.gstNo || "",
            cgstNo: response.data.property.cgstNo || "",
            sgstNo: response.data.property.sgstNo || "",
            latitude: response.data.property.location?.coordinates[1]?.toString() || "",
            longitude: response.data.property.location?.coordinates[0]?.toString() || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  useEffect(() => {
    fetchProperty();
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

    if (formData.latitude || formData.longitude) {
      if (!formData.latitude || isNaN(formData.latitude)) {
        newErrors.latitude = "Invalid latitude";
      }
      if (!formData.longitude || isNaN(formData.longitude)) {
        newErrors.longitude = "Invalid longitude";
      }
    }

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

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (data && data.address) {
        const { address } = data;
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
      const submissionData = {
        city: formData.city,
        name: formData.name,
        locality: formData.locality,
        street: formData.street,
        registrationId: formData.registrationId,
        gstNo: formData.gstNo,
        cgstNo: formData.cgstNo,
        sgstNo: formData.sgstNo
      };

      if (formData.latitude && formData.longitude) {
        submissionData.location = {
          type: "Point",
          coordinates: [
            parseFloat(formData.longitude),
            parseFloat(formData.latitude)
          ]
        };
      }

      let response;
      if (existingProperty) {
        response = await propertyAPI.updateProperty(submissionData);
      } else {
        response = await propertyAPI.registerProperty(submissionData);
      }

      if (response.data.success) {
        localStorage.setItem("propertyData", JSON.stringify(formData));
        nextStep();
      }
    } catch (error) {
      const apiError = handleApiError(error);
      if (error.response?.status === 409) {
        setErrors({
          submit: "You already have a registered property. Updating instead."
        });
        await fetchProperty(); // Fetch the existing property
      } else {
        setErrors({
          submit: apiError.message || "Failed to register property"
        });
      }
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
          </div>
        ))}
      </div>

      {/* Hidden coordinate fields for debugging */}
      <div className="hidden">
        <input name="latitude" value={formData.latitude} readOnly />
        <input name="longitude" value={formData.longitude} readOnly />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitLoading}
        className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
      >
        {submitLoading ? "Processing..." : "Save and Continue"}
      </button>
      {errors.submit && (
        <p className="text-sm text-red-500 mt-2 text-center">{errors.submit}</p>
      )}
    </div>
  );
};

export default PropertyRegistration;