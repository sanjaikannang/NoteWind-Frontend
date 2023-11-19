import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import Sidebar from "../componennts/Sidebar/Sidebar";
import Navbar from "../componennts/Navbar/Navbar";

const Label = () => {
  const navigate = useNavigate();
  const [labelNotes, setLabelNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If the user is not authenticated, navigate to the login page
      navigate("/login");
    } else {
      getNotesWithLabels();
    }
  }, [navigate]);

  const getNotesWithLabels = async () => {
    try {
      const response = await fetch(
        "https://sanjaikannang-notemakingapplication.onrender.com/notes/getnoteswithlabels",
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
        setLabelNotes(data);
      } else {
        console.error(
          "Error fetching notes with labels. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching notes with labels:", error);
    }
  };

  const renderNotesWithLabels = () => {
    return (
      <Grid container spacing={2}>
        {labelNotes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              note.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
              note.labels.some((label) =>
                label.toLowerCase().includes(searchTerm.toLowerCase())
              )
          )
          .map((note, index) => (
            <Grid item xs={6} key={note._id}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "15px",

                  padding: "25px",
                  marginTop: "10px",
                }}
              >
                <Typography variant="h5">{note.title}</Typography>
                <br />
                <Typography>{note.body}</Typography>
                <br />
                <Button
                  variant="subtitle2"
                  style={{
                    backgroundColor: "#E8F5E9",
                    borderRadius: "10px",
                    padding: "px",
                  }}
                >
                  {note.labels.join(", ")}
                </Button>
                <br />
                <br />
                <Typography variant="subtitle2">
                  Date: {new Date(note.createdAt).toLocaleDateString()}
                </Typography>
              </div>
            </Grid>
          ))}
      </Grid>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "80px",
        marginLeft: "0px",
        marginRight: "50px",
        height: "100vh",
      }}
    >
      <Sidebar />
      <div style={{ flex: 3, marginLeft: "0px", padding: "20px" }}>
        <Navbar />
        {/* Search functionality */}
        <div
          style={{
            marginLeft: "300px",
            marginRight: "400px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            color: "#00BFA5",
          }}
        >
          <Typography variant="h4">Labeled Notes</Typography>
        </div>
        <br />
        <br />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <IconButton style={{ color: "#00BFA5" }}>
            <Search />
          </IconButton>
          <TextField
            placeholder="Search Notes"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Display notes with labels */}
        {renderNotesWithLabels()}
      </div>
    </div>
  );
};

export default Label;
