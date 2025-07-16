// src/pages/Register.jsx
import React, { useState } from 'react';
import './register.css';
import api from "../src/api";


function Register() {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setProfilePic(file);
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }

    try {
      const res = await api.post("/auth/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registration successful!");
      // optionally reset form
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAddress('');
      setProfilePic(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong during registration.");
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="one">
        <div
          className="drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('fileInput').click()}
        >
          {profilePic ? (
            <img
              src={URL.createObjectURL(profilePic)}
              alt="Preview"
              className="preview"
            />
          ) : (
            <p>Drop profile image here or click</p>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="two">
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Create Account
        </button>
      </div>
    </form>
  );
}

export default Register;
