import { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Delivery Partner</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {orders.map((o) => (
          <TableRow key={o._id}>
            <TableCell>{o._id}</TableCell>
            <TableCell>{o.customer?.name}</TableCell>
            <TableCell>{o.status}</TableCell>
            <TableCell>{o.assignedTo?.name || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
