import { useEffect, useState, useContext } from "react";
import api from "../api/axiosClient";
import socket, { joinCustomerRoom } from "../sockets/customerSocket";
import { AuthContext } from "../context/AuthContext";
import { Container, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }


    joinCustomerRoom(user.id);

    api.get("/customer/orders").then((res) => setOrders(res.data));

    socket.on("orderUpdated", (order) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === order._id ? order : o))
      );
    });

    return () => socket.off("orderUpdated");

  }, [user]);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" mb={2}>My Orders</Typography>

      {orders.map((o) => (
        <Paper key={o._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Order: {o._id}</Typography>
          <Typography>Status: {o.status}</Typography>

          <Button
            component={Link}
            to={`/orders/${o._id}`}
            sx={{ mt: 1 }}
            variant="outlined"
          >
            View Details
          </Button>
        </Paper>
      ))}
    </Container>
  );
}
