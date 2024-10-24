// components/Header.js

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { cart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  console.log({ isAuthenticated });

  const router = useRouter();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const handelLogout = () => {
    setIsLogin(false);
    logout();
    router.push("/");
    localStorage.removeItem("token");
  };

  return (
    <>
      <AppBar position="fixed" color="primary" className="shadow-md">
        <Toolbar className="flex justify-between items-center">
          <Link href="/" passHref>
            <Typography variant="h6" className="flex-grow">
              My E-Commerce
            </Typography>
          </Link>
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
            {!isAuthenticated ? (
              <Button color="inherit" onClick={handleOpen}>
                Login/Register
              </Button>
            ) : (
              <Button color="inherit" onClick={handelLogout}>
                Logout
              </Button>
            )}{" "}
          </div>
        </Toolbar>
      </AppBar>

      {/* Auth Modal */}
      <AuthModal
        open={modalOpen}
        handleClose={handleClose}
        handleLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
