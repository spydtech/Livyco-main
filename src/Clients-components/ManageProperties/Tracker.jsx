import { useState } from "react";
import PropertyRegistration from "./PropertyRegistration";
import AddMedia from "./AddMedia";
import RoomSelection from "./RoomSelection";
import PGForm from "./PGForm";
import TermsPost from "./TermsPost";
import HostelListing from "./HostelListing";

const steps = [
  "Enter Property & Registration Details",
  "Upload Documents",
  "Add Amenities & Features",
  "Set Pricing & Availability",
  "Review & Submit",
];

export default function Tracker() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mx-auto p-6  min-h-screen bg-[#f8f8ff] ">
      {/* Progress Tracker */}
      <div className="relative flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-1/5 relative"
          >
            {/* Connecting Line */}
            {index > 0 && (
              <div
                className={`absolute top-[19px]  -left-1/2 w-full h-[2px] ${
                  index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
                style={{ zIndex: 1 }}
              ></div>
            )}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border-4 ${
                index === currentStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-blue-600 bg-white"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full  ${
                  index === currentStep ? "bg-white" : "bg-blue-600"
                }`}
              ></div>
            </div>
            {/* <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-sm font-bold transition-all duration-300 ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div> */}
            <p
              className={`text-sm mt-2 ${
                index <= currentStep ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white p-6 rounded-lg shadow">
        {currentStep === 0 && <PropertyRegistration nextStep={nextStep} />}
        {currentStep === 1 && (
          <AddMedia nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 2 && (
          <RoomSelection nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 3 && (
          <PGForm nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 4 && (
          <HostelListing nextStep={nextStep} prevStep={prevStep} />
        )}
      </div>

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div> */}
    </div>
  );
}
