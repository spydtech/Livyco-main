import React, { useState } from "react";

// Stepper 
const Stepper = ({ step }) => {
  const steps = ["Basic Details", "Contact Information", "KYC Information"];
  return (
    <div className="flex justify-between mb-6 border-b">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`pb-2 cursor-pointer text-sm font-medium ${
            step === index + 1
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

// Basic Details 
const BasicDetails = ({ formData, handleChange, handleNext }) => {
  const handleValidation = () => {
    if (!formData.fullName || !formData.email || !formData.gender || !formData.dob) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  
  

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleValidation()) handleNext();
      }}
    >
      <div className="mb-4">
        <label className="block mb-1">Full Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <label className="block mb-1">Location Name*</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <div className="mb-4">
        <label className="block mb-1">Email ID*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Gender*</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              required
            /> Female
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-1">Date of Birth*</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded">
        Next
      </button>
    </form>
  );
};

// Contact Info 
const ContactInfo = ({ formData, handleChange, handleNext, handlePrev }) => {
  const handleValidation = () => {
    if (!formData.mobile || !formData.profession) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleValidation()) handleNext();
      }}
    >
      <div className="mb-4">
        <label className="block mb-1">Mobile Number*</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            name="whatsappUpdates"
            checked={formData.whatsappUpdates}
            onChange={handleChange}
          /> Get Updates on WhatsApp
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-1">I’m a*</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="profession"
              value="Professional"
              checked={formData.profession === "Professional"}
              onChange={handleChange}
              required
            /> Professional
          </label>
          <label>
            <input
              type="radio"
              name="profession"
              value="Student"
              checked={formData.profession === "Student"}
              onChange={handleChange}
              required
            /> Student
          </label>
        </div>
      </div>

      {formData.profession === "Student" && (
        <div className="mb-4">
          <label className="block mb-1">Institute Name</label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1">Guardian Name</label>
        <input
          type="text"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1">Guardian Contact Number</label>
        <input
          type="text"
          name="guardianContact"
          value={formData.guardianContact}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={handlePrev} className="bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button type="submit" className="bg-yellow-400 px-6 py-2 rounded">
          Next
        </button>
      </div>
    </form>
  );
};

// KYC Info 
const KYCInfo = ({ formData, handleChange, handlePrev, handleSubmit }) => {
  const handleValidation = () => {
    if (!formData.aadharNumber || !formData.aadharPhoto) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleValidation()) handleSubmit(e);
      }}
    >
      <div className="mb-4">
        <label className="block mb-1">Aadhar Card Number*</label>
        <input
          type="text"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1">Upload Aadhar Photo*</label>
        <input
          type="file"
          name="aadharPhoto"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={handlePrev} className="bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button type="submit" className="bg-yellow-400 px-6 py-2 rounded">
          Done
        </button>
      </div>
    </form>
  );
};

// Main Profile Creation 
const ProfileCreation = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    mobile: "",
    whatsappUpdates: false,
    profession: "",
    institute: "",
    guardianName: "",
    guardianContact: "",
    aadharNumber: "",
    aadharPhoto: null,
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submitted Data:", formData);
    alert("Profile Created Successfully ✅");
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl h-[600px] bg-white p-6 rounded-lg shadow-md">
        {/* Stepper */}
        <Stepper step={step} />

        {/* Steps */}
        {step === 1 && (
          <BasicDetails formData={formData} handleChange={handleChange} handleNext={handleNext} />
        )}
        {step === 2 && (
          <ContactInfo
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 3 && (
          <KYCInfo
            formData={formData}
            handleChange={handleChange}
            handlePrev={handlePrev}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCreation;
