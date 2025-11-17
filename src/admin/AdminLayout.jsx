import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

export default function AdminLayout({ children }) {
  const { user } = useContext(AuthContext);

  // Protect admin routes
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3} sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
        {children}
      </Box>
    </Box>
  );
}
