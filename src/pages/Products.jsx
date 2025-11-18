import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import { Container, Typography, Box, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    api.get("/customer/products").then((res) => setProducts(res.data || []));
  }, []);
  useEffect(() => {
  console.log("Products from API:", products);
}, [products]);
  // simple client-side filter/sort for demo
  const filtered = products
    .filter((p) => p.name?.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return Number(a.price) - Number(b.price);
      if (sort === "high") return Number(b.price) - Number(a.price);
      return 0;
    });

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Latest Products
      </Typography>

      {/* search + sort row */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, brands, or categories"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ minWidth: 140 }}>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            displayEmpty
            size="small"
            fullWidth
          >
            <MenuItem value="">Sort: Featured</MenuItem>
            <MenuItem value="low">Price: Low to High</MenuItem>
            <MenuItem value="high">Price: High to Low</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* responsive grid using CSS grid — guarantees 5 columns on large screens */}
      <Box
        sx={{
          display: "grid",
          gap: 20 / 8, // spacing ~ 2.5
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)", // five per row on large screens
          },
        }}
      >
        {filtered.map((p) => (
          <Box key={p._id}>
            <ProductCard product={p} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
