import React, { useRef } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reviewImage from "../../assets/user/review.png";

const testimonials = [
  {
    name: "Priyanka Das",
    profession: "Software Engineer",
    rating: 4.7,
    image: "/user-priyanka.jpg",
    review: (
      <>
        I'm new to this city and using this app to{" "}
        <strong className="text-white font-bold">book</strong> a hostel. It's
        really good!{" "}
        <span className="text-yellow-400 font-medium">
          I paid the rent through the website
        </span>
        , and I received the invoice within minutes via Email and WhatsApp.
        <br />
        <br />
        "The hostel staff is also very friendly, and the food, cleaning, and all
        amenities are available as mentioned in the app."
      </>
    ),
  },
  {
    name: "Rahul Sharma",
    profession: "Data Scientist",
    rating: 4.8,
    image: "/user-rahul.jpg",
    review: (
      <>
        I had a great experience using this app to find my new paying guest
        accommodation. The{" "}
        <span className="text-yellow-400 font-medium">booking process</span> was
        smooth, and I loved the variety of options available. The customer
        support team was also very helpful in answering my queries.
      </>
    ),
  },
  {
    name: "Anjali Verma",
    profession: "Graphic Designer",
    rating: 4.9,
    image: "/user-anjali.jpg",
    review: (
      <>
        This app made my search for a hostel so easy! The{" "}
        <strong className="text-white font-bold">user interface</strong> is
        intuitive, and I found exactly what I was looking for. The{" "}
        <span className="text-yellow-400 font-medium">reviews and ratings</span>{" "}
        helped me make an informed decision, and the booking confirmation was
        instant.
      </>
    ),
  },
];

const TestimonialCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="bg-blue-800 text-white py-5 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">
        Feedbacks From Our Users
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 -mt-20 md:-mt-32">

        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={reviewImage}
            alt="happy user"
            className="w-full max-w-[400px] object-cover -mt-4 md:-mt-20"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col mt-10 gap-6">

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start mt-10 mb-6">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-sm text-gray-200">Happy People</p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold">4.72</h3>
              <p className="text-sm text-gray-200">Overall rating</p>
              <div className="flex justify-center sm:justify-start mt-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
            </div>
          </div>

          {/* Carousel */}
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((item, index) => (
              <div key={index} className="mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-200">{item.profession}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 ml-auto flex items-center gap-1 bg-white px-2 py-0.5 rounded-full text-blue-800 text-sm font-bold">
                    {item.rating} <FaStar className="text-yellow-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-100 leading-relaxed">{item.review}</p>
              </div>
            ))}
          </Slider>

          {/* Arrows */}
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <button
              className="border border-[#FEE123] text-[#FEE123] w-14 h-10 rounded-3xl flex items-center justify-center hover:bg-white hover:text-blue-800 transition"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              &lt;
            </button>
            <button
              className="border border-[#FEE123] text-[#FEE123] w-14 h-10 rounded-3xl flex items-center justify-center hover:bg-white hover:text-blue-800 transition"
              onClick={() => sliderRef.current?.slickNext()}
            >
              &gt;
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
