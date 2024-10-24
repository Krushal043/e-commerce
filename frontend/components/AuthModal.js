import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { loginUser, registerUser } from "@/services/api";

const AuthModal = ({ open, handleClose, handleLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    resetForm();
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const validateForm = () => {
    if (isLogin) {
      return email.trim() !== "" && password.trim() !== "";
    } else {
      return (
        username.trim() !== "" && email.trim() !== "" && password.trim() !== ""
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      if (isLogin) {
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.token);
        handleLoginSuccess();
      } else {
        await registerUser({ username, email, password });
        handleToggle();
      }
      handleClose();
    } catch (error) {
      const apiErrorMessage =
        error.response?.data?.message || "Something went wrong.";
      setErrorMessage(apiErrorMessage);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
      <DialogContent>
        {errorMessage && ( // Display error message if exists
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
          )}
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Typography variant="body2" align="center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button color="primary" onClick={handleToggle}>
              {isLogin ? "Register" : "Login"}
            </Button>
          </Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
