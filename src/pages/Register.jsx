import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      await api.post("/auth/register", {
        ...form,
        role: "customer"   // VERY IMPORTANT
      });

      alert("Registered successfully! Please login.");
      navigate("/login");

    } catch (err) {
      alert("Registration failed. Email may already exist.");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>Create Account</Typography>

      <TextField
        fullWidth
        label="Name"
        margin="normal"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </Paper>
  );
}
