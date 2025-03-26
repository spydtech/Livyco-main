import React, { useState, useEffect } from "react";

const PGForm = ({ nextStep }) => {
  const initialFormData = JSON.parse(localStorage.getItem("pgFormData")) || {
    description: "",
    gender: "",
    tenantType: "",
    foodIncluded: "",
    rules: [],
    otherRules: "",
    services: {
      washingMachine: "",
      warden: "",
      roomCleaning: "",
    },
    parking: "",
    amenities: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const availableRules = [
    "No Smoking",
    "No Drinking",
    "No Visitors",
    "No Pets",
  ];
  const availableAmenities = [
    "Food",
    "CCTV Camera",
    "Security",
    "Fire Safety",
    "Lift",
    "Solar Power",
  ];

  useEffect(() => {
    localStorage.setItem("pgFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (key, value) => {
    setFormData((prev) => {
      const list = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];
      return { ...prev, [key]: list };
    });
  };

  const handleSubmit = () => {
    alert("Form data saved!");
  };

  return (
    <div className="text-black min-h-screen p-6">
      <div className="max-w-3xl mx-auto p-6 rounded-lg">
        <label className="block text-gray-500 mb-2">Property Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-600"
          placeholder="Write with AI"
        />

        <div className="mt-4">
          <label className="block text-gray-500">PG available for*</label>
          <div className="flex gap-4 mt-2">
            {["Male", "Female", "Co Living"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-500">Preferred Tenant*</label>
          <select
            name="tenantType"
            value={formData.tenantType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-600 text-black"
          >
            <option value="">Select tenant type</option>
            <option value="Student">Student</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Not Specific">Not Specific</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-500">Food Included*</label>
          <div className="flex gap-4 mt-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="foodIncluded"
                  value={option}
                  checked={formData.foodIncluded === option}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-500">PG Rules</label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {availableRules.map((rule) => (
              <label key={rule} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.rules.includes(rule)}
                  onChange={() => toggleSelection("rules", rule)}
                  className="accent-yellow-500"
                />
                {rule}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-500">Specify any other rules</label>
          <textarea
            name="otherRules"
            value={formData.otherRules}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-600"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-500">PG Services</label>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {["washingMachine", "warden", "roomCleaning"].map((service) => (
              <div key={service}>
                <label className="block text-gray-500 capitalize">
                  {service.replace(/([A-Z])/g, " $1")}
                </label>
                <div className="flex gap-2 mt-1">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={service}
                        value={option}
                        checked={formData.services[service] === option}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            services: {
                              ...prev.services,
                              [service]: e.target.value,
                            },
                          }))
                        }
                        className="accent-yellow-500"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-500">Parking</label>
          <select
            name="parking"
            value={formData.parking}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-600 text-black"
          >
            <option value="">Select parking type</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-500">PG Amenities</label>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {availableAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => toggleSelection("amenities", amenity)}
                  className="accent-yellow-500"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            handleSubmit();
            nextStep();
          }}
          className="w-full bg-yellow-500 text-black font-bold py-3 mt-6 rounded-lg"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default PGForm;
