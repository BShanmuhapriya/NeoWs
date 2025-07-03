import { Box, Typography, Chip } from "@mui/material";
import { useLocation } from "react-router-dom";
import MagnitudeChart from '../visualization/MagnitudeChart';
import ScatterPlot from '../visualization/ScatterPlot';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const fieldGroups = [
    [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "close_approach_data[0].close_approach_date", label: "Date of Approach" },
        { key: "close_approach_data[0].orbiting_body", label: "Orbiting Body" }
    ],
    [
        { key: "absolute_magnitude_h", label: "Absolute Magnitude" },
        { key: "is_potentially_hazardous_asteroid", label: "Hazardous" },
        { key: "is_sentry_object", label: "Sentry Object" },
        { key: "estimated_diameter.kilometers.estimated_diameter_min", label: "Min Diameter" }
    ],
    [
        { key: "estimated_diameter.kilometers.estimated_diameter_max", label: "Max Diameter" },
        { key: "close_approach_data[0].relative_velocity.kilometers_per_hour", label: "Speed" },
        { key: "close_approach_data[0].miss_distance.kilometers", label: "Distance to Earth" }
    ]
];

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

const colors = ["#00bfff", "#ffb400", "#00e676"];

const CompareAsteroids = () => {
    const location = useLocation();
    const { asteroids } = location.state || {};
    const navigate = useNavigate();


    if (!asteroids || asteroids.length < 3) {
        return <div>Please select 3 asteroids to compare.</div>;
    }

    const magnitudeData = asteroids.map((a: Asteroid) => ({
        name: a.name,
        absolute_magnitude_h: a.absolute_magnitude_h,
    }));

    const scatterData = asteroids.map((a: Asteroid) => ({
        name: a.name,
        missDistanceKm: parseFloat(a.close_approach_data[0]?.miss_distance.kilometers || "0"),
        speedKph: parseFloat(a.close_approach_data[0]?.relative_velocity.kilometers_per_hour || "0"),
    }));

    return (
        <Box
            sx={{
                color: "white",
                px: 4,
                mt: 0,
                pt: 0,
                fontFamily: "'Space Mono', monospace",
                boxSizing: 'border-box',
                minHeight: '100vh',
                overflowX: 'hidden', // optional, avoids side scroll
            }}
        >
            <Typography variant="h3" sx={{ textAlign: 'center', fontFamily: "'Space Mono', monospace" }}>Compare Asteroids</Typography>
            {/* ASTEROID NAMES HEADER ROW */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                    px: 2,
                }}
            >
                <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}>
                    {asteroids.map((asteroid: Asteroid, idx: number) => (
                        <Box key={asteroid.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Chip
                                size="small"
                                sx={{
                                    backgroundColor: colors[idx],
                                    width: 10,
                                    height: 10,
                                    fontFamily: "'Space Mono', monospace"
                                }}
                            />
                            <Typography sx={{fontFamily: "'Space Mono', monospace"}}>{asteroid.name}</Typography>
                        </Box>
                    ))}
                </Box>

                <IconButton
                    onClick={() => navigate('/')}
                    sx={{
                        color: "white",
                        ml: 2,
                    }}
                    title="Go back"
                >
                    <DeleteIcon />
                </IconButton>
            </Box>

            {/* CHARTS */}
            <Box sx={{ display: "flex", gap: 4, justifyContent: "center", mt: 6 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ mt: 0, mb: 2,fontFamily: "'Space Mono', monospace" }}>Absolute Magnitude Comparison</Typography>
                    <MagnitudeChart data={magnitudeData} colors={colors} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>Speed vs Distance to Earth</Typography>
                    <ScatterPlot data={scatterData} colors={colors} />
                </Box>
            </Box>
            {fieldGroups.map((group, rowIdx) => (
                <Box
                    key={rowIdx}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 4,
                        px: 2, // optional side padding
                    }}
                >
                    {group.map((field) => (
                        <Box key={field.key} sx={{ flex: 1, px: 2 }}>
                            <Typography fontWeight="bold" mb={1} sx={{fontFamily: "'Space Mono', monospace"}}>
                                {field.label}
                            </Typography>
                            {asteroids.map((asteroid: Asteroid, idx: number) => {
                                const keys = field.key.split(".");
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                let value: any = asteroid;
                                for (const k of keys) {
                                    const indexMatch = k.match(/\[(\d+)\]/);
                                    if (indexMatch) {
                                        const arrayKey = k.split("[")[0];
                                        const index = parseInt(indexMatch[1], 10);
                                        value = value?.[arrayKey]?.[index];
                                    } else {
                                        value = value?.[k];
                                    }
                                }

                                const displayValue =
                                    typeof value === "boolean" ? (value ? "Yes" : "No") : value;

                                const unit =
                                    field.label.includes("Speed") ? " km/h" :
                                        field.label.includes("Diameter") || field.label.includes("Distance") ? " km" : "";

                                return (
                                    <Box key={`${asteroid.id}-${field.key}`} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                        <Chip
                                            size="small"
                                            sx={{
                                                backgroundColor: colors[idx],
                                                width: 10,
                                                height: 10,
                                                mr: 1,
                                                fontFamily: "'Space Mono', monospace"
                                            }}
                                        />
                                        <Typography sx={{fontFamily: "'Space Mono', monospace"}}>{displayValue}{unit}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    ))}
                </Box>
            ))}



        </Box>
    );
};

export default CompareAsteroids;
