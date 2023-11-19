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
  Divider,
} from "@mui/material";
import Base from "../base/Base";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const payload = {
      name,
      email,
      password,
    };
    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.token) {
        const userData = {
          name,
          email,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        setErr(data.error || "Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErr("Error during signup. Please try again.");
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
                  backgroundImage: "url('/images/signup.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Box>
            </Grid>

            <Grid item xs={12} md={1}>
              <Divider orientation="vertical" />
            </Grid>

            <Grid item xs={12} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  p: 3,
                }}
              >
                <Typography variant="h4" sx={{ color: "black" }}>
                  Welcome to NoteWind!
                </Typography>
                <br />
                <br />
                <Typography variant="h4">Signup</Typography>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ my: 2 }}
                />
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
                  onClick={handleSignup}
                  variant="contained"
                  style={{
                    backgroundColor: "#00BFA5",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "14px",
                    borderRadius: "25px",
                  }}
                >
                  Register
                </Button>
                {err && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {err}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login here.
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

export default Signup;
