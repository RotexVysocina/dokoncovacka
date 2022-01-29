import React, { useState, useEffect, useCallback } from 'react';
// import {BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
import DokoForm from "./DokoForm";
import DokoData from "./DokoData";
import DokoTable from "./DokoTable";
import FloatingAppMenu from "./FloatingAppMenu";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<DokoForm/>}/>
          <Route path="/data" element={<DokoData/>}/>
          <Route path="/table" element={<DokoTable/>}/>
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>

        <FloatingAppMenu/>
      </div>
    </>

  );
}

export default App;
