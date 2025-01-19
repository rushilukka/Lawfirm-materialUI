// components/Loader.js
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        position: "fixed", // Ensure it covers the whole screen
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Light overlay
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300, // High zIndex to ensure it appears above other elements
      }}
    >
      <CircularProgress color="secondary" />
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ marginTop: 2 }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
