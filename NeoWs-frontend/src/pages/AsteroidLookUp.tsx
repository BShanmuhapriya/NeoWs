import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DiameterPieChart from "../visualization/DiameterPieChart"; // Make sure this path is correct

interface Asteroid {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    orbiting_body: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }[];
}

const AsteroidLookUp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { asteroid }: { asteroid: Asteroid } = location.state || {};

  if (!asteroid) {
    return (
      <Box sx={{ color: "white", p: 4 }}>
        <Typography>No asteroid selected for lookup.</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Feed
        </Button>
      </Box>
    );
  }

  const {
    name,
    absolute_magnitude_h,
    is_potentially_hazardous_asteroid,
    estimated_diameter,
    close_approach_data,
  } = asteroid;

  const closeData = close_approach_data[0] || {};

  return (
    <Box
      sx={{
        color: "white",
        fontFamily: "'Space Mono', monospace",
        px: 4,
        py: 6,
        minHeight: "100vh",
        overflow: 'hidden'
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontFamily: "'Space Mono', monospace" }}>
        Asteroid Lookup: {name}
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, mt: 8 }}>
        <Box sx={{ ml: 8 }}>
          <Typography variant="h6" sx={{ mb: 4, fontFamily: "'Space Mono', monospace" }}>
            ID: {asteroid.id}
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>Magnitude (H): {absolute_magnitude_h}</Typography>
          <Typography sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>
            Close Approach Date: {closeData.close_approach_date}
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>Orbiting Body: {closeData.orbiting_body}</Typography>
          <Typography sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>
            Speed: {closeData.relative_velocity?.kilometers_per_hour} km/h
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>
            Distance to Earth: {closeData.miss_distance?.kilometers} km
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>
            Min Diameter: {estimated_diameter.kilometers.estimated_diameter_min} km
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>
            Max Diameter: {estimated_diameter.kilometers.estimated_diameter_max} km
          </Typography>
          <Box sx={{ mt: 2, fontFamily: "'Space Mono', monospace", display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>
              Hazard Level:
            </Typography>
            <Chip
              label={is_potentially_hazardous_asteroid ? "Hazardous" : "Safe"}
              sx={{
                backgroundColor: is_potentially_hazardous_asteroid ? "#ff1744" : "#00e676",
                color: "#000",
                fontWeight: "bold",
                fontFamily: "'Space Mono', monospace"
              }}
            />
          </Box>
        </Box>

        <DiameterPieChart
          minDiameter={estimated_diameter.kilometers.estimated_diameter_min}
          maxDiameter={estimated_diameter.kilometers.estimated_diameter_max}
        />
      </Box>

      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/feedCard")}
          sx={{
            fontFamily: "'Space Mono', monospace",
            backgroundColor: "#ff5722",
            color: "white",
            "&:hover": {
              backgroundColor: "#e64a19",
            },
          }}
        >
          Back to Feed
        </Button>
      </Box>
    </Box>
  );
};

export default AsteroidLookUp;
