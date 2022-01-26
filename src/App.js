import React, { useState, useEffect, useCallback } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import { Container, Alert} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import creds from "./rotex-339222-9848006a37ef.json";

import DataListCode from "./DataListCode";
import DataListSizeType from "./DataListSizeType";
import DataListPairs from "./DataListPairs";
import AddToSheet from "./AddToSheet";
import InputSizeExample from "./TestTypeaHead";

import './App.css';

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

  const [clear, setClear] = useState(false);
  const [codeDef, setCodeDef] = useState([]);

  return (
    <Container className="p-3 mb-4">
      {sheetError && <Alert variant="danger">ERROR: {sheetError}</Alert>}

      <h1 className="text-center">Dokončovačka</h1>

      <InputSizeExample listValues={listValuesCode} clear={clear} defaultSelected={codeDef}/>
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

      <button onClick={() => setClear(clear+1)}>
        Clear
      </button>

      <button onClick={() => setCodeDef(codeDef+1)}>
        Code Def
      </button>

      <div className="position-absolute bottom-0 end-0">
        <p>By KA | v1.0</p>
      </div>
    </Container>
  );
}

export default App;