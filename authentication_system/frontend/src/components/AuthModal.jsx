import React from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const AuthModal = ({ mode, isOpen, setMode, closeModal }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    try {
      const res = await api.post(endpoint, {
        email,
        password,
        firstName,
        lastName,
      });
      await login(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div>
      {mode === "login" ? "login" : "register"}
      <button onClick={closeModal}>X</button>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>{mode === "login" ? "login" : "register"}</button>
        <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
          switch
        </span>
      </form>
    </div>
  );
};

export default AuthModal;
