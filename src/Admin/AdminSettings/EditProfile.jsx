import React from "react";

const EditProfile = () => {
    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow sm:p-8">
            <form>

                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-2 text-base font-semibold text-black">
                        Name
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="John Doe"
                    />
                </div>

                {/* Mobile Number */}
                <div className="mb-4">
                    <label className="block mb-2 text-base font-semibold text-black">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="xxxxxxxx98"
                    />
                </div>

                {/* Email 1*/}
                <div className="mb-4">
                    <label className="block mb-2 text-base font-semibold text-black">
                        E-mail
                    </label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="johndoe@gmail.com"
                    />
                </div>

                {/* Email 2*/}
                <div className="mb-4">
                    <label className="block mb-2 text-base font-semibold text-black">
                        E-mail
                    </label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="johndoe@gmail.com"
                    />
                </div>

                {/* Age & Sex in a row */}
                <div className="flex flex-col w-3/4 sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block mb-2 text-base font-semibold text-black">
                            Age
                        </label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="28"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-2 text-base font-semibold text-black">
                            Sex
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
                            defaultValue=""
                        >
                            <option value="" disabled className="text-gray-400">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                    </div>
                </div>

                {/* Admin ID */}
                <div className="mb-4">
                    <label className="block mb-2 text-base font-semibold text-black">
                        Admin ID
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="spyd123456"
                    />
                </div>

                {/* Company */}
                <div className="mb-6">
                    <label className="block mb-2 text-base font-semibold text-black">
                        Company
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Spy-d technologies"
                    />
                </div>

            </form>
        </div>
    );
};

export default EditProfile;
