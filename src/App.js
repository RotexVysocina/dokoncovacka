import React, { useState, useEffect, useCallback } from 'react';
// import {BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
import DokoForm from "./DokoForm";
import DokoData from "./DokoData";
import DokoTable from "./DokoTable";

import { List, HouseFill, PieChartFill, Table } from 'react-bootstrap-icons';

import {FloatingMenu, MainButton, ChildButton, Directions } from 'react-floating-button-menu';
import 'react-floating-button-menu/dist/index.css';

const menuSize = {
  bigMenu: 60,
  bigIcon: 30,
  smallMenu: 45,
  smallIcon: 25,
}

function App() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

        <div className="menuButton">
          <FloatingMenu
            slideSpeed={500}
            direction={Directions.Up}
            spacing={8}
            isOpen={isOpen}
            class
          >
            <MainButton
              iconResting={<List color="royalblue" size={menuSize.bigIcon} />}
              iconActive={<List color="royalblue" size={menuSize.bigIcon} />}
              background="white"
              onClick={() => setIsOpen((prev) => !prev)}
              size={menuSize.bigMenu}
            />
            <ChildButton
              icon={<HouseFill color="royalblue" size={menuSize.smallIcon} />}
              background="white"
              size={menuSize.smallMenu}
              onClick={() => {navigate("/"); setIsOpen(false);}}
            />
            <ChildButton
              icon={<Table color="royalblue" size={menuSize.smallIcon} />}
              background="white"
              size={menuSize.smallMenu}
              onClick={() => {navigate("/data"); setIsOpen(false);}}
            />
            <ChildButton
              icon={<PieChartFill color="royalblue" size={menuSize.smallIcon} />}
              background="white"
              size={menuSize.smallMenu}
              onClick={() => {navigate("/table"); setIsOpen(false);}}
            />
          </FloatingMenu>
        </div>
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
