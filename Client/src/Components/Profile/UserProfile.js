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

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const profileImageStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "4px solid #4A90E2",
    boxShadow: "0 2px 8px rgba(74,144,226,0.3)",
  };

  const infoRowStyle = {
    marginBottom: "12px",
    fontSize: "1.1rem",
    color: "#333",
  };

  const labelStyle = {
    fontWeight: "600",
    marginRight: "8px",
    color: "#555",
  };

  const fileInputStyle = {
    marginTop: "20px",
  };

  const buttonStyle = {
    marginTop: "15px",
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#357ABD",
  };

  // Simple hover effect for button - you could also use useState for hover, here is basic inline approach:
  const [btnHover, setBtnHover] = React.useState(false);

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#4A90E2" }}>My Profile</h2>

      {user.profileImage ? (
        <img src={`http://localhost:5000/profile-images/${user.profileImage}`} alt="Profile" />

      ) : (
        <div
          style={{
            ...profileImageStyle,
            backgroundColor: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#777",
            fontSize: "4rem",
            userSelect: "none",
          }}
        >
          ?
        </div>
      )}

      <div style={infoRowStyle}>
        <span style={labelStyle}>Username:</span> {user.username || "N/A"}
      </div>
      <div style={infoRowStyle}>
        <span style={labelStyle}>Email:</span> {user.email || "N/A"}
      </div>
      <div style={infoRowStyle}>
        <span style={labelStyle}>Role:</span> {user.role || "N/A"}
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        style={fileInputStyle}
        accept="image/*"
      />
      <button
        onClick={handleUpload}
        style={btnHover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        Save Profile Picture
      </button>
    </div>
  );
};

export default Profile;
