import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";
import socket, { joinCustomerRoom } from "../sockets/customerSocket";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography } from "@mui/material";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    joinCustomerRoom(user.id);

    api.get(`/customer/orders/${id}`).then((res) => setOrder(res.data));

    socket.on("orderUpdated", (data) => {
      if (data._id === id) setOrder(data);
    });

    return () => socket.off("orderUpdated");

  }, [user, id]);

  if (!order) return null;

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4">Order Details</Typography>
      <Typography>ID: {order._id}</Typography>
      <Typography>Status: {order.status}</Typography>
    </Container>
  );
}
