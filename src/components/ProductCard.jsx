import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={product.images?.[0] || "https://via.placeholder.com/300"}
      />

      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{product.price}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          component={Link}
          to={`/products/${product._id}`}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
