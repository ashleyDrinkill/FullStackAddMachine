import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateReport from "./pages/CreateReport";
import EditReport from "./pages/EditReport";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          LegacyX Adding Machine
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/createReport"} className="nav-link">
              Manage Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/editReport"} className="nav-link">
              Edit Reports
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/createReport" element={<CreateReport />} />
          <Route path="/editReport" element={<EditReport />} />
        </Routes>
      </div>

    </div>
      )
}

export default App;