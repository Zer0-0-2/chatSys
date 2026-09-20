import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import "./Login.scss";

function Login({ onLogin }) {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userData = await response.json();
      localStorage.setItem("token", userData.token);
      localStorage.setItem("username", userData.username);
      onLogin(userData);
      setSuccessMessage("Login successful");
      setOpenSnackBar(true);
    } catch (error) {
      setSuccessMessage("Login failed");
      setOpenSnackBar(true);
    }
  }

  return (
    <div className="login-page">
      <Box className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <TextField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <Button
            type="button"
            variant="text"
            onClick={() => setShowPassword((prev) => !prev)}
            className="toggle-password"
          >
            {showPassword ? "Hide" : "Show"}
          </Button>

          <Button type="submit" variant="contained" className="login-button">
            Login
          </Button>
        </form>
      </Box>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert severity={successMessage.includes("failed") ? "error" : "success"}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;