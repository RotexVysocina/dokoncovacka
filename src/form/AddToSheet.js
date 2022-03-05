import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert, Modal } from 'react-bootstrap';
import moment from "moment";

import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "../cred/rotex-339816-80d534ff0b05.json";
import ModalDialog from "../utils/ModalDialog";

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
  const [modalRevShow, setModalRevShow] = useState(false);

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

  // Add ////////////////////////////////////////////////////
  const addDbRow = async () => {
    const newRow = {
        "Firma": catalog,
        "Kód": code,
        "Velikost": size,
        "Barva": type,
        "Páry": pairs,
        "Zaměstnanec": person,
        "Umístění": place,
        "Datum-čas": moment().format("D.M.YYYY HH:mm:ss"),
        "Datum": moment().format("D.M.YYYY"),
        "Čas": moment().format("HH:mm:ss"),
        "Kód1": code1 ? code1: "-",
    }

    // check if not empty
    for(const [key, val] of Object.entries(newRow)) {
      if(!val) {
        console.log(key, val);
        showAlert("danger", "Naní vyplněno: " + key, 2500);
        return;
      }
    }
    let added;
    let dbAdd;
    try {
      await gSheetInit()
      dbAdd = doc.sheetsByTitle["db"];
    } catch (e) {
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(==`, false);
      return;
    }

    try {
      added = dbAdd.addRow(newRow);
    } catch (e) {
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(`, false);
      return;
    }

    showAlert("success", "Přidáno znovu");
    console.log("Added:")
    console.log(added);
    // onClear();
  }

  const addDbRowClear = async () => {
    await addDbRow();
    onClear();
    showAlert("success", "Přidáno");
  }

  // Revert ////////////////////////////////////////////////////
  const loadLastRow = async () => {
    let dbRm;
    let len;
    try {
      await gSheetInit();
      dbRm = await getSheetByName("db");

      len = dbRm.length;
      console.log(dbRm[len-1]);
      const dbRow = dbRm[len-1];
      onBack(dbRow);
      return dbRm;
    } catch (e) {
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(`, false);
      return false;
    }
  }

  const revertLastRow = async () => {
    const dbRm = await loadLastRow();
    if(dbRm) {
      try {
        await dbRm[dbRm.length-1].delete();
      } catch (e) {
        showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(`, false);
        return;
      }
    }
    showAlert("success", "Vráceno");
  }

  const onBackClick = async () => {
    setModalRevShow(true);
  }

  const modalRevertAccept = async () => {
    setModalRevShow(false);
    try {
      await revertLastRow();
    } catch (e) {
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(`, false);
    }
  }

  return (

    <div className="text-center pt-3">
      {alertVisible && <Alert variant={alertType} >
        {alertMessage}
      </Alert>}

      <style type="text/css">
      {`  
      .btn-xxl {
        padding: 0.8rem 0.9rem;
        font-size: 1.4rem;
      }
      `}
      </style>
      {/*<Button size="xxl" variant="info" onClick={loadLastRow}>Poslední</Button>*/}
      {/*{' '}*/}
      <Button size="xxl" variant="danger" onClick={onBackClick}>Zpět</Button>
      {' '}
      <Button size="xxl" variant="warning" onClick={onClear}>Vyčistit</Button>
      {' '}
      <Button size="xxl" variant="success" onClick={addDbRowClear}>Přidat</Button>
      {' '}
      <Button size="xxl" variant="light" onClick={addDbRow}>Přidat-znovu</Button>
      <ModalDialog show={modalRevShow} modalHeading="Zpět" modalContent="Opravdu si přejete vrátit poslední zadání?" handleClose={() => setModalRevShow(false)} handleAccept={modalRevertAccept}/>
    </div>
  );
};

export default AddToSheet;