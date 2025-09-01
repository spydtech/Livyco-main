import React from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import Header from '../Header';
import { useState, useEffect } from 'react';

const Paymenthistory = () => {
    const navigate = useNavigate();
    
    const id = "xxxxxxxxxxxxxxxx"
     const location = useLocation();
    const { amount, name, date, sharing, image } = location.state || {};
// borrowed data

    return (
        <>
        <Header />
         <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4  rounded pt-24"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                        <span className="whitespace-nowrap">Transaction</span>
                    </button>
            <div className="flex flex-col md:px-20 px-4 w-full max-w-4xl justify-center mx-auto ">
                {/*back button */}
                <div className="flex items-center p-1">
                   
                </div>
                {/*card */}
                <div className=' p-3 rounded-lg shadow-lg mt-5'>
                    <div className="flex flex-col sm:flex-row justify-between  gap-6  ">
                        <div className="flex gap-5 flex-1 min-w-0">
                            <div className="bg-[#6A029A] text-white rounded-lg flex items-center justify-center aspect-square w-12 flex-shrink-0">
                                VS
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-sm text-gray-600 truncate">Paid to</p>
                                <p className="font-medium truncate">{name || "Sender's name"}</p>
                            </div>
                        </div>
                        <div className="flex cursor-pointer">
                            <div className="bg-[#0080001A] rounded-full w-11 h-11 flex items-center justify-center overflow-hidden">
                                <div className="text-[#008000] transform rotate-[130deg] scale-x-[1.7] scale-y-[1.1] flex items-center justify-center">
                                    <ArrowLeft strokeWidth={1} className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1 mt-2">
                        <p className="text-xl font-semibold">{amount != null ? amount : "00.0000"}</p>
                        <p className="text-sm text-gray-500">dd/mm/yyyy</p>
                        <p className="text-sm ">Transaction ID - {id}</p>
                        <div className="flex items-center">
                            <button className="bg-[#FEE123] px-8 py-2 rounded-lg text-sm font-medium mt-1">
                                Download Receipt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Paymenthistory
