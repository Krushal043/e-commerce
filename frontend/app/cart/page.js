"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  Container,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

export default function CartPage() {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [quantityError, setQuantityError] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const handleQuantityChange = (itemId, value) => {
    if (value > 10 && itemId) {
      setId(itemId);
      setQuantityError("Maximum quantity is 10");
    } else {
      setQuantityError("");
      setLoading(true);
      updateQuantity(itemId, value).finally(() => setLoading(false)); // Ensure loading state is reset
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setLoading(true);
    removeFromCart(itemId).finally(() => setLoading(false));
  };

  const handleClearCart = () => {
    setLoading(true);
    clearCart().finally(() => setLoading(false));
  };

  return (
    <Container>
      <Typography variant="h4" className="mb-4 mt-[70px]">
        Your Cart
      </Typography>

      <div className="flex justify-between mb-4">
        <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
        {cart.length !== 0 && (
          <div>
            <Link href="/order">
              <Button variant="contained" color="primary" className="mr-2">
                Place Order
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      ) : cart.length === 0 ? (
        <Typography variant="h6">Cart is empty</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between mb-4 border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">${item.price}</Typography>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                    variant="outlined"
                    inputProps={{ min: 1 }}
                    size="small"
                    className="w-16"
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </Button>
                </div>
                {quantityError && item?._id === id && (
                  <Typography variant="body2" color="error">
                    {quantityError}
                  </Typography>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </Container>
  );
}
