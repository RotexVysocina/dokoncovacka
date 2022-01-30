import React, {Component, useState} from "react";
import PatternLock from "react-pattern-lock";
import {Container, Alert} from "react-bootstrap"
import creds from "./rotex-339816-80d534ff0b05.json";

function TestLocks({successLogin, onSuccessLogin}) {
  const [path, setPath] = useState([]);
  const [isSuccessLocal, setIsSuccessLocal] = useState(false);

  return(
    <Container className="text-center">
      <PatternLock
        width={ 300 }
        pointSize={ 15 }
        size={ 3 }
        path={ path }
        onChange={ (pattern) => {
          setPath(pattern);
          console.log(pattern);
        }}
        onFinish={() => {
          if(path.join("-") === creds.app_login.join("-")) {
            console.log("Login");
            setIsSuccessLocal(true);
            setTimeout(() => {
              onSuccessLogin();
            }, 1000)
          } else {
            setTimeout(() => {
              setPath([]);
            }, 1500);
          }
        }}
        success={successLogin}
      />

      <Alert variant={isSuccessLocal ? "success" : "danger"}>
        Login: {isSuccessLocal ? "OK" : "FAIL"}
      </Alert>
    </Container>
  )
}

export default TestLocks;