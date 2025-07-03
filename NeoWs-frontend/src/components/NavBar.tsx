import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavBar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" elevation={3} sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ color: 'rgb(45, 3, 64)', textAlign: 'center' }}
          >
            Near Earth Objects
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
