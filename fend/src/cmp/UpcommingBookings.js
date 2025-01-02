// src/components/UpcomingTasks.js
import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const UpcomingTasks = ({ upcomingTasks }) => {
  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Tasks
      </Typography>
      <List>
        {upcomingTasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={task.details}
              secondary={`Date: ${task.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UpcomingTasks;
