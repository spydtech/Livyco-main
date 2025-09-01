import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import { ArrowLeft } from 'lucide-react';
import Header from '../Header';

export default function PayRent() { 
    const navigate = useNavigate()
    const location = useLocation();
    const { name, date, sharing,image,amount } = location.state || {};// borrowed data
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const Amount={amount}

    const handleStarClick = (index) => {
        setRating(prev => (prev === index ? 0 : index));
    };

    const handleSubmit = () => {
        alert(`Submitted ${rating}-star review for ${name} (${amount})`);

    };

    const getSharingBadgeClass = (type) => {
        switch (type.toLowerCase()) {
            case 'co-living':
                return 'bg-[#FFEAD1] text-[#FF9E02]';
            case 'men':
                return 'bg-[#AFD1FF] text-[#0827B2]';
            case 'women':
                return 'bg-[#F8BDE9] text-[#E504AD]';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };


    return (
        <>   
        <Header />

            <div className='flex flex-col md:px-20 px-4 justify-center content-center py-20'>
            {/* Back Button */}
            <div className="flex items-center p-1">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 rounded"
                >
                    <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                    Booking History
                </button>
            </div>

            {/* Card List */}
            <div className="flex flex-col mt-6  ">
                <div className="flex flex-col md:flex-row border-2 rounded-2xl shadow-xl overflow-hidden gap-5">
                    <img

                        src={image}
                        alt="Building"
                        className="cursor-pointer w-full h-[320px] md:w-1/4 p-5 object-cover rounded-2xl  "
                    />

                    <div className="flex-1 p-4  flex flex-col justify-between ">
                        <div className='space-y-3'>
                            <div className='flex justify-between items-center'>
                                <p className="text-lg font-bold">{name}</p>
                                <p className={`text-sm px-3 py-1 rounded-full ${getSharingBadgeClass(sharing)}`}>
                                    {sharing}
                                </p>
                            </div>

                            <div className='flex items-center gap-5'>
                                <p className="text-lg font-semibold">Check-in Date -</p>
                                <p className="text-sm">{date}</p>
                            </div>
                            <p className="text-lg ">Drop a review</p>
                            {/* Star Rating */}
                            <div className="flex items-center mb-6 gap-2">

                                {[1, 2, 3, 4, 5].map((index) => (

                                    <Star
                                        key={index}
                                        size={22}
                                        className={`cursor-pointer transition 
              ${index <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}
            `}
                                        onClick={() => handleStarClick(index)}
                                        onMouseEnter={() => setHoverRating(index)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                            </div>
                            {/*comment */}
                            <div className="flex flex-col mt-4">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder=""
                                    rows={3}
                                    className="w-full rounded-lg border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0827B2]"
                                />
                            </div>
                            {/* Button */}
                            <div className="flex gap-5">
                                <button
                                    onClick={handleSubmit}
                                    className="w-1/2  text-[#0827B2] border border-[#0827B2] px-4 py-2 rounded-xl
  hover:bg-[#0827B2] hover:
  hover:transition hover:duration-100 hover:ease-in hover:text-white"
                                >
                                    Pay Rent
                                </button>
                                <button
                                    onClick={()=>navigate("/user/payment-history", { state: { amount, name, date, sharing, image } })}
                                    className="w-1/2  text-[#0827B2] border border-[#0827B2] px-4 py-2 rounded-xl
  hover:bg-[#0827B2] hover:
  hover:transition hover:duration-100 hover:ease-in hover:text-white"
                                >
                                    View Payment History
                                </button>
                            </div>



                        </div>

                    </div>
                </div>

            </div>
        </div>


</>
 


    );
}
