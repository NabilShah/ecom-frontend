import { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function LiveStatuses() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/live-status").then((res) => setStats(res.data));
  }, []);

  return (
    <Grid container spacing={2}>
      {Object.entries(stats).map(([key, value]) => (
        <Grid item xs={12} sm={6} md={3} key={key}>
          <Card>
            <CardContent>
              <Typography variant="h6">{key.replace("_", " ")}</Typography>
              <Typography variant="h4">{value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
