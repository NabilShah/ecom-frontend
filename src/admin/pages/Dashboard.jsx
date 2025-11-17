import { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/live-status").then((res) => setStats(res.data));
  }, []);

  return (
    <Grid container spacing={2}>
      {Object.keys(stats).map((key) => (
        <Grid item xs={12} sm={4} md={3} key={key}>
          <Card>
            <CardContent>
              <Typography variant="h6">{key.replace("_", " ").toUpperCase()}</Typography>
              <Typography variant="h4">{stats[key]}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
