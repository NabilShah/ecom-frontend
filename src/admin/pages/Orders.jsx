import { useEffect, useState, useContext } from "react";
import api from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Container, Typography, Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { user, loadingUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Protect admin
  useEffect(() => {
    if (loadingUser) return;
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [user, loadingUser, navigate]);

  useEffect(() => {
    api.get("/admin/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        All Orders
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total</TableCell>
            {/* <TableCell>Status</TableCell>
            <TableCell>Delivery Partner</TableCell> */}
            <TableCell>Placed On</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((o) => (
            <TableRow key={o._id}>
              <TableCell>{o._id}</TableCell>

              <TableCell>
                {o.customer ? (
                  <>
                    <strong>{o.customer.name}</strong><br />
                    {o.customer.email}<br />
                    {o.customer.phone}
                  </>
                ) : "Deleted User"}
              </TableCell>

              <TableCell>₹{o.total}</TableCell>
              {/* <TableCell>{o.status}</TableCell>

              <TableCell>
                {o.assignedTo ? (
                  <>
                    {o.assignedTo.name}<br />
                    {o.assignedTo.phone}
                  </>
                ) : (
                  <span style={{ color: "red" }}>Unassigned</span>
                )}
              </TableCell> */}

              <TableCell>
                {new Date(o.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
