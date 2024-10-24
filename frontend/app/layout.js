"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { CartProvider } from "../context/CartContext";
import theme from "../styles/theme.js";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <Header />
            <main style={{ minHeight: "calc(100vh - 150px)" }}>
              {" "}
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
