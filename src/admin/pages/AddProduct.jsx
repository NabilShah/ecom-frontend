import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import api from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: "",
  });

  const submit = async () => {
    const payload = {
      ...form,
      images: form.images.split(",").map((i) => i.trim()),
    };

    await api.post("/admin/createProduct", payload);
    navigate("/admin/products");
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5">Add Product</Typography>

      <TextField label="Name" fullWidth sx={{ mt: 2 }} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <TextField label="Price" fullWidth sx={{ mt: 2 }} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <TextField label="Stock" fullWidth sx={{ mt: 2 }} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
      <TextField label="Images (comma separated URLs)" fullWidth sx={{ mt: 2 }} onChange={(e) => setForm({ ...form, images: e.target.value })} />

      <Button variant="contained" sx={{ mt: 3 }} onClick={submit}>
        Save
      </Button>
    </Paper>
  );
}
