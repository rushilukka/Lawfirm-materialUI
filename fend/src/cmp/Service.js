import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import { FaGavel, FaBuilding, FaShieldAlt, FaHome } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const services = [
  { 
    icon: <FaGavel />, 
    title: 'Family Law', 
    description: 'Expert advice on family matters.',
    content: (
      <ul>
        <li>Legal assistance for divorce and separation.</li>
        <li>Child custody and visitation rights guidance.</li>
        <li>Support for adoption and surrogacy procedures.</li>
        <li>Alimony and spousal support advice.</li>
        <li>Domestic violence protection and restraining orders.</li>
      </ul>
    ),
  },
  { 
    icon: <FaBuilding />, 
    title: 'Corporate Law', 
    description: 'Guidance for businesses and corporations.',
    content: (
      <ul>
        <li>Company formation and registration services.</li>
        <li>Drafting and reviewing business contracts.</li>
        <li>Compliance with corporate governance laws.</li>
        <li>Mergers, acquisitions, and restructuring guidance.</li>
        <li>Legal representation in corporate disputes.</li>
      </ul>
    ),
  },
  { 
    icon: <FaShieldAlt />, 
    title: 'Criminal Defense', 
    description: 'Strong representation in criminal cases.',
    content: (
      <ul>
        <li>Representation in criminal trials and hearings.</li>
        <li>Legal defense for white-collar crimes.</li>
        <li>Assistance with bail and bond hearings.</li>
        <li>Support for plea negotiations and settlements.</li>
        <li>Post-conviction appeals and legal reviews.</li>
      </ul>
    ),
  },
  { 
    icon: <FaHome />, 
    title: 'Property Disputes', 
    description: 'Solutions for property-related issues.',
    content: (
      <ul>
        <li>Resolution of property ownership disputes.</li>
        <li>Legal support for landlord-tenant conflicts.</li>
        <li>Assistance with property transfers and deeds.</li>
        <li>Guidance on real estate transactions and contracts.</li>
        <li>Handling of inheritance and succession property cases.</li>
      </ul>
    ),
  },
];

const Services = () => {
  const theme = useTheme(); // Access the theme object
  const [selectedService, setSelectedService] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedService(newValue);
  };

  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: selectedService === index ? theme.palette.action.hover : 'inherit',
              }}
              onClick={() => setSelectedService(index)}
            >
              <Box sx={{ fontSize: '2rem', color: theme.palette.custom.primary2 }}>{service.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2">{service.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          {services[selectedService].title}
        </Typography>
        <Typography variant="body1">{services[selectedService].content}</Typography>
      </Paper>
    </Box>
  );
};

export default Services;
