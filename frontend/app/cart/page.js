"use client";

import { useCart } from "../../context/CartContext";
import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function CartPage() {
  const { cart, total, clearCart } = useCart();

  return (
    <Container>
      <Typography variant="h4">Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Cart is empty</Typography>
      ) : (
        cart.map((item) => (
          <div key={item._id}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>${item.price}</Typography>
          </div>
        ))
      )}
      <Typography variant="h5">Total: ${total}</Typography>
      <Link href="/order">
        <Button variant="contained" color="primary">
          Place Order
        </Button>
      </Link>
      <Button variant="contained" color="secondary" onClick={clearCart}>
        Clear Cart
      </Button>
    </Container>
  );
}
