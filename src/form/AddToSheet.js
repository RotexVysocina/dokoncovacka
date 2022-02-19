import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert, Modal } from 'react-bootstrap';
import ButtonClear from './buttons/ButtonClear'
import moment from "moment";

import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "../cred/rotex-339816-80d534ff0b05.json";
import ModalDialog from "../utils/ModalDialog";

const AddToSheet = ({ onClear,
                      onBack,
                      valuesArray,
                    }) => {

  const doc = new GoogleSpreadsheet(creds.sheet_id);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [modalRevShow, setModalRevShow] = useState(false);
  const [modalAddShow, setModalAddShow] = useState(false);

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
    // check if not empty
    for(const [key, val] of Object.entries(valuesArray)) {
      if(!val) {
        console.log(key, val);
        showAlert("danger", "Naní vyplněno: " + key, 2500);
        return;
      }
    }

    let added;
    let dbAdd
    try {
      await gSheetInit()
      dbAdd = doc.sheetsByTitle["db"];
      added = dbAdd.addRow(valuesArray);
    } catch (e) {
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(==`, false);
      return;
    }

    try {
      added = dbAdd.addRow(valuesArray);
    } catch (e) {
      showAlert("danger", `ERROR: Problém s tabulkou - asi nejede internet :-(`, false);
      return;
    }

    showAlert("success", "Přidáno");
    console.log("Added:")
    console.log(added);
    onClear();
  }

  const revertLastRow = async () => {
    await gSheetInit();
    const dbRm = await getSheetByName("db");

    showAlert("success", "Vráceno");
    const len = dbRm.length;
    console.log(dbRm[len-1]);
    const dbRow = dbRm[len-1];

    onBack(dbRow);

    await dbRm[len-1].delete();
  }

  const onBackClick = async (row) => {
    setModalRevShow(true);
  }

  const modalAccept = async () => {
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
        padding: 0.9rem 1rem;
        font-size: 1.8rem;
      }
      `}
      </style>
      <Button size="xxl" variant="danger" onClick={onBackClick}>Zpět</Button>
      {' '}
      <ButtonClear onClickClear={onClear}/>
      {' '}
      <Button size="xxl" variant="success" onClick={addDbRow}>Přidat</Button>
      <ModalDialog show={modalRevShow} modalHeading="Zpět" modalContent="Opravdu si přejete vrátit poslední zadání?" handleClose={() => setModalRevShow(false)} handleAccept={modalAccept}/>
      {/*<ModalDialog show={modalAddShow} modalHeading="Zpět" modalContent="Přidíáno" handleClose={() => setModalAddShow(false)} handleAccept={modalAccept}/>*/}
    </div>
  );
};

export default AddToSheet;