import React from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  styled,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  borderRadius: "25px",
  backgroundColor: "#f0f0f0",
  marginLeft: "500px",
  marginRight: "400px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "relative",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  color: "#00BFA5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  padding: theme.spacing(1, 2, 1, 6),
  width: "100%",
}));

const Navbar = ({ onSearch, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Navigate to login page
    navigate("/login");
  };

  return (
    <AppBar sx={{ background: "white", color: "#00BFA5" }}>
      <Toolbar>
        <Typography style={{ flex: 1, textAlign: "center" }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Notes"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Search>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
