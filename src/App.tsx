import React from "react";

import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";

import JobsBoard from "./pages/jobsBoard";
import JobDetailed from "./pages/jobDetailed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsBoard />} />
        <Route path="/:id" element={<JobDetailed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
