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
    }, 1500);

    await gSheetInit()
    let db = doc.sheetsByTitle["db"];
    const newRow = {
        "Katalog": catalog,
        "Klic": code,
        "Velikost": size,
        "Provedeni": type,
        "Pary": pairs,
        "Kdo zadal": person,
        "Umisteni": place,
        "Datum": moment().format("D.M.YYYY HH:mm:ss"),
    }

    const added = db.addRow(newRow);
    console.log("Added:")
    console.log(added);
    onClear();
  }

  return (
    <div className="text-center pt-1">
      {alertVisible && <Container className="p-1">
        <Alert color="info" show="true" >
          Přidáno
        </Alert>
      </Container>}

      <Button size="lg" variant="success" onClick={addDbRow}>Přidat</Button>
      {' '}
      <Button size="lg" variant="danger" onClick={onClear}>Vyčistit</Button>


    </div>
  );
};

export default AddToSheet;