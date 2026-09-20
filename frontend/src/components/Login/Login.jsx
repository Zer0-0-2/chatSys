import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import "./Login.scss";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
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
      const endpoint = isRegistering
        ? "http://localhost:8080/register"
        : "http://localhost:8080/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Request failed");
      }

      const data = await response.json();

      if (isRegistering) {
        setIsRegistering(false);
        setSuccessMessage("Account created. Please log in.");
        setOpenSnackBar(true);
        setFormData({ username: "", password: "" });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      onLogin(data);
      setSuccessMessage("Login successful");
      setOpenSnackBar(true);
    } catch (error) {
      setSuccessMessage(error.message || "Something went wrong");
      setOpenSnackBar(true);
    }
  }

  return (
    <div className="login-page">
      <Box className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{isRegistering ? "Create Account" : "Login"}</h2>

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
            {isRegistering ? "Create Account" : "Login"}
          </Button>

          <Button
            type="button"
            variant="text"
            onClick={() => setIsRegistering((prev) => !prev)}
            className="switch-mode"
          >
            {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
          </Button>
        </form>
      </Box>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert severity={successMessage.includes("failed") || successMessage.includes("wrong") || successMessage.includes("not found") ? "error" : "success"}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;