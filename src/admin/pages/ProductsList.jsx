import { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/customer/products").then((res) => setProducts(res.data));
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/admin/deleteProduct/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <>
      <Button
        variant="contained"
        component={Link}
        to="/admin/add-product"
        sx={{ mb: 2 }}
      >
        Add Product
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>

              <TableCell>
                <Button component={Link} to={`/admin/update-product/${p._id}`}>Edit</Button>
              </TableCell>

              <TableCell>
                <Button color="error" onClick={() => deleteProduct(p._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
