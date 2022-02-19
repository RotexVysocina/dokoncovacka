import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useParams, Outlet} from "react-router-dom";
import DokoForm from "./form/DokoForm";
import DokoData from "./data/DokoData";
import DokoTable from "./table/DokoTable";
import FloatingAppMenu from "./menu/FloatingAppMenu";
import PatternPageLock from "./utils/PatternPageLock";

function App() {

  const [successLogin, setsSuccessLogin] = useState(JSON.parse(localStorage.getItem("RotexSecureKey")) || false)

  const onSuccessLogin = () => {
    localStorage.setItem("RotexSecureKey", "true");
    setsSuccessLogin(true);
  }

  
  return (
    <>
      {!successLogin ? <PatternPageLock successLogin={successLogin} onSuccessLogin={onSuccessLogin}/> :
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
      }
    </>
  );
}

export default App;
