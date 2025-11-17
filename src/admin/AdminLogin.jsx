import { useContext, useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import api from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", form);

      if (res.data.user.role !== "admin") {
        alert("Access Denied: Not an Admin");
        return;
      }

      login(res.data.token);
      navigate("/admin/dashboard");

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>Admin Login</Typography>

      <TextField
        fullWidth label="Email" margin="normal"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <TextField
        fullWidth label="Password" margin="normal" type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
        Login
      </Button>
    </Paper>
  );
}
