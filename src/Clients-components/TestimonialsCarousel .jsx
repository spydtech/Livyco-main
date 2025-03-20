import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import image from "../assets/client-main/testmonial-img1.png";

const testimonials = [
  {
    id: 1,
    name: "Sravanthi",
    profession: "College Lecturer",
    rating: 4,
    review:
      "I am unable to move my legs. Great app for finding accessible PG accommodations, with detailed listings and helpful filters for wheelchair users.",
    image: image, // Replace with actual image URL
  },
  {
    id: 2,
    name: "Sravanthi",
    profession: "College Lecturer",
    rating: 4,
    review:
      "I am unable to move my legs. Great app for finding accessible PG accommodations, with detailed listings and helpful filters for wheelchair users.",
    image: image, // Replace with actual image URL
  },
  {
    id: 3,
    name: "John Doe",
    profession: "Software Engineer",
    rating: 5,
    review:
      "This platform is amazing! It made my house hunting so much easier, and I found the perfect place!",
    image: image, // Replace with actual image URL
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="relative mb-10">
    <div className="bg-[#333333] text-white   rounded-bl-3xl w-full max-w-sm mx-auto  shadow-lg ">
      <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2  -top-0 w-32 h-32 rounded-full border-[12px] border-[#333333] bg-white ">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="mt-20 text-center p-14">
        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
        <p className="text-sm text-gray-400">{testimonial.profession}</p>
        <div className="flex justify-center mt-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={`text-yellow-400 ${
                  index < testimonial.rating ? "opacity-100" : "opacity-30"
                }`}
              >
                ★
              </span>
            ))}
        </div>
        <p className="mt-3 text-sm">{testimonial.review} <span className="text-blue-400 cursor-pointer">more</span></p>
      </div>
    </div>
    </div>
  );
};

const TestimonialsCarousel = () => {
  return (
    <div className="py-16 bg-white ">
      <h2 className="text-2xl font-bold text-center mb-10">Testimonials</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 1},
          1024: { slidesPerView: 1 },
        }}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-5xl h-[600px] "
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsCarousel;
