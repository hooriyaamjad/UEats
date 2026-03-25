import api from "../utils/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const signup = async ({ username, email, password, isStudent, university, studentId }) => {
  const payload = {
    username,
    email,
    password,
    profile: {
      is_student: isStudent,
      university,
      student_id: studentId,
    },
  };

  try {
    const response = await api.post("/profiles/signup/", payload);
    if (response.data?.tokens) {
      localStorage.setItem("access_token", response.data.tokens.access);
      localStorage.setItem("refresh_token", response.data.tokens.refresh);
      return true;
    }
  } catch (error) {
    console.error("Signup failed:", error?.response?.data);
  }

  return false;
};

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [university, setUniversity] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup({
      username,
      email,
      password,
      isStudent,
      university,
      studentId,
    });

    if (success) {
      navigate("/home");
    }
  };

  return (
    <div>
      Signup
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
          Is student
        </label>
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          placeholder="University"
        />
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="University ID"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}