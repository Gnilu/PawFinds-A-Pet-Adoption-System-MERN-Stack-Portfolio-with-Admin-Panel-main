import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("User data fetched:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");
    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post("http://localhost:5000/api/auth/upload-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      alert("Image uploaded successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>My Profile</h2>
      {user.profileImage && (
        <img
          src={`http://localhost:5000/images/profiles/${user.profileImage}`}
          alt="Profile"
          style={{ width: "150px", borderRadius: "50%", marginBottom: "15px" }}
        />
      )}
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Upload Profile Picture
      </button>
    </div>
  );
};

export default Profile;
