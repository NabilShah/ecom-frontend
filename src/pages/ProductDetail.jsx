import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";
import { Button, Container, Typography, Box, TextField } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/customer/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const placeOrder = async () => {
    try {
      await api.post("/customer/orders", {
        items: [
          {
            product: product._id,
            qty,
            price: product.price,
          },
        ],
      });
      alert("Order placed!");
      navigate("/orders");
    } catch (err) {
      alert("Login first");
    }
  };

  if (!product) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h6" color="green">₹{product.price}</Typography>

      <Box sx={{ mt: 2 }}>
        <TextField
          label="Quantity"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </Box>

      <Button variant="contained" sx={{ mt: 3 }} onClick={placeOrder}>
        Place Order
      </Button>
    </Container>
  );
}
