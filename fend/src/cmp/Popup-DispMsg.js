import React, { useState, useEffect, useRef } from "react";
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
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
          backgroundColor: theme.palette.accent.main,
          color: theme.palette.custom.black.main,
          fontSize: theme.typography.button.fontSize.md,
          border: "none",
          '&:hover': {
            backgroundColor: theme.palette.accent.dark,
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

              backgroundColor: theme.palette.accent.main,
            color: theme.palette.custom.black.main,
            fontSize: theme.typography.h2.fontSize.md,
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
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize.md,
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
              backgroundColor: theme.palette.accent.main,
              color: theme.palette.custom.black.main,
              fontSize: theme.typography.button.fontSize.md,
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 24px",
              '&:hover': {
                backgroundColor: theme.palette.accent.dark,
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
