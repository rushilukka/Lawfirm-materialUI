import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function DispMsgPopup({ msg }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // (msg == "No Notification")?setIsOpen(false):setIsOpen(true);
    setIsOpen(msg !== "No Notification");
  }, [msg]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const buttonRef = useRef(null);

  return (
    <Box>
      {/* Notification Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setIsOpen(true)}
        sx={{
          mb: 2,
          position: "fixed",
          top: "200px",
          right: "30px",
          backgroundColor: "#FFC107", // Vibrant yellow
          color: "black",
          fontSize: "1.2rem",
          border: "none",
          '&:hover': {
            backgroundColor: "#FFB300", // Slightly darker yellow on hover
          },
        }}
      >
        {msg === "No Notification" ? <NotificationsNoneIcon /> : <NotificationsIcon />}
        Notification
      </Button>

      {/* Notification Dialog */}
      <Dialog
        open={isOpen}
        onClose={closePopup}
        sx={{
            borderRadius:'12px',
        }}
        maxWidth="sm"
        fullWidth
        aria-labelledby="notification-dialog-title"
      >
        {/* Dialog Header */}
        <DialogTitle
          id="notification-dialog-title"
          sx={{

              backgroundColor: "#FFC107", // Gold
            color: "#000", // Black text
            fontSize: "1.6rem",
            fontWeight: "bold",
            textAlign: "center",
            padding: "16px 24px",
            
          }}
        >
          📢 Notification
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent
          sx={{
            // backgroundColor: "#F9F9F9", // Light background for content
            color: "#333", // Dark text color
            fontSize: "1.2rem",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <Typography
            variant="body1"
            paragraph
            sx={{
              marginBottom: "16px",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
          >
            {msg}
          </Typography>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions
          sx={{
            // backgroundColor: "#FFC107",
            justifyContent: "center",
            padding: "16px 24px",
          }}
        >
          <Button
            variant="contained"
            onClick={closePopup}
            sx={{
              backgroundColor: "#FFB300", // Vibrant yellow
              color: "#000", // Black text
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 24px",
              '&:hover': {
                backgroundColor: "#FFA000", // Slightly darker shade
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DispMsgPopup;
