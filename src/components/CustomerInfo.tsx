import { useZondaSales } from '../context/ZondaSalesContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Divider from '@mui/material/Divider';

const CustomerInfo = () => {
  const { selectedCustomer } = useZondaSales();

  if (!selectedCustomer) {
    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          textAlign: 'center'
        }}
      >
        <Avatar sx={{ width: 80, height: 80, bgcolor: '#666', mb: 2 }}>
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h5" color="gray.400" gutterBottom>
          No Customer Selected
        </Typography>
        <Typography variant="body1" color="gray.500">
          Please select a customer from the dropdown to view their information
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Card sx={{ 
        bgcolor: 'black', 
        color: 'white', 
        mb: 4, 
        border: '1px solid #333',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ 
              width: 60, 
              height: 60, 
              bgcolor: '#1565c0', 
              mr: 3,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {selectedCustomer.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 0.5 }}>
                {selectedCustomer.name}
              </Typography>
              <Typography variant="body2" color="gray.400">
                Customer ID: {selectedCustomer.id}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ bgcolor: '#333', mb: 3 }} />
          
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <EmailIcon sx={{ color: '#1565c0', mr: 2, fontSize: 24 }} />
              <Box>
                <Typography variant="body2" color="gray.400" sx={{ mb: 0.5 }}>
                  Email Address
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {selectedCustomer.email}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ color: '#1565c0', mr: 2, fontSize: 24 }} />
              <Box>
                <Typography variant="body2" color="gray.400" sx={{ mb: 0.5 }}>
                  Phone Number
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {selectedCustomer.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomerInfo;
