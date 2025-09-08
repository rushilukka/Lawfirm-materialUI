import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
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

function Disclaimer() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const buttonRef = useRef(null);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
    return () => document.body.classList.remove("popup-open");
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && buttonRef.current) {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box>
      {/* Trigger Button (desktop only) */}
      <Button
        variant="contained"
        onClick={openPopup}
        sx={{
          display: { xs: "none", lg: "inline-flex" },
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.custom.white.main,
          fontSize: theme.typography.button.fontSize,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Disclaimer
      </Button>

      {/* Disclaimer Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => {}} // disable outside click & ESC close
        maxWidth="sm"
        fullWidth
        aria-labelledby="disclaimer-title"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            margin: { xs: 2, sm: 4 },
            backgroundColor: theme.palette.custom.white.main,
            boxShadow: "0px 8px 32px rgba(0,0,0,0.25)",
            maxHeight: "90vh", // responsive height limit
            display: "flex",
            flexDirection: "column",
          },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
      >
        <DialogTitle
          id="disclaimer-title"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.custom.white.main,
            fontWeight: theme.typography.h2.fontWeight,
            fontSize: theme.typography.h2.fontSize,
            textAlign: "center",
            py: 2,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          Disclaimer
        </DialogTitle>

        {/* Scrollable Content */}
        <DialogContent
          dividers
          sx={{
            color: theme.palette.primary.main,
            fontSize: theme.typography.body1.fontSize,
            p: { xs: 2, sm: 3 },
            overflowY: "auto",
          }}
        >
          <Typography variant="body1" paragraph>
            I am not a lawyer, but I can provide some general information on
            common disclaimers that law firms often include on their websites in
            India. However, it’s essential to consult with legal counsel to
            ensure your specific disclaimer meets legal requirements and
            addresses your firm’s unique needs. Typical disclaimers include:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="No Attorney-Client Relationship"
                secondary="Visiting the website or using its information does not create an attorney-client relationship."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Informational Purposes Only"
                secondary="The content on the website is for informational purposes only and should not be construed as legal advice."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Jurisdictional Limitations"
                secondary="Mention any limitations on the jurisdictions in which your firm practices law to manage expectations."
              />
            </ListItem>
          </List>
        </DialogContent>

        {/* Sticky Accept Button */}
        <DialogActions
          sx={{
            backgroundColor: theme.palette.primary.main,
            justifyContent: "center",
            py: 2,
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            position: "sticky",
            bottom: 0,
          }}
        >
          <Button
            variant="contained"
            ref={buttonRef}
            onClick={closePopup}
            sx={{
              backgroundColor: theme.palette.custom.white.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              px: 4,
              "&:hover": {
                backgroundColor: theme.palette.custom.white.main,
                opacity: 0.9,
              },
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Disclaimer;
