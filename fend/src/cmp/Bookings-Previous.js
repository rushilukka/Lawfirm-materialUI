// src/components/PreviousTasks.js
import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const PreviousTasks = ({ pastTasks }) => {
  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h4" gutterBottom>
        Previous Tasks
      </Typography>
      <List>
        {pastTasks.map((task, index) => (
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

export default PreviousTasks;
