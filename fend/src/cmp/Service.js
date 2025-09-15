import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Tabs, Tab, useMediaQuery } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedService, setSelectedService] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedService(newValue);
  };

  const renderDesktopView = () => (
    <Grid container spacing={4} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} md={4}>
        {services.map((service, index) => (
          <Paper
            key={index}
            elevation={selectedService === index ? 6 : 2}
            sx={{
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '20px',
              borderLeft: selectedService === index ? `5px solid ${theme.palette.primary.main}` : 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[8],
              },
            }}
            onClick={() => setSelectedService(index)}
          >
            <Box sx={{ fontSize: '2.5rem', color: theme.palette.primary.main }}>{service.icon}</Box>
            <Typography variant="h6" gutterBottom>
              {service.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">{service.description}</Typography>
          </Paper>
        ))}
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ padding: '30px', height: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main, marginBottom: '20px' }}>
            {services[selectedService].title}
          </Typography>
          <Box sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {services[selectedService].content}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderMobileView = () => (
    <>
      <Tabs
        value={selectedService}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Services tabs"
        sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}
      >
        {services.map((service, index) => (
          <Tab key={index} icon={service.icon} label={service.title} />
        ))}
      </Tabs>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          {services[selectedService].title}
        </Typography>
        {services[selectedService].content}
      </Paper>
    </>
  );

  return (
    <Box sx={{ padding: isMobile ? '20px' : '40px', flexGrow: 1 }}>
      <Typography variant="h2" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
        Our Services
      </Typography>
      {isMobile ? renderMobileView() : renderDesktopView()}
    </Box>
  );
};

export default Services;
