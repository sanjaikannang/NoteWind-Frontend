import "./App.css";
import LandingPage from "./componennts/landingpage/LandingPage";
import Login from "./componennts/Auth/Login";
import Signup from "./componennts/Auth/Signup";
import { Route, Routes } from "react-router-dom";
import Archive from "./pages/Archive";
import Label from "./pages/Label";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/label" element={<Label />} />
        <Route path="/editpage/:id" element={<EditNote />} />
      </Routes>
    </>
  );
}

export default App;
