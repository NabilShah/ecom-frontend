import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import { Grid, Container } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/customer/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
