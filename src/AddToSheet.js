import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert, Modal } from 'react-bootstrap';
import moment from "moment";

import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

const AddToSheet = ({ onClear,
                      onBack,
                      catalog,
                      code,
                      code1,
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
      console.error('Error LoadDocInfo: ', e);
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(`, false);
    }
  };

  const getSheetByName = async (sheetName) => {
    let sheet;
    try {
      sheet = doc.sheetsByTitle[sheetName];
      return await sheet.getRows()
    } catch (e) {
      console.log(e.message);
      showAlert("danger", `ERROR: List s názavm ${sheetName} neexistuje / nelze načíst`, false);
      return [];
    }
  }

  const showAlert = (type, message, time = 2000) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
    if(time) {
      setTimeout(() => {
        setAlertVisible(false);
      }, time);
    }
  }

  const addDbRow = async () => {
    await gSheetInit()
    let dbAdd = doc.sheetsByTitle["db"];
    const newRow = {
        "Firma": catalog,
        "Kód": code,
        "Velikost": size,
        "Barva": type,
        "Páry": pairs,
        "Zaměstnanec": person,
        "Umístění": place,
        "Datum": moment().format("D.M.YYYY HH:mm:ss"),
        "Kód1": code1 ? code1: "-",
    }

    for(const [key, val] of Object.entries(newRow)) {
      if(!val) {
        console.log(key, val);
        showAlert("danger", "Naní vyplněno: " + key, 2500);
        return;
      }
    }

    showAlert("success", "Přidáno");
    let added;
    try {
      added = dbAdd.addRow(newRow);
    } catch (e) {
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(`, false);
    }

    console.log("Added:")
    console.log(added);
    onClear();
  }

  const onBackClick = async (row) => {
    await gSheetInit();
    const dbRm = await getSheetByName("db");

    showAlert("success", "Vráceno");
    const len = dbRm.length;
    console.log(dbRm[len-1]);
    const dbRow = dbRm[len-1];

    onBack(dbRow);

    await dbRm[len-1].delete();
  }


  return (

    <div className="text-center pt-3">
      {alertVisible && <Alert variant={alertType} >
        {alertMessage}
      </Alert>}

      <style type="text/css">
      {`  
      .btn-xxl {
        padding: 0.9rem 1.2rem;
        font-size: 1.8rem;
      }
      `}
      </style>
      <Button size="xxl" variant="danger" onClick={onBackClick}>Zpět</Button>
      {' '}
      <Button size="xxl" variant="warning" onClick={onClear}>Vyčistit</Button>
      {' '}
      <Button size="xxl" variant="success" onClick={addDbRow}>Přidat</Button>

    </div>
  );
};

export default AddToSheet;