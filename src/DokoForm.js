import React, { useState, useEffect, useCallback } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

import { Container, Alert} from 'react-bootstrap';
import DataListSizeType from "./DataListSizeType";
import DataListSheet from "./DataListSheet";
import AddToSheet from "./AddToSheet";

import Numpad from 'react-doge-numpad'

function DokoForm() {
  const doc = new GoogleSpreadsheet(creds.sheet_id);

  const [sheetValues, setSheetValues] = useState([]);
  const [sheetError, setSheetError] = useState();

  const [valueCatalog, setValueCatalog] = useState("");
  const [listValuesCode, setListValuesCode] = useState([]);
  const [valueCode, setValueCode] = useState("");
  const [valueCode1, setValueCode1] = useState("");
  const [listValuesSize, setListValuesSize] = useState([]);
  const [valueSize, setValueSize] = useState("");
  const [listValuesType, setListValuesType] = useState([]);
  const [valueType, setValueType] = useState("");
  const [valuePairs, setValuePairs] = useState("");
  const [valuePerson, setValuePerson] = useState("");
  const [valuePlace, setValuePlace] = useState();

  const gSheetInit = async () => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
    } catch (e) {
      console.error('Error LoadDocInfo: ', e);
      setSheetError(e.message);
    }
  };

  const getSheetByName = async (sheetName) => {
    let sheet;
    try {
      sheet = doc.sheetsByTitle[sheetName];
      return await sheet.getRows()
    } catch (e) {
        console.log(e.message);
        setSheetError(`List s názavm ${sheetName} neexistuje / nelze načíst`);
        return [];
    }
  }

  //
  useEffect(async () => {
    await gSheetInit()
    setSheetValues(await getSheetByName("Nastavení"));
    // let db = await getSheetByName("db");
  }, [])

  // Set default values
  useEffect(() => {
    try {
      setValuePlace(sheetValues[0]["Umístění"]) // While value is exist set place to first row
    } catch (e) {}
  }, [sheetValues])

  /////////////////// Select CATALOG
  const onSelectCatalog = useCallback(async (selectedCatalog) => {
    setListValuesCode([]) // clear all code select list
    setValueCode("")
    setValueSize("");
    setValueType("");
    console.log("Catalog:", selectedCatalog);
    setValueCatalog(selectedCatalog.label);
    setListValuesCode(await getSheetByName(selectedCatalog.label));
  }, []);


  // Select CODE
  const onSelectCode = useCallback((selectedCode) => {
    setValueSize("");
    setValueType("");
    console.log("Kod:", selectedCode);
    setListValuesSize(selectedCode);
    setListValuesType(selectedCode);
    setValueCode(selectedCode.label);
    setValueCode1(selectedCode["Kód1"])
  }, []);

  const onInputCode = useCallback((valueCode) => {
    setValueCode(valueCode);
    setValueCode1(valueCode);
  }, []);

  /////////////////// Select SIZE
  const onSelectSize = useCallback((selectedSize) => {
    setValueSize("");
    setValueType("");
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
  const onInputPairs = useCallback((valuePairs) => {
    setValuePairs(valuePairs);
  }, []);

  /////////////////// Select PERSON
  const onSelectPerson = useCallback((selectedPerson) => {
    console.log("Person:", selectedPerson);
    setValuePerson(selectedPerson.label);
  }, []);

  const onInputPerson = useCallback((valuePerson) => {
    setValuePerson(valuePerson);
  }, []);

  /////////////////// Select PLACE
  const onSelectPlace = useCallback((selectedPlace) => {
    console.log("Place:", selectedPlace);
    setValuePlace(selectedPlace.label);
  }, []);

  const onInputPlace = useCallback((valuePlace) => {
    setValuePlace(valuePlace);
  }, []);

  // Clear input
  const clearInput = useCallback(() => {
    setValueCatalog("")
    setValueCode("");
    setValueSize("");
    setValueType("");
    setValuePairs("");
    setValuePerson("");
    setListValuesCode([]);
    setListValuesSize([]);
    setListValuesType([]);
    setValuePlace(sheetValues[0]["Umístění"])
    setSheetError("")
  })

  return (
    <Container className="pt-3 dokoncovacka">
      {sheetError && <Alert variant="danger">ERROR: {sheetError}</Alert>}

      <DataListSheet value={valueCatalog} sheetValues={sheetValues} sheetColumn="Katalogy" onSelect={onSelectCatalog} placeholder="Firma"/>
      <DataListSheet value={valueCode} sheetValues={listValuesCode} sheetColumn="Kód" onSelect={onSelectCode} onInput={onInputCode} placeholder="Kód"/>
      <DataListSizeType value={valueSize} listValues={listValuesSize} onSelect={onSelectSize} onInput={onInputSize} type="Velikost-" placeholder="Velikost" />
      <DataListSizeType value={valueType} listValues={listValuesType} onSelect={onSelectType} onInput={onInputType} type="Provedení-" placeholder="Barva"/>

      <Numpad label="Páry" value={0} decimal={false} max={1000000000000} min={0} onChange={onInputPairs}>
        <input type="number" value={valuePairs} style={{width: "100%"}} placeholder="Páry"/>
      </Numpad>

      <DataListSheet value={valuePerson} sheetValues={sheetValues} sheetColumn="Kdo zadal" onSelect={onSelectPerson} onInput={onInputPerson} placeholder="Zaměstnanec"/>
      <DataListSheet value={valuePlace} sheetValues={sheetValues} sheetColumn="Umístění" onSelect={onSelectPlace} onInput={onInputPlace} placeholder="Umístění"/>

      {/*<div>*/}
      {/*  Katalog: {valueCatalog} |*/}
      {/*  Kód: {valueCode} |*/}
      {/*  Kód1: {valueCode1} |*/}
      {/*  Velikost: {valueSize} |*/}
      {/*  Provedení: {valueType} |*/}
      {/*  Páry: {valuePairs} |*/}
      {/*  Zadal: {valuePerson} |*/}
      {/*  Umístění: {valuePlace}*/}
      {/*</div>*/}

      <AddToSheet onClear={clearInput} catalog={valueCatalog} code={valueCode} code1={valueCode1} size={valueSize} type={valueType} pairs={valuePairs} person={valuePerson} place={valuePlace} />

    </Container>
  );
}

export default DokoForm;