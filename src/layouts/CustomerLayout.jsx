import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

export default function CustomerLayout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
}
