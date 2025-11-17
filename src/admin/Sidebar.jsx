import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <Toolbar />
      <List>
        <ListItemButton component={Link} to="/admin/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/admin/products">
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton component={Link} to="/admin/orders">
          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton component={Link} to="/admin/delivery-partners">
          <ListItemText primary="Delivery Partners" />
        </ListItemButton>

        <ListItemButton component={Link} to="/admin/live-status">
          <ListItemText primary="Live Status" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
