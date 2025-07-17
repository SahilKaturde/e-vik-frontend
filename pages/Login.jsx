// src/pages/Login.jsx
import React, { useState } from 'react';
import api from "../src/api";
import { useNavigate } from 'react-router-dom'; 
import './login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login/', {
        username,
        password,
      });

      const token = res.data.token || res.data.access || res.data.key;
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/home');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Invalid credentials or login error.');
    }
  };

  return (
    <form className="box" onSubmit={handleLogin}>
      <div className="one">
        <h2 style={{ color: '#fff', marginBottom: '2vh' }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">Login</button>
      </div>
    </form>
  );
}

export default Login;

