import React, { useState, useEffect, useCallback, Fragment } from 'react';
import MUIDataTable from "mui-datatables";
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

import { Container, Alert, Table} from 'react-bootstrap';

function TestTable() {
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

  //
  useEffect(async () => {

    await gSheetInit()
    setDbValues(await getSheetByName("db"));
  }, [])

  // const columns = [
  //   { label: 'Katalog', name: 'Katalog' },
  //   { label: 'Klíč', name: 'Klíč' },
  //   // { label: 'Page Count', name: 'num_pages', options: { sort: true } },
  //   // { label: 'Rating', name: 'rating' }
  // ];

  const columns = ["Katalog", "Klíč", "Velikost", "Provedení", "Páry", "Kdo zadal", "Umístění",  "Datum"];


  const options = {
    // filterType: 'checkbox',
    selectableRows: 'none'
  };


  return (
    <div style={{ maxWidth: '100%' }}>
      <MUIDataTable
        columns={columns}
        data={dbValues}
        title='Books Directory'
        options={options}
      />
    </div>
  )
}

export default TestTable;