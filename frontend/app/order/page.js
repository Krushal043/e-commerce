"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { placeOrder } from "../../services/api";
import { useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";

export default function OrderPage() {
  const { cart, total, clearCart } = useCart();
  const [isPlaced, setIsPlaced] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    await placeOrder({ products: cart, total });
    clearCart();
    setIsPlaced(true);
    setTimeout(() => router.push("/"), 3000);
  };

  return (
    <Container>
      {isPlaced ? (
        <Typography variant="h4">Order Placed! Redirecting...</Typography>
      ) : (
        <>
          <Typography variant="h4">Order Summary</Typography>
          <Typography>Total: ${total}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
          >
            Confirm Order
          </Button>
        </>
      )}
    </Container>
  );
}
