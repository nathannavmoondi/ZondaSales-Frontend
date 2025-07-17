import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => (
  <AppBar position="static" sx={{ bgcolor: '#1565c0' }}>
    <Toolbar>
      <img src="/percentage-favicon.svg" alt="Logo" height={32} style={{ marginRight: 12, verticalAlign: 'middle' }} />
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', display: 'inline', verticalAlign: 'middle' }}>
        Zonda Sales System (Interview Test)
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
