import React from "react";
import { FiEye } from "react-icons/fi";
import Image from "../../assets/user/home page/sector/image1.jpg";

const TeamMembers = () => {
  const members = [
    {
      id: "ID00000010",
      name: "John Doe",
      role: "Admin",
      email: "Johndoe@gmail.com",
      image: Image,
    },
    {
      id: "ID00000011",
      name: "Jane Doe",
      role: "Admin",
      email: "Janedoe@gmail.com",
      image: Image,
    },
    {
      id: "ID00000012",
      name: "Robert Smith",
      role: "Admin",
      email: "robertsmith@gmail.com",
      image: Image,
    },
    {
      id: "ID00000013",
      name: "Emily Johnson",
      role: "Admin",
      email: "emilyjohnson@gmail.com",
      image: Image,
    },
  ];

  return (
    <div className="w-full min-h-screen  p-6">
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full text-left border-collapse">
          <tbody>
            {members.map((member, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-[#F1F7FF]" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-4 px-6 flex items-center space-x-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {member.name}
                    </p>
                    <p className="text-xs text-black">{member.id}</p>
                  </div>
                </td>

                <td className="py-4 px-6 text-sm">
                  {member.role}
                </td>

                <td className="py-4 px-6 text-sm">
                  {member.email}
                </td>

                <td className="py-4 px-6 text-right">
                  <FiEye className="w-5 h-5 text-black cursor-pointer hover:text-black" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMembers;
