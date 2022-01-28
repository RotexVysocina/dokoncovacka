import React, { useState, useEffect, useCallback } from 'react';
// import {BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import {BrowserRouter, Switch, Route, Link, Routes, Navigate, useNavigate} from "react-router-dom";
import DokoForm from "./DokoForm";
import DokoTable from "./DokoTable";
import TestTable from "./TestTable";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

function App() {

  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<DokoForm/>}/>
          <Route path="/data" element={<DokoTable/>}/>
          <Route path="/table" element={<TestTable/>}/>
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>

        <Fab alwaysShowTitle={true} icon="ℹ️">
          <Action text="Domů" onClick={() => navigate("/")}>
            🏠
          </Action>
          <Action text="Data" onClick={() => navigate("/data")}>
            📊
          </Action>
          <Action text="Tabulka" onClick={() => navigate("/table")}>
            📈
          </Action>
        </Fab>
      </div>
    </>

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
