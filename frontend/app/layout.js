"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../styles/theme.js";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
