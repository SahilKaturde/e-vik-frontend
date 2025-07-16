import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import Navbar from "./Navbar";

function EwasteUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile image on component load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await api.get("/auth/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfilePic(res.data.profile_pic);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchUser();
  }, []);

  const handleImageDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image || !address) {
      alert("Please fill all fields.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required to upload e-waste.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("address", address);

    try {
      setLoading(true);
      await api.post("/auth/e-waste/upload/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("E-Waste uploaded successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert("Login required to upload e-waste.");
        navigate("/login");
      } else {
        alert("Error uploading e-waste.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="min-h-screen bg-[#212529] text-white flex items-center justify-center px-4 py-12 font-mono relative">
        {/* Profile picture in top right */}
        {profilePic && (
          <div className="absolute top-6 right-6">
            
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#2a2f35] w-full max-w-xl rounded-2xl shadow-lg p-8 transition duration-300"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
            Upload E-Waste
          </h2>

          <input
            type="text"
            placeholder="Title (e.g., Old Mixer)"
            className="w-full mb-4 px-4 py-2 rounded bg-[#1e2227] border border-gray-700 focus:outline-none focus:border-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Short Description"
            className="w-full mb-4 px-4 py-2 rounded bg-[#1e2227] border border-gray-700 focus:outline-none focus:border-white"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div
            className={`w-full h-40 mb-4 flex flex-col items-center justify-center border-2 rounded-md transition-colors ${
              dragOver ? "border-white bg-[#1a1d22]" : "border-gray-600"
            } relative`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleImageDrop}
          >
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            {image ? (
              <p className="text-green-400 text-sm">Image: {image.name}</p>
            ) : (
              <p className="text-sm text-gray-400">
                Drag & drop or click to upload image
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageSelect}
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            className="w-full mb-6 px-4 py-2 rounded bg-[#1e2227] border border-gray-700 focus:outline-none focus:border-white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white transition duration-300"
            style={{ backgroundColor: "#6EA8FE" }}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload E-Waste"}
          </button>
        </form>
      </div>
    </>
  );
}

export default EwasteUpload;
