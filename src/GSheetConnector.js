import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";
import {Alert} from "react-bootstrap";

class GSheet {
  doc = new GoogleSpreadsheet(creds.sheet_id);

  // constructor() {
  //
  // }

  async gSheetInit() {
    try {
      await this.doc.useServiceAccountAuth(creds);
      await this.doc.loadInfo();
    } catch (e) {
      console.error('Error: ', e);
      // setSheetError(e.message);
    }
  }

    async getSheetByName(sheetName) {
    let sheet;
    try {
      sheet = this.doc.sheetsByTitle[sheetName];
      return await sheet.getRows()
    } catch (e) {
      // setSheetError(`List s názavm ${sheetName} neexistuje`);
      return [];
    }
  }

}

export default GSheet;

// function GSheet() {
//
//
//   const [sheetError, setSheetError] = useState();
//
//
//   const gSheetInit = async () => {
//     try {
//       await doc.useServiceAccountAuth(creds);
//       await doc.loadInfo();
//     } catch (e) {
//       console.error('Error: ', e);
//       setSheetError(e.message);
//     }
//   };
//
//   const getSheetByName = async (sheetName) => {
//     let sheet;
//     try {
//       sheet = doc.sheetsByTitle[sheetName];
//       return await sheet.getRows()
//     } catch (e) {
//       setSheetError(`List s názavm ${sheetName} neexistuje`);
//       return [];
//     }
//   }
//
//   return(
//     <>
//       {sheetError && <Alert variant="danger">ERROR: {sheetError}</Alert>}
//     </>
//   )
// }

