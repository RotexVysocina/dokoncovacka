import React, { useState, useEffect, useCallback } from 'react';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DokoForm from "./DokoForm";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Formular</Link>
            </li>
            <li>
              <Link to="/show">Tabulka</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<div>
            <DokoForm/>
          </div>}/>
          <Route path="/show" element={<div>
            Show table
          </div>}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
