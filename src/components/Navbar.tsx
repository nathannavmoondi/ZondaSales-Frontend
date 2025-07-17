import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

const Navbar = () => (
  <AppBar position="static" sx={{ bgcolor: '#1565c0' }}>
    <Toolbar>
      <img src="/percentage-favicon.svg" alt="Logo" height={32} style={{ marginRight: 12, verticalAlign: 'middle' }} />
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', display: 'inline', verticalAlign: 'middle' }}>
        Zonda Sales System (Interview Test)
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <a href="https://github.com/nathannavmoondi/ZondaSales-Frontend" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold', mr: 1 }}>
            Nathan Moondi
          </Typography>
          <IconButton size="small" sx={{ color: 'white' }}>
            <GitHubIcon fontSize="medium" />
          </IconButton>
        </a>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
