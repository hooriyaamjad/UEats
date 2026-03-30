import api from "../utils/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const login = async (username, password) => {

  try {
    const response = await api.post('/profiles/login/', { username, password });
    if (response.data) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return true
    }
  } catch (error) {
    console.error("Login failed:", error?.response?.data);
  }

  return false;
};


export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);

    if (success) {
      navigate("/home");
    }
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button type="submit">Log In</button>
    </form>

    </div>
  );
}