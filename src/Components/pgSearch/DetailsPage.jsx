// import { useParams } from "react-router-dom";
// import data from "./pgData.json/pgSearchpage/pgData.json";

// export default function DetailsPage() {
//   const { id } = useParams();
//   const pg = data.find((pg) => pg.id === parseInt(id));

//   return (
//     <div className=" w-full min-h-screen p-8 bg-gray-100   ">
//       <div className="flex bg-white rounded shadow p-6 w-3/5 justify-center">
//         <img src={pg.image} className="w-1/2 object-cover rounded" />
//         <div className="pl-6">
//           <h1 className="text-2xl font-bold">{pg.name}</h1>
//           <p>{pg.location}</p>
//           <p className="text-green-600">Rating: {pg.rating}</p>
//           <p className="text-red-600 text-lg mt-2">₹{pg.price}</p>
//           <p className="mt-4">{pg.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
