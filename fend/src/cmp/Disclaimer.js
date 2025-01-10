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

function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }

    // Cleanup effect when the component unmounts
    return () => {
      document.body.classList.remove("popup-open");
    };
  }, [isOpen]);

  // Learn Event default Enter click
  const buttonRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
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
      {/* Disclaimer Button */}
      <Button
        variant="contained"
        color="warning"
        onClick={openPopup}
        sx={{
          display: { xs: "none", lg: "block" },
          mb: 2,
          backgroundColor: "#FFD700", // Gold color for the button
          fontSize: "1.2rem", // Increase font size of the button
        }}
      >
        Disclaimer
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
          Disclaimer
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#333", // Dark background for content area
            color: "white",
            fontSize: "1.1rem", // Larger text size for content
          }}
        >
          <Typography variant="body1" paragraph>
            I am not a lawyer, but I can provide some general information on common
            disclaimers that law firms often include on their websites in India. However,
            it's essential to consult with legal counsel to ensure that your specific
            disclaimer meets all legal requirements and addresses your firm's unique needs.
            Here are some typical disclaimers that you might consider:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="No Attorney-Client Relationship"
                secondary="Visiting the website or using its information does not create an attorney-client relationship between the visitor and the law firm."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Informational Purposes Only"
                secondary="The content on the website is for informational purposes only and should not be construed as legal advice. Encourage visitors to seek legal advice from a qualified attorney for their specific situations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Jurisdictional Limitations"
                secondary="Mention any limitations on the geographic areas or jurisdictions in which your firm practices law. This can help manage expectations of potential clients."
              />
            </ListItem>
          </List>
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

export default Disclaimer;
