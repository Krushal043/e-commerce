import React from "react";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();

  return (
    <AppBar position="fixed" color="primary" className="shadow-md">
      <Toolbar className="flex justify-between items-center">
        <Typography variant="h6" className="flex-grow">
          My E-Commerce
        </Typography>
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/cart" passHref>
            <Button color="inherit" className="flex gap-1">
              <label>Cart</label>
              {cart?.length > 0 && (
                <Badge
                  badgeContent={cart.length}
                  color="secondary"
                  className="ml-2"
                />
              )}
            </Button>
          </Link>
          <Link href="/order" passHref>
            <Button color="inherit">Order</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
