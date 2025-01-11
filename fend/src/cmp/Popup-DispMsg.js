import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function DispMsgPopup({msg}) {
    useEffect(()=>{
        setIsOpen(true); 
    },[msg])
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true); 
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const buttonRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

 
  return (
    <Box>
    {/* Button to display */}
    <Button variant="outlined" color="secondary" onClick={openPopup}
           sx={{
           mb: 2,
           position:'fixed',
           top:'200px',
           right:'30px',
          backgroundColor: "#FFD700", // Gold color for the button
          fontSize: "1.2rem", // Increase font size of the button
        }}
      >
        {(msg=="")?<NotificationsNoneIcon/>
       : <NotificationsIcon/>}
        Notification
      </Button>
        
    {/* Disclaimer Popup */}
      <Dialog
        open={isOpen}
        onClose={closePopup}
        maxWidth="sm"
        fullWidth
        aria-labelledby="disclaimer-title"
       >
        <DialogTitle
          id="disclaimer-title"
          sx={{
            backgroundColor: "#FFD700", // Gold color for the header
            color: "white",
            fontSize: "1.5rem", // Larger title size
            fontWeight: "bold", // Bold title
          }}
        >
   Notification        
   </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#333", // Dark background for content area
            color: "white",
            fontSize: "1.1rem", // Larger text size for content
          }}
        >
          <Typography variant="body1" paragraph>
           {msg}
          </Typography>
          </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#FFD700", // Gold background for actions section
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            ref={buttonRef}
            onClick={closePopup}
            sx={{
              backgroundColor: "#FFD700", // Gold color for the button
              color: "black", // Black text color
              fontSize: "1.1rem", // Larger button font size
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DispMsgPopup;
