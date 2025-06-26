import React, { useState } from 'react';
import api from '../services/api';
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Link,
    Paper,
    Pagination,
} from '@mui/material';



const Feed: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [asteroids, setAsteroids] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAsteroids = async () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await api.get('/neo/feed', {
                params: {
                    start: startDate,
                    end: endDate,
                },
            });

            const raw = res.data.near_earth_objects;
            const flatList = Object.values(raw).flat();
            setAsteroids(flatList);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentAsteroids = asteroids.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(asteroids.length / itemsPerPage);
    return (
        <Container maxWidth="md">
            <Typography variant="h3" gutterBottom>Asteroid Feed</Typography>

            <TextField
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ mr: 2 }}
            />
            <TextField
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ mr: 2 }}
            />
            <Button variant="contained" onClick={fetchAsteroids}>Fetch Feed</Button>

            {loading && <CircularProgress sx={{ mt: 2 }} />}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            {currentAsteroids.map((a) => (
                <Paper elevation={3}>
                    <Card key={a.id} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography>ID: {a.id}</Typography>
                            <Typography>Name: {a.name}</Typography>
                            <Link href="{a.nasa_jpl_url}" underline="hover">
                                Nasa Jpl Url: {"Click here"}
                            </Link>
                            <Typography>Absolute Magnitude H: {a.absolute_magnitude_h}</Typography>
                        </CardContent>
                    </Card>

                    <Card key={a.id} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography>
                                Minimum Diameter: {a.estimated_diameter.kilometers.estimated_diameter_min} km
                            </Typography>
                            <Typography>
                                Maximum Diameter: {a.estimated_diameter.kilometers.estimated_diameter_max} km
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card key={a.id} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography>
                                Orbiting Body: {a.close_approach_data[0]?.orbiting_body}
                            </Typography>
                            <Typography>
                                Hazardous: {a.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                            </Typography>
                            <Typography>
                                Sentry Object : {a.is_sentry_object ? "Yes" : "No" }
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card key={a.id} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography>
                                Date of Approach: {a.close_approach_data[0].close_approach_date}
                            </Typography>
                            <Typography>
                                Speed: {a.close_approach_data[0]?.relative_velocity.kilometers_per_hour} km/h
                            </Typography>
                            <Typography>
                                Closest distance to Earth: {a.close_approach_data[0]?.miss_distance.kilometers} km
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
            ))}
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                sx={{ mt: 4 }}
                color="primary"
            />
        </Container>

    );
};

export default Feed;