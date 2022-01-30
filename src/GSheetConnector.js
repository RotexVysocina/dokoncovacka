import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339816-80d534ff0b05.json";
import {Alert} from "react-bootstrap";

class GSheet extends React.Component {
  doc = new GoogleSpreadsheet(creds.sheet_id);

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      sheetError: "Neni"
    }
  }

  async init() {
    try {
      await this.doc.useServiceAccountAuth(creds);
      await this.doc.loadInfo();
    } catch (e) {
      console.error('Error: ', e);
      this.setState({sheetError: e.message});
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
      this.setState({sheetError: e.message});
      return [];
    }
  }

  render() {
    return(
      <div>
        <Alert variant="danger">ERROR: {this.state.sheetError}</Alert>
        {/*<p>You Clicked {this.state["count"]} times</p>*/}
        {/*<button onClick={() => this.setState({ count: this.state["count"] + 1})}>Click me</button>*/}
      </div>
    )
  }

}

export default GSheet;


// import React, { useState, useEffect, useCallback, Fragment } from 'react';
// import {GoogleSpreadsheet} from 'google-spreadsheet';
// import creds from "./rotex-339816-80d534ff0b05.json";
// import {Alert} from "react-bootstrap";
//
// class GSheet {
//   doc = new GoogleSpreadsheet(creds.sheet_id);
//
//   constructor() {
//
//   }
//
//   async init() {
//     try {
//       await this.doc.useServiceAccountAuth(creds);
//       await this.doc.loadInfo();
//     } catch (e) {
//       console.error('Error: ', e);
//       // setSheetError(e.message);
//     }
//   }
//
//     async getSheetByName(sheetName) {
//     let sheet;
//     try {
//       sheet = this.doc.sheetsByTitle[sheetName];
//       return await sheet.getRows()
//     } catch (e) {
//       // setSheetError(`List s názavm ${sheetName} neexistuje`);
//       return [];
//     }
//   }
//
// }
//
// export default GSheet;