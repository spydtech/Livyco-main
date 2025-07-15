// import { useState, useEffect } from "react";

// export default function AddMedia({ nextStep }) {
//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [showVideoSection, setShowVideoSection] = useState(false);

//   useEffect(() => {
//     const storedImages = JSON.parse(localStorage.getItem("images")) || [];
//     const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
//     setImages(storedImages);
//     setVideos(storedVideos);
//   }, []);

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const newImages = [
//       ...images,
//       ...files.map((file) => URL.createObjectURL(file)),
//     ];
//     setImages(newImages);
//     localStorage.setItem("images", JSON.stringify(newImages));
//   };

//   const handleVideoUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const newVideos = [
//       ...videos,
//       ...files.map((file) => URL.createObjectURL(file)),
//     ];
//     setVideos(newVideos);
//     localStorage.setItem("videos", JSON.stringify(newVideos));
//   };

//   const handleContinue = () => {
//     setShowVideoSection(true);
//   };

//   return (
//     <div className="flex flex-col items-center p-4 bg-white mx-auto w-full max-w-2xl">
//       {!showVideoSection ? (
//         <>
//           <div className="w-full grid grid-cols-3 gap-2 p-4 bg-gray-300 rounded-lg min-h-[200px]">
//             {images.length === 0 ? (
//               <div className="col-span-3 flex items-center justify-center h-48">
//                 <p className="text-gray-500">No images uploaded</p>
//               </div>
//             ) : (
//               images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt="Uploaded"
//                   className="w-full h-32 object-cover rounded"
//                 />
//               ))
//             )}
//           </div>
//           <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer">
//             Add Photos
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageUpload}
//             />
//           </label>
//           <button
//             className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full"
//             onClick={handleContinue}
//           >
//             Continue
//           </button>
//         </>
//       ) : (
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full grid grid-cols-3 gap-2 p-4 bg-gray-300 rounded-lg min-h-[200px]">
//             {videos.length === 0 ? (
//               <div className="col-span-3 flex items-center justify-center h-48">
//                 <p className="text-gray-500">No videos uploaded</p>
//               </div>
//             ) : (
//               videos.map((video, index) => (
//                 <video
//                   key={index}
//                   src={video}
//                   controls
//                   className="w-full h-32 object-cover rounded"
//                 />
//               ))
//             )}
//           </div>
//           <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer">
//             Add Videos
//             <input
//               type="file"
//               multiple
//               accept="video/*"
//               className="hidden"
//               onChange={handleVideoUpload}
//             />
//           </label>
//           <button
//             onClick={nextStep}
//             className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full"
//           >
//             Finish
//           </button>
//           <button className="absolute top-4 right-4 text-gray-500">SKIP</button>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { mediaAPI, handleApiError } from "../PropertyController";

// export default function AddMedia({ nextStep, prevStep, propertyId, isEditMode }) {
//   const [media, setMedia] = useState({
//     images: [],
//     videos: []
//   });
//   const [showVideoSection, setShowVideoSection] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [editing, setEditing] = useState(null); // { type: 'image'|'video', index: number }
//   const [error, setError] = useState(null);
//   const [editTitle, setEditTitle] = useState("");

//   useEffect(() => {
//     const fetchMedia = async () => {
//       try {
//         if (propertyId) {
//           const response = await mediaAPI.getMedia(propertyId);
//           if (response.data.success) {
//             setMedia({
//               images: response.data.media?.images || [],
//               videos: response.data.media?.videos || []
//             });
//           }
//         } else {
//           const storedImages = JSON.parse(localStorage.getItem("images")) || [];
//           const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
//           setMedia({
//             images: storedImages,
//             videos: storedVideos
//           });
//         }
//       } catch (err) {
//         setError("Failed to load media");
//         console.error(err);
//       }
//     };

//     fetchMedia();
//   }, [propertyId]);

//   const handleUpload = async (files, type) => {
//     if (files.length === 0) return;

//     setUploading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       files.forEach(file => formData.append('files', file));

//       const response = await mediaAPI.uploadMedia(formData);
//       const newMedia = response.data.media?.[type === 'image' ? 'images' : 'videos'] || [];

//       setMedia(prev => ({
//         ...prev,
//         [type === 'image' ? 'images' : 'videos']: [
//           ...prev[type === 'image' ? 'images' : 'videos'],
//           ...newMedia
//         ]
//       }));

//       if (!propertyId) {
//         localStorage.setItem(
//           type === 'image' ? 'images' : 'videos',
//           JSON.stringify([...media[type === 'image' ? 'images' : 'videos'], ...newMedia])
//         );
//       }
//     } catch (error) {
//       setError(handleApiError(error).message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async (type, index, id) => {
//     if (deleting) return;
//     setDeleting(true);
    
//     try {
//       if (propertyId && id) {
//         await mediaAPI.deleteMediaItem(type, id);
//       }
      
//       setMedia(prev => {
//         const updated = { ...prev };
//         updated[type === 'image' ? 'images' : 'videos'].splice(index, 1);
        
//         if (!propertyId) {
//           localStorage.setItem(
//             type === 'image' ? 'images' : 'videos',
//             JSON.stringify(updated[type === 'image' ? 'images' : 'videos'])
//           );
//         }
        
//         return updated;
//       });
//     } catch (error) {
//       setError(handleApiError(error).message);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleEdit = (type, index) => {
//     const item = media[type === 'image' ? 'images' : 'videos'][index];
//     setEditing({ type, index });
//     setEditTitle(item.title || "");
//   };

//   const handleSaveEdit = async () => {
//     if (!editing) return;
    
//     setEditing(true);
//     const { type, index } = editing;
    
//     try {
//       const updatedItem = { 
//         ...media[type === 'image' ? 'images' : 'videos'][index],
//         title: editTitle
//       };

//       if (propertyId && updatedItem._id) {
//         await mediaAPI.editMediaItem(type, updatedItem._id, { title: editTitle });
//       }

//       setMedia(prev => {
//         const updated = { ...prev };
//         updated[type === 'image' ? 'images' : 'videos'][index] = updatedItem;
        
//         if (!propertyId) {
//           localStorage.setItem(
//             type === 'image' ? 'images' : 'videos',
//             JSON.stringify(updated[type === 'image' ? 'images' : 'videos'])
//           );
//         }
        
//         return updated;
//       });

//       setEditing(null);
//       setEditTitle("");
//     } catch (error) {
//       setError(handleApiError(error).message);
//     } finally {
//       setEditing(false);
//     }
//   };

//   const renderMediaItem = (item, type, index) => {
//     const isImage = type === 'image';
//     const url = item.url || item;

//     if (editing?.type === type && editing?.index === index) {
//       return (
//         <div className="relative border-2 border-yellow-400 rounded p-2">
//           {isImage ? (
//             <img src={url} alt="Edit" className="w-full h-32 object-cover" />
//           ) : (
//             <video src={url} controls className="w-full h-32 object-cover" />
//           )}
//           <input
//             type="text"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             placeholder="Enter title"
//             className="w-full mt-2 p-1 border rounded"
//           />
//           <div className="flex justify-between mt-2">
//             <button
//               onClick={handleSaveEdit}
//               className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditing(null)}
//               className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="relative group">
//         {isImage ? (
//           <img src={url} alt="Media" className="w-full h-32 object-cover rounded" />
//         ) : (
//           <video src={url} controls className="w-full h-32 object-cover rounded" />
//         )}
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <div className="flex space-x-2">
//             <button
//               onClick={() => handleEdit(type, index)}
//               className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
//               title="Edit"
//             >
//               ✏️
//             </button>
//             <button
//               onClick={() => handleDelete(type, index, item._id || item.public_id)}
//               className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
//               title="Delete"
//               disabled={deleting}
//             >
//               {deleting ? "..." : "🗑️"}
//             </button>
//           </div>
//         </div>
//         {item.title && (
//           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
//             {item.title}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col items-center p-4 bg-white mx-auto w-full max-w-2xl">
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {!showVideoSection ? (
//         <>
//           <h2 className="text-xl font-bold mb-4">Property Images</h2>
//           <div className="w-full grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg min-h-[200px]">
//             {media.images.length === 0 ? (
//               <div className="col-span-3 flex items-center justify-center h-48">
//                 <p className="text-gray-500">
//                   {uploading ? "Uploading..." : "No images uploaded"}
//                 </p>
//               </div>
//             ) : (
//               media.images.map((image, index) => (
//                 <div key={index}>
//                   {renderMediaItem(image, 'image', index)}
//                 </div>
//               ))
//             )}
//           </div>
//           <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition disabled:opacity-50">
//             {uploading ? "Uploading..." : "Add Photos"}
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => handleUpload(Array.from(e.target.files), 'image')}
//               disabled={uploading}
//             />
//           </label>
//           <button
//             className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full hover:bg-yellow-500 transition disabled:opacity-50"
//             onClick={() => setShowVideoSection(true)}
//             disabled={uploading || media.images.length === 0}
//           >
//             Continue to Videos
//           </button>
//         </>
//       ) : (
//         <div className="w-full flex flex-col items-center">
//           <h2 className="text-xl font-bold mb-4">Property Videos</h2>
//           <div className="w-full grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg min-h-[200px]">
//             {media.videos.length === 0 ? (
//               <div className="col-span-3 flex items-center justify-center h-48">
//                 <p className="text-gray-500">
//                   {uploading ? "Uploading..." : "No videos uploaded"}
//                 </p>
//               </div>
//             ) : (
//               media.videos.map((video, index) => (
//                 <div key={index}>
//                   {renderMediaItem(video, 'video', index)}
//                 </div>
//               ))
//             )}
//           </div>
//           <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition disabled:opacity-50">
//             {uploading ? "Uploading..." : "Add Videos"}
//             <input
//               type="file"
//               multiple
//               accept="video/*"
//               className="hidden"
//               onChange={(e) => handleUpload(Array.from(e.target.files), 'video')}
//               disabled={uploading}
//             />
//           </label>
//           <div className="flex gap-4 w-full mt-4">
//             <button
//               onClick={() => setShowVideoSection(false)}
//               className="flex-1 bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
//             >
//               Back to Images
//             </button>
//             <button
//               onClick={nextStep}
//               className="flex-1 bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-500 transition disabled:opacity-50"
//               disabled={uploading}
//             >
//               Finish
//             </button>
//           </div>
//           <button 
//             className="mt-2 text-gray-500 hover:text-gray-700"
//             onClick={nextStep}
//           >
//             Skip Videos
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// AddMedia.jsx

// import { useState, useEffect } from "react";
// import { mediaAPI, handleApiError } from "../PropertyController";

// export default function AddMedia({ nextStep, prevStep, propertyId, isEditMode }) {
//   const [media, setMedia] = useState({ images: [], videos: [] });
//   const [showVideoSection, setShowVideoSection] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [error, setError] = useState(null);
//   const [editTitle, setEditTitle] = useState("");

//   useEffect(() => {
//     const fetchMedia = async () => {
//       try {
//         if (propertyId) {
//           const response = await mediaAPI.getMedia(propertyId);
//           if (response.data.success) {
//             setMedia({
//               images: response.data.media?.images || [],
//               videos: response.data.media?.videos || []
//             });
//           }
//         } else {
//           const storedImages = JSON.parse(localStorage.getItem("images")) || [];
//           const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
//           setMedia({ images: storedImages, videos: storedVideos });
//         }
//       } catch (err) {
//         setError("Failed to load media");
//         console.error(err);
//       }
//     };

//     fetchMedia();
//   }, [propertyId, editing]);

//  const handleUpload = async (files, type) => {
//   if (files.length === 0) return;
//   setUploading(true);
//   setError(null);
//   try {
//     const formData = new FormData();

//     // ✅ Add propertyId to the FormData
//     if (propertyId) {
//       formData.append('propertyId', propertyId);
//     } else {
//       throw new Error("propertyId is missing.");
//     }

//     // ✅ Append files
//     files.forEach(file => formData.append('files', file));

//     const response = await mediaAPI.uploadMedia(formData);

//     const newMedia = response.data.media?.[type === 'image' ? 'images' : 'videos'] || [];

//     setMedia(prev => ({
//       ...prev,
//       [type === 'image' ? 'images' : 'videos']: [
//         ...prev[type === 'image' ? 'images' : 'videos'],
//         ...newMedia
//       ]
//     }));

//     if (!propertyId) {
//       localStorage.setItem(
//         type === 'image' ? 'images' : 'videos',
//         JSON.stringify([...media[type === 'image' ? 'images' : 'videos'], ...newMedia])
//       );
//     }
//   } catch (error) {
//     setError(handleApiError(error).message);
//   } finally {
//     setUploading(false);
//   }
// };


//   const handleDelete = async (type, index, id) => {
//     if (deleting) return;
//     setDeleting(true);
//     try {
//       if (propertyId && id && id.length > 10) {
//         try {
//           await mediaAPI.deleteMediaItem(type, id);
//         } catch (err) {
//           if (err.response?.status !== 404) throw err;
//         }
//       }
//       setMedia(prev => {
//         const updated = { ...prev };
//         updated[type === 'image' ? 'images' : 'videos'].splice(index, 1);
//         if (!propertyId) {
//           localStorage.setItem(
//             type === 'image' ? 'images' : 'videos',
//             JSON.stringify(updated[type === 'image' ? 'images' : 'videos'])
//           );
//         }
//         return updated;
//       });
//     } catch (error) {
//       setError(handleApiError(error).message);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleEdit = (type, index) => {
//     const item = media[type === 'image' ? 'images' : 'videos'][index];
//     setEditing({ type, index });
//     setEditTitle(item.title || "");
//   };

//   const handleSaveEdit = async () => {
//   if (!editing) return;
//   const { type, index } = editing;
//   const updatedItem = {
//     ...media[type === 'image' ? 'images' : 'videos'][index],
//     title: editTitle
//   };

//   try {
//     if (propertyId && updatedItem._id) {
//       await mediaAPI.editMediaItem(type, updatedItem._id, { title: editTitle });
//     }

//     // 🟢 Update the media in state directly (no need to wait for refetch)
//     setMedia(prev => {
//       const updated = { ...prev };
//       const arr = [...updated[type === 'image' ? 'images' : 'videos']];
//       arr[index] = updatedItem;
//       updated[type === 'image' ? 'images' : 'videos'] = arr;
//       if (!propertyId) {
//         localStorage.setItem(
//           type === 'image' ? 'images' : 'videos',
//           JSON.stringify(arr)
//         );
//       }
//       return updated;
//     });

//     setEditing(null);
//     setEditTitle("");
//   } catch (error) {
//     setError(handleApiError(error).message);
//   }
// };


//   const renderMediaItem = (item, type, index) => {
//     const isImage = type === 'image';
//     const url = item.url || item;
//     if (editing?.type === type && editing?.index === index) {
//       return (
//         <div className="relative border-2 border-yellow-400 rounded p-2">
//           {isImage ? (
//             <img src={url} alt="Edit" className="w-full h-32 object-cover" />
//           ) : (
//             <video src={url} controls className="w-full h-32 object-cover" />
//           )}
//           <input
//             type="text"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             placeholder="Enter title"
//             className="w-full mt-2 p-1 border rounded"
//           />
//           <div className="flex justify-between mt-2">
//             <button
//               onClick={handleSaveEdit}
//               className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//             >Save</button>
//             <button
//               onClick={() => setEditing(null)}
//               className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
//             >Cancel</button>
//           </div>
//         </div>
//       );
//     }
//     return (
//       <div className="relative group">
//         {isImage ? (
//           <img src={url} alt="Media" className="w-full h-32 object-cover rounded" />
//         ) : (
//           <video src={url} controls className="w-full h-32 object-cover rounded" />
//         )}
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <div className="flex space-x-2">
//             <button
//               onClick={() => handleEdit(type, index)}
//               className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
//             >✏️</button>
//             <button
//               onClick={() => handleDelete(type, index, item._id || item.public_id)}
//               className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
//               disabled={deleting}
//             >{deleting ? "..." : "🗑️"}</button>
//           </div>
//         </div>
//         {item.title && (
//           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
//             {item.title}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col items-center p-4 bg-white mx-auto w-full max-w-2xl">
//       {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

//       {!showVideoSection ? (
//         <>
//           <h2 className="text-xl font-bold mb-4">Property Images</h2>
//           <div className="w-full grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg min-h-[200px]">
//             {media.images.length === 0 ? (
//               <div className="col-span-3 flex items-center justify-center h-48">
//                 <p className="text-gray-500">{uploading ? "Uploading..." : "No images uploaded"}</p>
//               </div>
//             ) : (
//               media.images.map((image, index) => (
//                 <div key={index}>{renderMediaItem(image, 'image', index)}</div>
//               ))
//             )}
//           </div>
//           <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition">
//             {uploading ? "Uploading..." : "Add Photos"}
//             <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleUpload(Array.from(e.target.files), 'image')} disabled={uploading} />
//           </label>
//           <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full hover:bg-yellow-500 transition" onClick={() => setShowVideoSection(true)} disabled={uploading || media.images.length === 0}>
//             Continue to Videos
//           </button>
//         </>
//       ) : (
//         <div className="w-full flex flex-col items-center">
//           <h2 className="text-xl font-bold mb-4">Property Videos</h2>
//           <div className="w-full grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg min-h-[200px]">
//             {media.videos.length === 0 ? (
//               <div className="col-span-3 flex items-center justify-center h-48">
//                 <p className="text-gray-500">{uploading ? "Uploading..." : "No videos uploaded"}</p>
//               </div>
//             ) : (
//               media.videos.map((video, index) => (
//                 <div key={index}>{renderMediaItem(video, 'video', index)}</div>
//               ))
//             )}
//           </div>
//           <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition">
//             {uploading ? "Uploading..." : "Add Videos"}
//             <input type="file" multiple accept="video/*" className="hidden" onChange={(e) => handleUpload(Array.from(e.target.files), 'video')} disabled={uploading} />
//           </label>
//           <div className="flex gap-4 w-full mt-4">
//             <button onClick={() => setShowVideoSection(false)} className="flex-1 bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition">
//               Back to Images
//             </button>
//             <button onClick={nextStep} className="flex-1 bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-500 transition" disabled={uploading}>
//               Finish
//             </button>
//           </div>
//           <button className="mt-2 text-gray-500 hover:text-gray-700" onClick={nextStep}>
//             Skip Videos
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { mediaAPI, handleApiError } from "../PropertyController";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return id && /^[0-9a-fA-F]{24}$/.test(id);
};

export default function AddMedia({ nextStep, prevStep, propertyId, isEditMode }) {
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [tempMedia, setTempMedia] = useState({ images: [], videos: [] });
  const [showVideoSection, setShowVideoSection] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [isTempMode, setIsTempMode] = useState(!isValidObjectId(propertyId));

  // Initialize media based on propertyId status
  useEffect(() => {
    const initializeMedia = async () => {
      if (isValidObjectId(propertyId)) {
        setIsTempMode(false);
        try {
          const response = await mediaAPI.getMediaByProperty(propertyId);
          console.log("Media fetch response:", response);
          if (response.data.success) {

            setMedia({
              images: response.data.media?.images || [],
              videos: response.data.media?.videos || []
            });
          }
        } catch (err) {
          setError("Failed to load media");
          console.error("Media fetch error:", err);
        }
      } else {
        setIsTempMode(true);
        const storedImages = JSON.parse(localStorage.getItem("tempImages")) || [];
        const storedVideos = JSON.parse(localStorage.getItem("tempVideos")) || [];
        setTempMedia({ images: storedImages, videos: storedVideos });
      }
    };

    initializeMedia();
  }, [propertyId]);

  // Save temp media to localStorage when it changes
  useEffect(() => {
    if (isTempMode) {
      localStorage.setItem("tempImages", JSON.stringify(tempMedia.images));
      localStorage.setItem("tempVideos", JSON.stringify(tempMedia.videos));
    }
  }, [tempMedia, isTempMode]);

  const handleUpload = async (files, type) => {
    if (files.length === 0) return;
    setUploading(true);
    setError(null);
    
    try {
      if (isTempMode) {
        // Handle temporary storage
        const newItems = Array.from(files).map(file => ({
          url: URL.createObjectURL(file),
          name: file.name,
          type,
          file,
          tempId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          lastModified: file.lastModified
        }));

        setTempMedia(prev => ({
          ...prev,
          [type === 'image' ? 'images' : 'videos']: [
            ...prev[type === 'image' ? 'images' : 'videos'],
            ...newItems
          ]
        }));
      } else {
        // Handle actual upload to server
        if (!isValidObjectId(propertyId)) {
          throw new Error("Invalid property ID format");
        }

        const formData = new FormData();
        formData.append('propertyId', propertyId);
        Array.from(files).forEach(file => formData.append('files', file));

        const response = await mediaAPI.uploadMedia(formData);
        const newMedia = response.data.media?.[type === 'image' ? 'images' : 'videos'] || [];

        setMedia(prev => ({
          ...prev,
          [type === 'image' ? 'images' : 'videos']: [
            ...prev[type === 'image' ? 'images' : 'videos'],
            ...newMedia
          ]
        }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(handleApiError(error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (type, index, id) => {
    if (deleting) return;
    setDeleting(true);
    
    try {
      if (isTempMode) {
        // Delete from temp storage
        setTempMedia(prev => {
          const updated = { ...prev };
          updated[type === 'image' ? 'images' : 'videos'].splice(index, 1);
          return updated;
        });
      } else {
        // Delete from server
        if (id && !id.startsWith('temp-')) {
          await mediaAPI.deleteMediaItem(type, id);
        }
        setMedia(prev => {
          const updated = { ...prev };
          updated[type === 'image' ? 'images' : 'videos'].splice(index, 1);
          return updated;
        });
      }
    } catch (error) {
      setError(handleApiError(error).message);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (type, index) => {
    const items = isTempMode ? 
      tempMedia[type === 'image' ? 'images' : 'videos'] : 
      media[type === 'image' ? 'images' : 'videos'];
    const item = items[index];
    setEditing({ type, index, isTemp: isTempMode });
    setEditTitle(item.title || "");
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    const { type, index, isTemp } = editing;
    
    try {
      if (isTemp) {
        // Edit in temp storage
        setTempMedia(prev => {
          const updated = { ...prev };
          const items = [...updated[type === 'image' ? 'images' : 'videos']];
          items[index] = { ...items[index], title: editTitle };
          updated[type === 'image' ? 'images' : 'videos'] = items;
          return updated;
        });
      } else {
        // Edit on server
        const items = [...media[type === 'image' ? 'images' : 'videos']];
        const item = items[index];
        
        if (item._id) {
          await mediaAPI.editMediaItem(type, item._id, { title: editTitle });
        }
        
        setMedia(prev => {
          const updated = { ...prev };
          const items = [...updated[type === 'image' ? 'images' : 'videos']];
          items[index] = { ...items[index], title: editTitle };
          updated[type === 'image' ? 'images' : 'videos'] = items;
          return updated;
        });
      }

      setEditing(null);
      setEditTitle("");
    } catch (error) {
      setError(handleApiError(error).message);
    }
  };

  const renderMediaItem = (item, type, index) => {
    const isImage = type === 'image';
    const url = item.url || (item.file ? URL.createObjectURL(item.file) : '');
    
    if (editing?.type === type && editing?.index === index && editing?.isTemp === isTempMode) {
      return (
        <div className="relative border-2 border-yellow-400 rounded p-2">
          {isImage ? (
            <img src={url} alt="Edit" className="w-full h-32 object-cover" />
          ) : (
            <video src={url} controls className="w-full h-32 object-cover" />
          )}
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full mt-2 p-1 border rounded"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative group">
        {isImage ? (
          <img src={url} alt="Media" className="w-full h-32 object-cover rounded" />
        ) : (
          <video src={url} controls className="w-full h-32 object-cover rounded" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(type, index)}
              className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✏️
            </button>
            <button
              onClick={() => handleDelete(type, index, item._id || item.tempId)}
              className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              disabled={deleting}
            >
              {deleting ? "..." : "🗑️"}
            </button>
          </div>
        </div>
        {item.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
            {item.title}
          </div>
        )}
        {isTempMode && (
          <div className="absolute top-1 left-1 bg-yellow-500 text-white text-xs px-1 rounded">
            Temp
          </div>
        )}
      </div>
    );
  };

  // Function to migrate temp media to actual property
  const migrateTempMedia = async () => {
    if (!isValidObjectId(propertyId) || tempMedia.images.length + tempMedia.videos.length === 0) {
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('propertyId', propertyId);

      // Collect all files from temp media
      const allFiles = [
        ...tempMedia.images.filter(img => img.file),
        ...tempMedia.videos.filter(vid => vid.file)
      ].map(item => item.file);

      allFiles.forEach(file => formData.append('files', file));

      const response = await mediaAPI.uploadMedia(formData);
      if (response.data.success) {
        // Clear temp media
        setTempMedia({ images: [], videos: [] });
        localStorage.removeItem("tempImages");
        localStorage.removeItem("tempVideos");
        setIsTempMode(false);
        
        // Update with new media
        setMedia({
          images: response.data.media?.images || [],
          videos: response.data.media?.videos || []
        });
      }
    } catch (error) {
      console.error("Migration error:", error);
      setError("Failed to migrate temporary media");
    } finally {
      setUploading(false);
    }
  };

  // Auto-migrate when propertyId becomes valid
  useEffect(() => {
    if (isValidObjectId(propertyId) && isTempMode && 
        (tempMedia.images.length > 0 || tempMedia.videos.length > 0)) {
      migrateTempMedia();
    }
  }, [propertyId]);

  const currentImages = isTempMode ? tempMedia.images : media.images;
  const currentVideos = isTempMode ? tempMedia.videos : media.videos;

  return (
    <div className="flex flex-col items-center p-4 bg-white mx-auto w-full max-w-2xl">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {isTempMode && (
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
          ⚠️ Your property is being created. Media will be stored temporarily.
        </div>
      )}

      {!showVideoSection ? (
        <>
          <h2 className="text-xl font-bold mb-4">Property Images</h2>
          <div className="w-full grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg min-h-[200px]">
            {currentImages.length === 0 ? (
              <div className="col-span-3 flex items-center justify-center h-48">
                <p className="text-gray-500">{uploading ? "Uploading..." : "No images uploaded"}</p>
              </div>
            ) : (
              currentImages.map((image, index) => (
                <div key={index}>{renderMediaItem(image, 'image', index)}</div>
              ))
            )}
          </div>
          <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition">
            {uploading ? "Uploading..." : "Add Photos"}
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleUpload(Array.from(e.target.files), 'image')} 
              disabled={uploading} 
            />
          </label>
          <button 
            className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full hover:bg-yellow-500 transition" 
            onClick={() => setShowVideoSection(true)} 
            disabled={uploading || currentImages.length === 0}
          >
            Continue to Videos
          </button>
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Property Videos</h2>
          <div className="w-full grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg min-h-[200px]">
            {currentVideos.length === 0 ? (
              <div className="col-span-3 flex items-center justify-center h-48">
                <p className="text-gray-500">{uploading ? "Uploading..." : "No videos uploaded"}</p>
              </div>
            ) : (
              currentVideos.map((video, index) => (
                <div key={index}>{renderMediaItem(video, 'video', index)}</div>
              ))
            )}
          </div>
          <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition">
            {uploading ? "Uploading..." : "Add Videos"}
            <input 
              type="file" 
              multiple 
              accept="video/*" 
              className="hidden" 
              onChange={(e) => handleUpload(Array.from(e.target.files), 'video')} 
              disabled={uploading} 
            />
          </label>
          <div className="flex gap-4 w-full mt-4">
            <button 
              onClick={() => setShowVideoSection(false)} 
              className="flex-1 bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Back to Images
            </button>
            <button 
              onClick={nextStep} 
              className="flex-1 bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-500 transition" 
              disabled={uploading}
            >
              {isTempMode ? "Continue" : "Finish"}
            </button>
          </div>
          <button 
            className="mt-2 text-gray-500 hover:text-gray-700 text-sm" 
            onClick={nextStep}
          >
            {isTempMode ? "I'll add media later" : "Skip Videos"}
          </button>
        </div>
      )}
    </div>
  );
}