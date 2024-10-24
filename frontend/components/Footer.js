import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          © {new Date().getFullYear()} My E-Commerce. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
