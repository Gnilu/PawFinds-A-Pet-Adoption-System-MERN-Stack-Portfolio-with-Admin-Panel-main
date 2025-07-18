import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from '../ToastContext';


const ProfileAndAddPet = () => {
  const [user, setUser] = useState({});
  const [profileFile, setProfileFile] = useState(null);
  const { showToast } = useToast();

  // Pet fields
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");

  const [pets, setPets] = useState([]);

  const [btnHoverProfile, setBtnHoverProfile] = useState(false);
  const [btnHoverPet, setBtnHoverPet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const userRes = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const petsRes = await axios.get("http://localhost:5000/api/pets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(petsRes.data.pets || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleProfileFileChange = (e) => {
    setProfileFile(e.target.files[0]);
  };

  const handleUploadProfile = async () => {
    if (!profileFile) return showToast("Please select a file first." ,"error");
    const formData = new FormData();
    formData.append("profileImage", profileFile);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/api/auth/upload-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("Profile image uploaded successfully" , "success");
      window.location.reload();
    } catch (err) {
      console.error(err);
      showToast("Upload failed", "error");
    }
  };

  const handleAddPet = async () => {
    if (!petName || !petType || !petAge || !petBreed) {
      return showToast("Please fill all pet details" ,"error");
    }

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "http://localhost:5000/api/pets",
        { name: petName, type: petType, age: petAge, breed: petBreed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast("Pet added successfully" , "success");
      setPets((prev) => [...prev, res.data.pet]);
      setPetName("");
      setPetType("");
      setPetAge("");
      setPetBreed("");
    } catch (err) {
      console.error(err);
      showToast("Failed to add pet" ,"error");
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    maxWidth: "900px",
    margin: "40px auto",
    gap: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const leftStyle = {
    flex: 1,
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    maxHeight: "80vh",
    overflowY: "auto",
  };

  const rightStyle = {
    flex: 1,
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const profileImageStyle = {
    width: "120px",
    height: "120px",
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

  const petCardStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    marginBottom: "15px",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const petBadgeStyle = (type) => ({
    backgroundColor:
      type.toLowerCase() === "dog"
        ? "#FFD700"
        : type.toLowerCase() === "cat"
        ? "#FF69B4"
        : type.toLowerCase() === "bird"
        ? "#00CED1"
        : "#90EE90",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "15px",
    fontSize: "0.85rem",
    fontWeight: "600",
    textTransform: "capitalize",
  });

  const petInfoStyle = {
    flexGrow: 1,
    marginLeft: "15px",
    fontSize: "0.95rem",
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: "6px 14px",
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

  const buttonHoverStyle = { backgroundColor: "#357ABD" };

  return (
    <div style={containerStyle}>
      {/* Left */}
      <div style={leftStyle}>
        <h2 style={{ marginBottom: "20px", color: "#4A90E2" }}>My Profile</h2>
        {user.profileImage ? (
          <img
            src={`http://localhost:5000/profile-images/${user.profileImage}`}
            alt="Profile"
            style={profileImageStyle}
          />
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
        

        <input
          type="file"
          onChange={handleProfileFileChange}
          style={{ marginTop: "20px" }}
          accept="image/*"
        />
        <button
          onClick={handleUploadProfile}
          style={
            btnHoverProfile
              ? { ...buttonStyle, ...buttonHoverStyle }
              : buttonStyle
          }
          onMouseEnter={() => setBtnHoverProfile(true)}
          onMouseLeave={() => setBtnHoverProfile(false)}
        >
          Save Profile Picture
        </button>

        <h3 style={{ marginTop: "30px", color: "#4A90E2" }}>My Pets</h3>
        {pets.length === 0 && <p>No pets added yet.</p>}
        {pets.map((pet) => (
          <div
            key={pet._id}
            style={petCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.06)";
            }}
          >
            <div style={petBadgeStyle(pet.type)}>{pet.type}</div>
            <div style={petInfoStyle}>
              <div>
                <strong>Name:</strong>
              </div>
              <div>{pet.name}</div>
              <div>
                <strong>Age:</strong>
              </div>
              <div>{pet.age}</div>
              <div>
                <strong>Breed:</strong>
              </div>
              <div>{pet.breed}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right */}
      <div style={rightStyle}>
        <h2 style={{ marginBottom: "20px", color: "#4A90E2" }}>Add Pet</h2>

        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Pet Name"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          placeholder="Pet Type"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          value={petAge}
          onChange={(e) => setPetAge(e.target.value)}
          placeholder="Pet Age"
          min="0"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          value={petBreed}
          onChange={(e) => setPetBreed(e.target.value)}
          placeholder="Pet Breed"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleAddPet}
          style={
            btnHoverPet ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle
          }
          onMouseEnter={() => setBtnHoverPet(true)}
          onMouseLeave={() => setBtnHoverPet(false)}
        >
          Add Pet
        </button>
      </div>
    </div>
  );
};

export default ProfileAndAddPet;
