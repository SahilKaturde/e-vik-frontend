// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import api from "../src/api";

function Register() {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();

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

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // Check for spaces in username
    if (value.includes(' ')) {
      setUsernameError('Spaces are not allowed in username');
    } else {
      setUsernameError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check for spaces in username before submitting
    if (username.includes(' ')) {
      setUsernameError('Please remove spaces from username before submitting');
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
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong during registration.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-section">
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
            className="form-input"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          {usernameError && <div className="error-message">{usernameError}</div>}
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-section">
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="submit-btn" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;