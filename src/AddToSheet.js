import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert } from 'react-bootstrap';

import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

const AddToSheet = ({ code = "",
                      order = "",
                      size= "",
                      type = "",
                      pairs = "",
                      date = "",
                      place = "",
                      person = "",
                      // isAdded = false,
                    }) => {

  const doc = new GoogleSpreadsheet(creds.sheet_id);

  const [alertVisible, setAlertVisible] = useState(false);

  const gSheetInit = async () => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const addDbRow = async (row) => {
    setAlertVisible(true)
    setTimeout(() => {
      setAlertVisible(false)
    }, 3000);

    await gSheetInit()
    let db = doc.sheetsByTitle["db"];
    const newRow = {
      "ID": "x",
        "Kod": code,
        "Zakazka": order,
        "Velikost": size,
        "Provedeni": type,
        "Pary": pairs,
        "Datum": date,
        "Umisteni": place,
        "Kdo zadal": person,
    }

    const added = db.addRow(newRow);
    console.log("Added:")
    console.log(added);
  }

  const reload = () => {
    window.location.reload();
  }

  return (
    <div className="text-center">
      <Button size="lg" variant="success" onClick={addDbRow}>Přidat</Button>
      {' '}
      <Button size="lg" variant="danger" onClick={reload}>Vyčistit</Button>

      <Container className="p-3 mb-3">
        <Alert color="info" show={alertVisible} >
          Přidáno
        </Alert>
      </Container>
    </div>
  );
};

export default AddToSheet;