import React, {useState, useMemo, useCallback, useEffect} from "react";
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

  const [isAdded, setIsAdded] = useState(false);
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
    const added = db.addRow({
      "ID": "x",
      "Kod": code,
      "Zakazka": order,
      "Velikost": size,
      "Provedeni": type,
      "Pary": pairs,
      "Datum": date,
      "Umisteni": place,
      "Kdo zadal": person,
    })
    // setCatRows(rows);
    console.log("Added:")
    console.log(added);
    setIsAdded(true);
  }

  const reload = () => {
    window.location.reload();
  }

  return (
    <div>
      <button onClick={addDbRow}>Přidat</button> 
      <button onClick={reload}>Vyčistit</button>
      {isAdded && <p>Přidáno</p>}
    </div>
  );
};

export default AddToSheet;