import { Route, Routes } from 'react-router-dom';
import AsteroidLookUp from './pages/AsteroidLookUp';
import Layout from './components/Layout';
import AsteroidFeed from './pages/AsteroidFeed';
import FeedCard from './pages/FeedCard';
import CompareAsteroids from './pages/CompareAsteroids';
import { Box } from '@mui/material';

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<AsteroidFeed />} />
        <Route path="/feedCard" element={<FeedCard />} />
        <Route path="/compareAsteroids" element={<CompareAsteroids />} />
        <Route path="/lookup/:id" element={<AsteroidLookUp />} />
      </Routes>
    </Box>
  );
}

export default App;
