import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setError("");

    // Dummy admin credentials
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    setTimeout(() => {
      if (email === adminEmail && password === adminPassword) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          className="mt-4"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Forgot password? <span className="text-blue-600 cursor-pointer">Reset</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
