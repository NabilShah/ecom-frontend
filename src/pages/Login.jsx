import { useState, useContext } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import api from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      navigate("/products");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      
      <TextField 
        fullWidth 
        label="Email"
        margin="normal"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <TextField 
        fullWidth 
        label="Password"
        type="password"
        margin="normal"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Login
      </Button>
    </Paper>
  );
}
