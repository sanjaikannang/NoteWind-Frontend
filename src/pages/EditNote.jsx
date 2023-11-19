import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Sidebar from "../componennts/Sidebar/Sidebar";
import Navbar from "../componennts/Navbar/Navbar";

const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", body: "", labels: [] });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
        await fetchNote();
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const fetchNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/getnotesdetailsbyid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNote(data);
      } else {
        console.error(
          "Error fetching note details. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching note details:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/notes/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        navigate("/notes");
      } else {
        console.error(
          "Error editing note. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <Container>
      <Box display="flex" height="100vh">
        <Sidebar />
        <Box flex="1" padding="20px">
          <Navbar />
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              marginTop: "80px",
              marginRight: "70px",
              marginLeft: "0px",
              display: "flex",
              flexDirection: "column", // To align children vertically
            }}
          >
            <Typography variant="h4" gutterBottom style={{ color: "#00BFA5" }}>
              Edit Note
            </Typography>
            {isAuthenticated && (
              <>
                <TextField
                  fullWidth
                  type="text"
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Body"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  value={note.body}
                  onChange={(e) => setNote({ ...note, body: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Label"
                  variant="outlined"
                  margin="normal"
                  value={note.labels.join(",")}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      labels: e.target.value
                        .split(",")
                        .map((label) => label.trim()),
                    })
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#00BFA5",
                    alignSelf: "flex-end", // Aligns the button to the right
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default EditNote;
