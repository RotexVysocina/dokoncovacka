import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useNavigate, Outlet} from "react-router-dom";
import DokoForm from "./DokoForm";
import DokoData from "./DokoData";
import DokoTable from "./DokoTable";
import FloatingAppMenu from "./FloatingAppMenu";
import TestLocks from "./TestLock";

function App() {

  const [successLogin, setsSuccessLogin] = useState(JSON.parse(localStorage.getItem("RotexSecureKey")) || false)

  const onSuccessLogin = () => {
    localStorage.setItem("RotexSecureKey", "true");
    setsSuccessLogin(true);
  }
  
  return (
    <>
      {!successLogin ? <TestLocks successLogin={successLogin} onSuccessLogin={onSuccessLogin}/> :
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
