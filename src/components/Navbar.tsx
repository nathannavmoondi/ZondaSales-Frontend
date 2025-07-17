import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => (
  <AppBar position="static" sx={{ bgcolor: '#1565c0' }}>
    <Toolbar>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
        Zonda Sales System (Interview Test)
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
