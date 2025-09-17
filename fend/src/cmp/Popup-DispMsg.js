import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Snackbar, Alert, Button } from "@mui/material";

function DispMsgToast({ message, variant = 'info', autoHide = true }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway" && !autoHide) return;
    setOpen(false);
  };

  // Don't render anything if there's no message
  if (!message) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHide ? 4000 : null}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={variant}
        elevation={6}
        sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
  );
}

export { DispMsgToast as Popup };

export default DispMsgToast;
