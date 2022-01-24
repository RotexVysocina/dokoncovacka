import React, { useState, useEffect, useCallback } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';


function App() {
  const [sheetTitle, setSheetTitle] = useState("");
  const [sheetError, setSheetError] = useState();

  const creds = require('./rotex-339222-9848006a37ef.json'); // the file saved above
  const doc = new GoogleSpreadsheet(creds.sheet_id);

  const spreadsheetInit = async (row) => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
      setSheetTitle(doc.title);
    } catch (e) {
      console.error('Error: ', e);
      setSheetError(e.message);
    }
  };

  useEffect(() => {
    spreadsheetInit();
  }, [])

  return (
    <div>
      {sheetError && <p>Sheet ERROR: {sheetError}</p>}
      <p>Sheet title: {sheetTitle}</p>

    </div>
  );
}

export default App;