import React, { useState, useEffect, useCallback } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";
// import './App.css';

import DataListCode from "./DataListCode";
import DataListSizeType from "./DataListSizeType";
import DataListPairs from "./DataListPairs";
import AddToSheet from "./AddToSheet";

function App() {
  const doc = new GoogleSpreadsheet(creds.sheet_id);

  const [sheetTitle, setSheetTitle] = useState("");
  const [sheetError, setSheetError] = useState();
  const [listValuesCode, setListValuesCode] = useState([]);
  const [valueCode, setValueCode] = useState([]);
  const [listValuesSize, setListValuesSize] = useState([]);
  const [valueSize, setValueSize] = useState([]);
  const [listValuesType, setListValuesType] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [listValuesPairs, setListValuesPairs] = useState([1, 5, 7]);
  const [valuePairs, setValuePairs] = useState([]);

  const gSheetInit = async () => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
      setSheetTitle(doc.title);
    } catch (e) {
      console.error('Error: ', e);
      setSheetError(e.message);
    }
  };

  const getCatalogRows = async () => {
    let cat = doc.sheetsByTitle["Katalog"];
    const rows = await cat.getRows()
    // setCatRows(rows);
    return rows;
  }

  useEffect(async () => {
    await gSheetInit()
    setListValuesCode(await getCatalogRows());
  }, [])


  // Select CODE
  const onSelectCode = useCallback((selectedCode) => {
    console.log("Kod:", selectedCode);
    setListValuesSize(selectedCode);
    setListValuesType(selectedCode);
    setValueCode(selectedCode.label);
  }, []);
  // const onInputCode = useCallback((valueCode) => {
  //   setValueCode(valueCode);
  // }, []);

  /////////////////// Select SIZE
  const onSelectSize = useCallback((selectedSize) => {
    console.log("Velikost:", selectedSize);
    setValueSize(selectedSize.label);
  }, []);

  const onInputSize = useCallback((valueSize) => {
    setValueSize(valueSize);
  }, []);

  /////////////////// Select TYPE
  const onSelectType = useCallback((selectedType) => {
    console.log("Provedení:", selectedType);
    setValueType(selectedType.label);
  }, []);

  const onInputType = useCallback((valueType) => {
    setValueType(valueType);
  }, []);

  /////////////////// Select PAIRS
  const onSelectPairs = useCallback((selectedPairs) => {
    console.log("Páry:", selectedPairs);
    setValuePairs(selectedPairs.label);
  }, []);

  const onInputPairs = useCallback((valuePairs) => {
    setValuePairs(valuePairs);
  }, []);


  return (
    <div>
      {sheetError && <p>Sheet ERROR: {sheetError}</p>}
      {/*<p>Sheet title: {sheetTitle}</p>*/}
      <h1>Dokončovačka</h1>

      <DataListCode listValues={listValuesCode} onSelect={onSelectCode} placeholder="Kód"/>
      <DataListSizeType listValues={listValuesSize} onSelect={onSelectSize} onInput={onInputSize} placeholder="Velikost" type="Velikost-"/>
      <DataListSizeType listValues={listValuesType} onSelect={onSelectType} onInput={onInputType} placeholder="Provedení" type="Provedeni-"/>
      <DataListPairs listValues={listValuesPairs} onSelect={onSelectPairs} onInput={onInputPairs} placeholder="Páry"/>

      <div>
        Kód: {valueCode} |
        Velikost: {valueSize} |
        Provedení: {valueType} |
        Páry: {valuePairs} |
      </div>

      <AddToSheet code={valueCode} order={"Ord"} size={valueSize} type={valueType} pairs={valuePairs} date={"Dat"} place={"Plac"} person={"Per"}/>

    </div>
  );
}

export default App;