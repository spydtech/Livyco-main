import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Rerum eos laboriosam maiores iste placeat. Magnam minima sunt reprehenderit dolores sequi. Beatae est velit vero?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna.",
  },
  {
    question: "Rerum eos laboriosam maiores iste placeat. Magnam minima sunt reprehenderit dolores sequi. Beatae est velit vero?",
    answer: "Suspendisse potenti. Ut fringilla tristique mauris, eu tincidunt purus. Nam eget lorem auctor, feugiat elit at, viverra libero.",
  },
  {
    question: "Rerum eos laboriosam maiores iste placeat. Magnam minima sunt reprehenderit dolores sequi. Beatae est velit vero?",
    answer: "Aenean imperdiet nunc at massa vestibulum, sit amet cursus lorem sagittis. Ut consectetur nulla in augue hendrerit pharetra.",
  },
  {
    question: "Rerum eos laboriosam maiores iste placeat. Magnam minima sunt reprehenderit dolores sequi. Beatae est velit vero?",
    answer: "Pellentesque ac bibendum orci. Fusce et quam sapien. Phasellus in dui id lectus sollicitudin fermentum sit amet nec neque.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl px-10 mx-auto py-12  bg-[#F8F8FF]">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">FAQ’s</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <span className="text-lg text-blue-700 font-medium">{faq.question}</span>
              {openIndex === index ? (
                <FiMinus className="text-blue-700 text-4xl" />
              ) : (
                <FiPlus className="text-blue-700 text-4xl" />
              )}
            </button>
            {openIndex === index && (
              <p className="text-gray-600 pb-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
