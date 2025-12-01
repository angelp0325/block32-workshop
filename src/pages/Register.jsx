import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, getUserProfile } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setToken(res.token);
      const userData = await getUserProfile();
      setUser(userData);
      navigate("/account");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
