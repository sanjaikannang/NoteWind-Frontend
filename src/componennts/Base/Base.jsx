import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const Base = ({ title, children }) => {
  const Navigate = useNavigate();

  return (
    <>
      <div>
        <AppBar sx={{ background: "white", color: "#00BFA5" }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 6 }}>
              NoteWind
            </Typography>

            <Button color="inherit" onClick={() => Navigate("/Login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => Navigate("/Signup")}>
              SignUp
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          <h1>{title}</h1>
          <div>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Base;
