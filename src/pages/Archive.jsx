import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../componennts/Sidebar/Sidebar";
import Navbar from "../componennts/Navbar/Navbar";
import { Search, Delete } from "@mui/icons-material";

const Archive = () => {
  const navigate = useNavigate();
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If the user is not authenticated, navigate to the login page
      navigate("/login");
    } else {
      // Fetch archived notes when the component mounts
      getArchivedNotes();
    }
  }, [navigate]);

  const getArchivedNotes = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/notes/archivednotes",
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
        setArchivedNotes(data);
      } else {
        console.error(
          "Error fetching archived notes. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/delete/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        // If the note is successfully deleted, update the archivedNotes state
        setArchivedNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
        console.log("Note deleted successfully");
      } else {
        console.error(
          "Error deleting note. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const renderArchivedNotes = () => {
    return (
      <Grid container spacing={2}>
        {archivedNotes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              note.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
              note.labels.some((label) =>
                label.toLowerCase().includes(searchTerm.toLowerCase())
              )
          )
          .map((note) => (
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
                <div style={{ marginTop: "10px" }}>
                  <IconButton
                    style={{ color: "#FF8A80" }}
                    onClick={() => handleDelete(note._id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
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
          <Typography variant="h4">Archived Notes</Typography>
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

        {/* Display archived notes */}
        {renderArchivedNotes()}
      </div>
    </div>
  );
};

export default Archive;
