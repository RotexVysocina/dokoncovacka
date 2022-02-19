import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "../cred/rotex-339816-80d534ff0b05.json";

class GSheet {
  doc = new GoogleSpreadsheet(creds.sheet_id);

  constructor() {

  }

  async init() {
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