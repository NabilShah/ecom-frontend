import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Box component={Link} to="/" sx={{ textDecoration: "none", color: "#fff", fontWeight: 700 }}>
          E-Commerce
        </Box>

        {/* Right Side */}
        <Box>
          {isAdmin ? (
            // ADMIN NAVBAR
            <Button color="inherit" onClick={logout}>Logout</Button>
          ) : (
            // CUSTOMER NAVBAR
            <>
              <Button color="inherit" component={Link} to="/products">Products</Button>
              <Button color="inherit" component={Link} to="/orders">My Orders</Button>

              {!user ? (
                <Button color="inherit" component={Link} to="/login">Login</Button>
              ) : (
                <Button color="inherit" onClick={logout}>Logout</Button>
              )}
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}
