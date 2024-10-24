"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { placeOrder } from "../../services/api";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function OrderPage() {
  const { cart, total, clearCart } = useCart();
  const [isPlaced, setIsPlaced] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.name) {
      newErrors.name = "Name is required";
    }
    if (!userDetails.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!userDetails.address) {
      newErrors.address = "Shipping address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      await placeOrder({ products: cart, total, user: userDetails });
      clearCart();
      setIsPlaced(true);
      handleClose();
      setTimeout(() => router.push("/"), 3000);
    }
  };

  return (
    <ProtectedRoute>
      <Container>
        {isPlaced ? (
          <Typography variant="h4" className="text-center mt-[70px]">
            Order Placed! Redirecting...
          </Typography>
        ) : (
          <>
            <div className="flex justify-between items-center mt-[70px] mb-4">
              <Typography variant="h4">Order Summary</Typography>
              {cart.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Confirm Order
                </Button>
              )}
            </div>

            <Typography variant="h6" className="my-2">
              Total: ${total.toFixed(2)}
            </Typography>

            {/* Order Summary */}
            <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between mb-2 border-b py-2"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/64"}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4 rounded"
                    />
                    <div className="flex-1">
                      <Typography>{item.name}</Typography>
                      <Typography variant="body2">
                        Quantity: {item.quantity}
                      </Typography>
                    </div>
                    <Typography>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body1">Your cart is empty.</Typography>
              )}
              <Typography variant="h6" className="mt-2">
                Total: ${total.toFixed(2)}
              </Typography>
            </div>

            {/* Dialog for User Details */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Enter Your Details</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={userDetails.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      name="email"
                      value={userDetails.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Shipping Address"
                      variant="outlined"
                      fullWidth
                      name="address"
                      value={userDetails.address}
                      onChange={handleChange}
                      error={Boolean(errors.address)}
                      helperText={errors.address}
                      required
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handlePlaceOrder} color="primary">
                  Place Order
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </ProtectedRoute>
  );
}
