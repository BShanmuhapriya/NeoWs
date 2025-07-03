import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AsteroidFeed: React.FC = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const navigate = useNavigate(); // ✅ Hook to navigate
    const handleFetch = () => {
        navigate('/feedCard', {
            state: {
                startDate,
                endDate
            }
        });
    };
    return (
        <>
            <Box
                component="img"
                src="/Asteroid.png"
                alt="asteroid"
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: '100%',
                    maxHeight: '100vh',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <Container maxWidth="md" sx={{ paddingTop: '50px', position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'grid', maxWidth: '450px' }}> {/* Shift left with ml (marginLeft) */}
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontFamily: "'Space Mono', monospace",
                            paddingBottom: '20px'
                        }}
                    >
                        Asteroid Feed
                    </Typography>

                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: "'Space Mono', monospace",
                            paddingBottom: '30px',
                            minWidth: '400px'
                        }}
                    >
                        This project utilizes NASA's NeoWs (Near Earth Object Web Service) API to fetch data about asteroids approaching Earth.
                        You can select a date range to explore detailed information such as each asteroid’s speed, distance from Earth, estimated size, and more.
                        Visualize and compare their characteristics to gain insight into potential hazards and celestial dynamics in real time.

                    </Typography>

                    <Typography sx={{ color: 'white', marginBottom: '10px', fontWeight: 'bold', width: '110px', fontFamily: "'Space Mono', monospace" }}>
                        Start Date:
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputProps={{
                            sx: {
                                color: 'white', // Input text color
                                '&::placeholder': {
                                    color: 'white',
                                    opacity: 1,
                                },
                                fontFamily: "'Space Mono', monospace"
                            },
                        }}
                        InputLabelProps={{
                            shrink: true,
                            style: { color: 'white' },
                        }}
                        sx={{
                            marginBottom: '20px',
                            backgroundColor: 'transparent',
                            width: '250px',
                            fontFamily: "'Space Mono', monospace",
                            border: '1.6px solid white',
                            input: {
                                color: 'white',
                            },
                            '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                filter: 'invert(1)', // makes icon white
                            },
                        }}
                    />


                    <Typography sx={{ color: 'white', marginBottom: '10px', fontWeight: 'bold', width: '100px', fontFamily: "'Space Mono', monospace" }}>
                        End Date:
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputProps={{
                            sx: {
                                color: 'white', // Input text color
                                '&::placeholder': {
                                    color: 'white',
                                    opacity: 1,
                                },
                                fontFamily: "'Space Mono', monospace"
                            },
                        }}
                        InputLabelProps={{
                            shrink: true,
                            style: { color: 'white' },
                        }}
                        sx={{
                            marginBottom: '20px',
                            backgroundColor: 'transparent',
                            width: '250px',
                            fontFamily: "'Space Mono', monospace",
                            border: '1.6px solid white',
                            input: {
                                color: 'white',
                            },
                            '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                filter: 'invert(1)', // makes icon white
                            },
                        }}
                    />


                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#ff4500', width: '100px' }}
                            onClick={handleFetch} // ✅ navigate on click
                        >
                            Fetch
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default AsteroidFeed;
