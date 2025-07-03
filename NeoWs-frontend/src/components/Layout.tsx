import React from 'react';
import NavBar from './NavBar';
import { Box, Toolbar } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#260038' }}>
      <NavBar />
      <Toolbar /> {/* Push content below AppBar */}
      <Box sx={{ px: 2, py: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
