import { useState, useEffect } from "react";

export default function AddMedia({ nextStep }) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showVideoSection, setShowVideoSection] = useState(false);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
    setImages(storedImages);
    setVideos(storedVideos);
  }, []);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [
      ...images,
      ...files.map((file) => URL.createObjectURL(file)),
    ];
    setImages(newImages);
    localStorage.setItem("images", JSON.stringify(newImages));
  };

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newVideos = [
      ...videos,
      ...files.map((file) => URL.createObjectURL(file)),
    ];
    setVideos(newVideos);
    localStorage.setItem("videos", JSON.stringify(newVideos));
  };

  const handleContinue = () => {
    setShowVideoSection(true);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white mx-auto w-full max-w-2xl">
      {!showVideoSection ? (
        <>
          <div className="w-full grid grid-cols-3 gap-2 p-4 bg-gray-300 rounded-lg min-h-[200px]">
            {images.length === 0 ? (
              <div className="col-span-3 flex items-center justify-center h-48">
                <p className="text-gray-500">No images uploaded</p>
              </div>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded"
                />
              ))
            )}
          </div>
          <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer">
            Add Photos
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <button
            className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full"
            onClick={handleContinue}
          >
            Continue
          </button>
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full grid grid-cols-3 gap-2 p-4 bg-gray-300 rounded-lg min-h-[200px]">
            {videos.length === 0 ? (
              <div className="col-span-3 flex items-center justify-center h-48">
                <p className="text-gray-500">No videos uploaded</p>
              </div>
            ) : (
              videos.map((video, index) => (
                <video
                  key={index}
                  src={video}
                  controls
                  className="w-full h-32 object-cover rounded"
                />
              ))
            )}
          </div>
          <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer">
            Add Videos
            <input
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </label>
          <button
            onClick={nextStep}
            className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full"
          >
            Finish
          </button>
          <button className="absolute top-4 right-4 text-gray-500">SKIP</button>
        </div>
      )}
    </div>
  );
}
