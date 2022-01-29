import React, { useState, useEffect, useCallback, Fragment } from 'react';
import MUIDataTable from "mui-datatables";
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

import { Container, Alert, Table} from 'react-bootstrap';


function DokoTable() {
  const doc = new GoogleSpreadsheet(creds.sheet_id);

  const [dbValues, setDbValues] = useState([]);
  const [sheetError, setSheetError] = useState();

  const gSheetInit = async () => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
    } catch (e) {
      console.error('Error: ', e);
      setSheetError(e.message);
    }
  };

  const getSheetByName = async (sheetName) => {
    let sheet;
    try {
      sheet = doc.sheetsByTitle[sheetName];
      return await sheet.getRows()
    } catch (e) {
      setSheetError(`List s názavm ${sheetName} neexistuje`);
      return [];
    }
  }

  useEffect(async () => {
    await gSheetInit()
    setDbValues(await getSheetByName("db"));
  }, [])

  const columns = ["Katalog", "Klíč", "Velikost", "Provedení", "Páry", "Kdo zadal", "Umístění",  "Datum"];

  const options = {
    // filterType: 'checkbox',
    selectableRows: 'none'
  };


  return (
    <div style={{ maxWidth: '100%' }}>
      <MUIDataTable
        columns={columns}
        data={dbValues.reverse()}
        title='Dokončovačka DB'
        options={options}
      />
    </div>
  )
}

export default DokoTable;