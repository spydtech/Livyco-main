import { useState, useEffect } from "react";
import { mediaAPI, handleApiError } from "../PropertyController";

export default function AddMedia({ nextStep }) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showVideoSection, setShowVideoSection] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await mediaAPI.getMedia();
        if (response.data.success) {
          setImages(response.data.media?.images?.map(img => img.url) || []);
          setVideos(response.data.media?.videos?.map(vid => vid.url) || []);
        }
      } catch (error) {
        console.error("Failed to fetch media:", error);
        setError("Failed to load media. Using local storage fallback.");
        const storedImages = JSON.parse(localStorage.getItem("images")) || [];
        const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
        setImages(storedImages);
        setVideos(storedVideos);
      }
    };

    fetchMedia();
  }, []);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('media', file));

      const response = await mediaAPI.uploadMedia(formData);
      
      if (response.data.success) {
        const newImages = response.data.media.images.map(img => img.url);
        setImages(prev => [...prev, ...newImages]);
        localStorage.setItem("images", JSON.stringify([...images, ...newImages]));
      } else {
        throw new Error(response.data.message || "Failed to upload images");
      }
    } catch (error) {
      const apiError = handleApiError(error);
      setError(apiError.message);
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('media', file));

      const response = await mediaAPI.uploadMedia(formData);
      
      if (response.data.success) {
        const newVideos = response.data.media.videos.map(vid => vid.url);
        setVideos(prev => [...prev, ...newVideos]);
        localStorage.setItem("videos", JSON.stringify([...videos, ...newVideos]));
      } else {
        throw new Error(response.data.message || "Failed to upload videos");
      }
    } catch (error) {
      const apiError = handleApiError(error);
      setError(apiError.message);
      console.error("Video upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleContinue = () => {
    setShowVideoSection(true);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white mx-auto w-full max-w-2xl">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {!showVideoSection ? (
        <>
          <div className="w-full grid grid-cols-3 gap-2 p-4 bg-gray-100 rounded-lg min-h-[200px]">
            {images.length === 0 ? (
              <div className="col-span-3 flex items-center justify-center h-48">
                <p className="text-gray-500">
                  {uploading ? "Uploading..." : "No images uploaded"}
                </p>
              </div>
            ) : (
              images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              ))
            )}
          </div>
          <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition disabled:opacity-50">
            {uploading ? "Uploading..." : "Add Photos"}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
          <button
            className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full hover:bg-yellow-500 transition disabled:opacity-50"
            onClick={handleContinue}
            disabled={uploading || images.length === 0}
          >
            Continue
          </button>
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full grid grid-cols-3 gap-2 p-4 bg-gray-100 rounded-lg min-h-[200px]">
            {videos.length === 0 ? (
              <div className="col-span-3 flex items-center justify-center h-48">
                <p className="text-gray-500">
                  {uploading ? "Uploading..." : "No videos uploaded"}
                </p>
              </div>
            ) : (
              videos.map((video, index) => (
                <div key={index} className="relative group">
                  <video
                    src={video}
                    controls
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              ))
            )}
          </div>
          <label className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition disabled:opacity-50">
            {uploading ? "Uploading..." : "Add Videos"}
            <input
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
              disabled={uploading}
            />
          </label>
          <button
            onClick={nextStep}
            className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md w-full hover:bg-yellow-500 transition disabled:opacity-50"
            disabled={uploading}
          >
            Finish
          </button>
          <button 
            className="mt-2 text-gray-500 hover:text-gray-700"
            onClick={nextStep}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
}