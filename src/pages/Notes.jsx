import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { Edit, Delete, Archive, FormatColorFill } from "@mui/icons-material";
import Sidebar from "../componennts/Sidebar/Sidebar";
import Navbar from "../componennts/Navbar/Navbar";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
    labels: [],
    colorIndex: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [noteColors, setNoteColors] = useState({}); // State to store note background colors

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
      getNotes();
    }
  }, [navigate]);

  const getNotes = async () => {
    try {
      const response = await fetch(
        "https://sanjaikannang-notemakingapplication.onrender.com/notes/get",
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
        // Filter out archived notes before updating the state
        const nonArchivedNotes = data.filter((note) => !note.archived);
        setNotes(nonArchivedNotes);
      } else {
        console.error(
          "Error fetching notes. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleCreateNote = async () => {
    try {
      await fetch(
        "https://sanjaikannang-notemakingapplication.onrender.com/notes/write",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(newNote),
        }
      );
      getNotes();
      setIsDialogOpen(false);
      setNewNote({
        title: "",
        body: "",
        labels: [],
        colorIndex: 0,
      });
      setSearchTerm("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (noteId) => {
    navigate(`/editpage/${noteId}`);
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(
        `https://sanjaikannang-notemakingapplication.onrender.com/notes/delete/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        getNotes();
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

  const handleArchive = async (noteId) => {
    try {
      const archivedNote = notes.find((note) => note._id === noteId);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));

      await fetch(
        `https://sanjaikannang-notemakingapplication.onrender.com/notes/archivenotes/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log("Note archived successfully");

      setArchivedNotes((prevArchivedNotes) => [
        ...prevArchivedNotes,
        archivedNote,
      ]);
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const handleColorChange = (noteId) => {
    setNoteColors((prevNoteColors) => {
      const colorIndex = ((prevNoteColors[noteId] || 0) % 3) + 1; // Cycle through 3 colors
      return {
        ...prevNoteColors,
        [noteId]: colorIndex,
      };
    });
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
      <div style={{ flex: 2, marginLeft: "0px", padding: "0px" }}>
        <Navbar
          onLogout={handleLogout}
          onSearch={(value) => setSearchTerm(value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={openDialog}
          style={{
            margin: "20px 0",
            backgroundColor: "#00BFA5",
            color: "white",
          }}
        >
          Add Notes
        </Button>
        <Grid container spacing={2}>
          {Array.isArray(notes) &&
            notes
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
                      padding: "17px",
                      marginTop: "10px",
                      backgroundColor:
                        noteColors[note._id] === 1
                          ? "#E3F2FD" // sky blue
                          : noteColors[note._id] === 2
                          ? "#F3E5F5" // purple
                          : noteColors[note._id] === 3
                          ? "#FFF0B2" // lime
                          : "white", // Default: White
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
                    <br />
                    <div style={{ marginTop: "10px" }}>
                      <IconButton
                        style={{ color: "#90CAF9" }}
                        onClick={() => handleEdit(note._id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        style={{ color: "#FF8A80" }}
                        onClick={() => handleDelete(note._id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        style={{ color: "#00BFA5" }}
                        onClick={() => handleArchive(note._id)}
                      >
                        <Archive />
                      </IconButton>
                      <IconButton
                        style={{ color: "#00BFA5" }}
                        onClick={() => handleColorChange(note._id)}
                      >
                        <FormatColorFill />
                      </IconButton>
                    </div>
                  </div>
                </Grid>
              ))}
        </Grid>
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle style={{ color: "#00BFA5" }}>Add New Note</DialogTitle>
          <DialogContent>
            <TextField
              type="text"
              label="Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Body"
              multiline
              rows={4}
              value={newNote.body}
              onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              label="Label"
              value={newNote.labels.join(",")}
              onChange={(e) =>
                setNewNote({
                  ...newNote,
                  labels: e.target.value
                    .split(",")
                    .map((label) => label.trim()),
                })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCreateNote}
              style={{
                backgroundColor: "#00BFA5",
                color: "white",
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Notes;
