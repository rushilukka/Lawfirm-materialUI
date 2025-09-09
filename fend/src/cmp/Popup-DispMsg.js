import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Snackbar, Alert, Button } from "@mui/material";

function DispMsgToast({ msg }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (msg && msg !== "No Notification") {
      setOpen(true);
    }
  }, [msg]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return; // prevent close on outside click
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          mb: 2,
          position: "fixed",
          top: "200px",
          right: "30px",
          backgroundColor: theme.palette.accent.main,
          color: theme.palette.custom.black.main,
          border: "none",
          "&:hover": {
            backgroundColor: theme.palette.accent.dark,
          },
        }}
      >
        Notification
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={msg.includes("Error") ? "error" : "info"}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default DispMsgToast;
