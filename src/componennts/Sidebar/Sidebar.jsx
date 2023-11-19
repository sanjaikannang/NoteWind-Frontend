import React from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Note, Archive, Label } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNotesClick = () => {
    navigate("/notes");
  };
  const handleArchiveClick = () => {
    navigate("/archive");
  };

  const handleLabelClick = () => {
    navigate("/label");
  };

  return (
    <Drawer variant="permanent" anchor="left" style={{ width: "250px" }}>
      <div>
        <List>
          <ListItem>
            <Typography
              style={{
                color: "#00BFA5",
                fontSize: "35px",
              }}
            >
              NoteWind
            </Typography>
          </ListItem>
          <ListItem button onClick={handleNotesClick}>
            <ListItemIcon>
              <Note style={{ color: "#00BFA5" }} />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button onClick={handleArchiveClick}>
            <ListItemIcon>
              <Archive style={{ color: "#00BFA5" }} />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>
          <ListItem button onClick={handleLabelClick}>
            <ListItemIcon>
              <Label style={{ color: "#00BFA5" }} />
            </ListItemIcon>
            <ListItemText primary="Label" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
