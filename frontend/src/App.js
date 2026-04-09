import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import StudyHub from "./pages/StudyHub";
import StudyContent from "./pages/StudyContent";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Saved from "./pages/Saved";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/studyhub" element={<StudyHub />} />
        <Route path="/study/:topic" element={<StudyContent />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;