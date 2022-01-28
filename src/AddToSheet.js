import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert } from 'react-bootstrap';
import moment from "moment";

import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

const AddToSheet = ({ onClear,
                      catalog,
                      code,
                      size,
                      type,
                      pairs,
                      place,
                      person,
                    }) => {

  const doc = new GoogleSpreadsheet(creds.sheet_id);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const gSheetInit = async () => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const addDbRow = async (row) => {

    await gSheetInit()
    let db = doc.sheetsByTitle["db"];
    const newRow = {
        "Katalog": catalog,
        "Klíč": code,
        "Velikost": size,
        "Provedení": type,
        "Páry": pairs,
        "Kdo zadal": person,
        "Umístění": place,
        "Datum": moment().format("D.M.YYYY HH:mm:ss"),
    }

    setAlertVisible(true)
    setTimeout(() => {
      setAlertVisible(false)
    }, 2000);

    for(const [key, val] of Object.entries(newRow)) {
      if(!val) {
        console.log(key, val);
        setAlertMessage("Naní vyplněná hodnota: " + key);
        setAlertType("danger")
        return;
      }
    }

    setAlertType("success")
    setAlertMessage("Přidáno")
    const added = db.addRow(newRow);
    console.log("Added:")
    console.log(added);
    onClear();
  }

  return (

    <div className="text-center pt-3">
      {alertVisible && <Alert variant={alertType} show="true" >
        {alertMessage}
      </Alert>}

      <style type="text/css">
      {`  
      .btn-xxl {
        padding: 1rem 2rem;
        font-size: 1.8rem;
      }
      `}
      </style>
      <Button size="xxl" variant="success" onClick={addDbRow}>Přidat</Button>
      {' '}
      <Button size="xxl" variant="danger" onClick={onClear}>Vyčistit</Button>


    </div>
  );
};

export default AddToSheet;