import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MainPage = () => {
  return (
    <Box sx={{ textAlign: 'left', marginTop: '20px', marginLeft: '20px' }}>
      <Typography variant="h3" fontWeight="bold" sx={{ color: 'white', mb: 4 }}>
        Welcome to Zonda Sales System
      </Typography>
      <Typography variant="h6" sx={{ color: 'gray.400' }}>
        Please select a customer
      </Typography>
    </Box>
  );
};

export default MainPage; 