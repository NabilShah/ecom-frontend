import { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function DeliveryPartners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    api.get("/admin/delivery-partners").then((res) => setPartners(res.data));
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Available</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {partners.map((p) => (
          <TableRow key={p._id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.email}</TableCell>
            <TableCell>{p.isAvailable ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
