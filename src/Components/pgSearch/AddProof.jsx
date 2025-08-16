import { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import bgimage from '../../assets/user/pgsearch/image (5).png'; // Adjust the path as necessary

export default function AddProof() {
    const [select, setselect] = useState("self");
    const [numb, setnumb] = useState(0);
    const [selectedGender, setSelectedGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [agree, setAgree] = useState(false);

    const handleleftclick = () => setnumb((prev) => prev - 1);
    const handlerightclick = () => setnumb((prev) => prev + 1);

    const isMobileValid = mobile.length === 10;

    return (
        <div 
            className="w-full min-h-screen bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${bgimage}')` }}
        >
            {/* Header */}
            <div className="bg-[#FFDC82] flex items-center p-1 ">
                <button className="flex items-center gap-2 px-4 py-2 rounded">
                    <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                    Label
                </button>
            </div>

            {/* Centered Form */}
            <div className="flex justify-center items-start py-10 px-10">
                <div className="w-1/3 bg-white px-5 rounded-lg shadow-md flex flex-col gap-3 py-3">

                    {/* Self / Others Buttons */}
                    <div className="flex gap-6 justify-center">
                        <button
                            onClick={() => setselect("self")}
                            className={`px-4 py-3 w-2/5 border border-black rounded-md text-sm sm:text-base ${select === "self" ? "bg-[#0827B2] text-white" : "bg-white text-black"}`}
                        >
                            Self
                        </button>
                        <button
                            onClick={() => setselect("others")}
                            className={`px-4 py-3 w-2/5 border border-black rounded-md text-sm sm:text-base ${select === "others" ? "bg-[#0827B2] text-white" : "bg-white text-black"}`}
                        >
                            Others
                        </button>
                    </div>

                    {/* Counter */}
                    <div className="flex justify-between items-center w-full px-6">
                        <button
                            className={`text-xl -rotate-90 ${numb <= 0 ? 'text-gray-400' : 'text-black'}`}
                            onClick={handleleftclick}
                            disabled={numb <= 0}
                        >
                            ▲
                        </button>
                        <div className="bg-[#FFDC82] flex justify-center items-center text-black w-7 h-7 rounded-full font-semibold">
                            {numb}
                        </div>
                        <button
                            className={`text-xl rotate-90 ${numb >= 3 ? 'text-gray-400' : 'text-black'}`}
                            onClick={handlerightclick}
                            disabled={numb >= 3}
                        >
                            ▲
                        </button>
                    </div>

                    {/* Name / Age / Gender */}
                    <div className="px-4 flex flex-col gap-2">
                        <label className="text-gray-700">Name</label>
                        <div className="flex flex-wrap gap-2">
                            <input type="text" placeholder="Enter name" className="flex-1 border border-gray-300 rounded-md px-4 py-2 min-w-[150px]" />
                            <input type="text" placeholder="Age" className="w-20 border border-gray-300 rounded-md px-3 py-2" />
                            <div className="flex flex-col items-center">
                                <div className="text-sm mb-1">Gender</div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setSelectedGender("male")}
                                        className={`border rounded-md p-1 transition ${selectedGender === "male" ? "bg-[#0827B2] text-white shadow-md" : "bg-white"}`}
                                    >
                                        <img
                                            src="/src/assets/images/male.png"
                                            alt="Male"
                                            className={`w-6 h-6 transition duration-200 ${selectedGender === "male" ? "invert brightness-0" : ""}`}
                                        />
                                    </button>
                                    <button
                                        onClick={() => setSelectedGender("female")}
                                        className={`border rounded-md p-1 transition ${selectedGender === "female" ? "bg-[#0827B2] text-white shadow-md" : "bg-white"}`}
                                    >
                                        <img
                                            src="/src/assets/images/female.png"
                                            alt="Female"
                                            className={`w-6 h-6 transition duration-200 ${selectedGender === "female" ? "invert brightness-0" : ""}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="px-4 flex flex-col gap-1 relative">
                        <label className="text-gray-700">Mobile Number*</label>
                        <input
                            type="text"
                            maxLength={10}
                            value={mobile}
                            onChange={(e) => {
                                setMobile(e.target.value.replace(/\D/g, ""));
                            }}
                            className={`border px-4 py-2 w-full rounded-md focus:outline-none`}
                        />
                        {!isMobileValid && mobile.length > 0 && (
                            <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit number</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="px-4 flex flex-col gap-1">
                        <label className="text-gray-700">Email</label>
                        <input type="email" placeholder="Enter E-mail" className="border border-gray-300 rounded-md px-4 py-2 w-full" />
                    </div>

                    {/* ID Proof */}
                    <div className="px-4 flex flex-col gap-2">
                        <label className="text-gray-700">ID Proof</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <select className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 w-full cursor-pointer" defaultValue="">
                                <option value="" disabled>Select id proof</option>
                                <option value="aadhar">Aadhar Card</option>
                                <option value="pan">PAN Card</option>
                                <option value="passport">Passport</option>
                                <option value="voter">Voter ID</option>
                                <option value="license">Driving License</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700">ID Proof Upload</label>
                            <div className="flex flex-col sm:flex-row w-full relative">
                                <div className="relative w-full sm:w-2/3">
                                    <input type="file" id="fileInput" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" />
                                    <div className="border border-gray-300 cursor-pointer rounded-l-md px-4 py-2 text-sm text-gray-700 h-full flex items-center">
                                        Click here to upload ID
                                    </div>
                                </div>
                                <button className="bg-[#0827B2] text-white px-6 py-2 rounded-r-md w-full sm:w-1/3 z-0">
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Purpose */}
                    <div className="px-4 flex flex-col gap-1">
                        <label className="text-gray-700">Purpose of visit</label>
                        <input type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Enter Purpose Of Visit" />
                    </div>

                    {/* Checkbox */}
                    <div className="px-4 flex items-center justify-center gap-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <label className="text-sm text-gray-700">
                            Save details for future use
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="px-4">
                        <button
                            disabled={!isMobileValid || !agree}
                            className={`w-full py-3 rounded-md text-white transition ${
                                isMobileValid && agree
                                    ? "bg-[#0827B2]"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            ADD NOW
                        </button>
                    </div>

                    {/* Note */}
                    <div className="px-4 text-center text-sm text-gray-600">
                        ID is mandatory during check-in
                    </div>
                </div>
            </div>
        </div>
    );
}
