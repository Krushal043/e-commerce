import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My E-Commerce
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/cart" passHref>
          <Button color="inherit">Cart</Button>
        </Link>
        <Link href="/order" passHref>
          <Button color="inherit">Order</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
