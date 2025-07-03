import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import AsteroidScroll from "./AsteroidScroll";

interface Asteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
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

const FeedCard: React.FC = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [addedAsteroids, setAddedAsteroids] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { startDate, endDate } = location.state || {};

  useEffect(() => {
    const fetchAsteroids = async () => {
      if (!startDate || !endDate) {
        setError("Please select both start and end dates");
        return;
      }

      setLoading(true);
      try {
        const res = await api.get("/neo/feed", {
          params: { start_date: startDate, end_date: endDate },
        });
        const raw = res.data.near_earth_objects;
        const flatList = Object.values(raw).flat() as Asteroid[];
        setAsteroids(flatList);
      } catch {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, [startDate, endDate]);

  const handleCompare = () => {
    navigate("/compareAsteroids", {
      state: {
        asteroids: asteroids.filter((a) => addedAsteroids.includes(a.id)),
        startDate,
        endDate,
      },
    });
  };

  const handleCompareToggle = (id: string) => {
    setAddedAsteroids((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <>
      {loading && (
        <Typography sx={{ color: "white", fontFamily: "'Space Mono', monospace" }}>
          Loading...
        </Typography>
      )}

      {error && (
        <Typography sx={{ color: "red", fontFamily: "'Space Mono', monospace" }}>
          {error}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,

        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontFamily: "'Space Mono', monospace",
            paddingTop: "20px",
            mb: "10px",
          }}
        >
          Asteroid Feed
        </Typography>

        <Button
          variant="contained"
          disabled={addedAsteroids.length !== 3}
          onClick={handleCompare}
          sx={{
            width: "200px",
            height: "50px",
            fontFamily: "'Space Mono', monospace",
            mt: "20px",
            backgroundColor:
              addedAsteroids.length === 3 ? "#ff4500" : "gray",
            color: "white",
            cursor: addedAsteroids.length === 3 ? "pointer" : "not-allowed",
            "&.Mui-disabled": {
              backgroundColor: "gray",
              color: "white",
              opacity: 0.6,
            },
          }}
        >
          Compare Asteroids
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          fontFamily: "'Space Mono', monospace",
          mb: 4,
          pl: 4,
          gap: 1.5,
        }}
      >
        <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>Start Date: {startDate || "N/A"}</Typography>
        <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>End Date: {endDate || "N/A"}</Typography>
        <Link
          href="/"
          underline="hover"
          target="_blank"
          rel="noopener"
          sx={{ color: "white" }}
        >
          Edit
        </Link>
      </Box>

      <AsteroidScroll
        asteroidCards={asteroids.map((a) => (
          <Card
            key={a.id}
            sx={{
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 2,
              fontFamily: "'Space Mono', monospace",
              maxWidth: "450px",
              width: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  columnGap: 3,
                  rowGap: 1.5,
                }}
              >
                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  ID
                </Typography>
                <Typography>: {a.id}</Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Name
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>: {a.name}</Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  NASA JPL URL
                </Typography>
                <span>
                  :
                  <Link
                    href={a.nasa_jpl_url}
                    target="_blank"
                    sx={{ color: "white", fontFamily: "'Space Mono', monospace" }}
                  >
                    Link
                  </Link>
                </span>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Absolute Magnitude
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>: {a.absolute_magnitude_h}</Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Date of Approach
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  : {a.close_approach_data[0]?.close_approach_date}
                </Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Orbiting Body
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  : {a.close_approach_data[0]?.orbiting_body}
                </Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Hazardous
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  : {a.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                </Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Sentry Object
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  : {a.is_sentry_object ? "Yes" : "No"}
                </Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Min Diameter
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  : {a.estimated_diameter.kilometers.estimated_diameter_min} km
                </Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Max Diameter
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  : {a.estimated_diameter.kilometers.estimated_diameter_max} km
                </Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Speed
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  :
                  {
                    a.close_approach_data[0]?.relative_velocity
                      .kilometers_per_hour
                  }{" "}
                  km/h
                </Typography>

                <Typography fontWeight="bold" color="rgb(25, 252, 195)" sx={{ fontFamily: "'Space Mono', monospace" }}>
                  Distance to Earth
                </Typography>
                <Typography sx={{ fontFamily: "'Space Mono', monospace" }}>
                  : {a.close_approach_data[0]?.miss_distance.kilometers} km
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={() => handleCompareToggle(a.id)}
                  variant="contained"
                  sx={{
                    fontFamily: "'Space Mono', monospace",
                    backgroundColor: addedAsteroids.includes(a.id)
                      ? "#cce8cc"
                      : "#d0f0ff",
                    color: "black",
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  {addedAsteroids.includes(a.id)
                    ? "Added!"
                    : "Add to Compare"}
                </Button>

                <Button
                  onClick={() =>
                    navigate(`/lookup/${a.id}`, { state: { asteroid: a } })
                  }
                  variant="outlined"
                  sx={{
                    fontFamily: "'Space Mono', monospace",
                    color: "white",
                    borderColor: "white",
                    textTransform: "none",
                  }}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      />
    </>
  ); 
};

export default FeedCard;
