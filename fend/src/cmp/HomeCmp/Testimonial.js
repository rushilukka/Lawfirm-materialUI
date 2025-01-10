import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    feedback: 'The team provided excellent guidance during my property dispute. Highly professional and reliable.',
    designation: 'Businessman',
  },
  {
    name: 'Priya Sharma',
    feedback: 'Outstanding support during my divorce case. They truly care about their clients.',
    designation: 'Teacher',
  },
  {
    name: 'Amit Singh',
    feedback: 'Their corporate law expertise helped us navigate complex legal requirements seamlessly.',
    designation: 'Entrepreneur',
  },
  {
    name: 'Neha Verma',
    feedback: 'The criminal defense team is incredibly dedicated and skilled. I felt supported throughout my case.',
    designation: 'Engineer',
  },
  {
    name: 'Arjun Mehta',
    feedback: 'I appreciated their transparent and effective approach to resolving my legal issues.',
    designation: 'Consultant',
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ padding: '40px 20px' }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Client Testimonials
      </Typography>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', marginRight: '16px' }}>
                    <AccountCircle fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {testimonial.designation}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2">"{testimonial.feedback}"</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
