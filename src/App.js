import React, { useState, useEffect, useCallback } from 'react';
// import {BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import {
  BrowserRouter,
  Switch,
  Route,
  Link, Routes, Navigate
} from "react-router-dom";
import DokoForm from "./DokoForm";
import DokoTable from "./DokoTable";
import TestTable from "./TestTable";

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
              <Link to="/data">Data</Link>
            </li>
            <li>
              <Link to="/table">Tabulka</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<DokoForm/>}/>
          <Route path="/data" element={<DokoTable/>}/>
          <Route path="/table" element={<TestTable/>}/>
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

// function App() {
//
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Formular</Link>
//             </li>
//             <li>
//               <Link to="/show">Tabulka</Link>
//             </li>
//           </ul>
//         </nav>
//
//         <Routes>
//           <Route path="/" element={<div>
//             <DokoForm/>
//           </div>}/>
//           <Route path="/show" element={<div>
//             Show table
//           </div>}>
//           </Route>
//           <Route path="*">
//             {/*<Redirect to="/as" />*/}
//           </Route>
//         </Routes>
//       </div>
//     </BrowserRouter>
//
//   );
// }

export default App;
