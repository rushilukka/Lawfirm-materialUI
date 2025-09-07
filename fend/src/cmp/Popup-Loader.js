import React from "react";
import { useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ message = "Loading..." }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "fixed", // Ensure it covers the whole screen
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.custom.lighterWhite.main,
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
