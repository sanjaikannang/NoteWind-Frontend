import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import Base from "../base/Base";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };
    const res = await fetch(
      `https://sanjaikannang-notemakingapplication.onrender.com/user/login`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);

      if (data.result && data.result._id) {
        localStorage.setItem("userId", data.result._id);
        navigate("/notes");
      } else {
        setErr("User information is missing or invalid!");
      }
    } else {
      setErr("Invalid credentials. Please check your email and password!");
    }
  };

  return (
    <Base>
      <div>
        <br />
        <br />
        <Container component="main" maxWidth="lg">
          <br />
          <br />
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundImage: "url('/images/login.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Box>
            </Grid>

            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  p: 4,
                }}
              >
                <Typography variant="h4" sx={{ color: "black" }}>
                  Welcome to NoteWind!
                </Typography>
                <br />
                <Typography variant="h4">Login</Typography>
                <br />
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ my: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ my: 2 }}
                />
                <br />
                <Button
                  onClick={handleLogin}
                  variant="contained"
                  style={{
                    backgroundColor: "#00BFA5",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "14px",
                    borderRadius: "25px",
                  }}
                >
                  Login
                </Button>
                <br />
                {err && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {err}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    Signup here.
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Base>
  );
};

export default Login;
