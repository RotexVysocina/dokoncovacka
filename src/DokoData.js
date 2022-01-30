import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

import GSheet from "./GSheetConnector";
import { Container, Alert, Table} from 'react-bootstrap';

function DokoData() {
  const doc = new GoogleSpreadsheet(creds.sheet_id);
  let gSheet = new GSheet;

  const [dbValues, setDbValues] = useState([]);
  const [sheetError, setSheetError] = useState();

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
    setDbValues(await getSheetByName("db"));
    // await gSheet.init();
    // setDbValues(await gSheet.getSheetByName("db"));
  }, [])

  const columns = ["Firma","Kód1","Velikost","Barva","Páry","Zaměstnanec","Umístění","Datum"]; // - "Kód",

  return (
    <Container className="pt-3">
      {sheetError && <Alert variant="danger">ERROR: {sheetError}</Alert>}
      <Table striped bordered hover className="dok-table">
        <thead>
        <tr>
          {/*<th>RM</th>*/}
          {columns.map((item, i) => {
            return(
              <Fragment key={i}>
                <th>{item}</th>
              </Fragment>
            )
          })
          }
        </tr>
        </thead>
        <tbody>
        {dbValues.slice(0).reverse().slice(0, 20).map((item, i) => {
          return (
            <Fragment key={i}>
              <tr>
                {/*<td><button>X</button></td>*/}
                {columns.map((key, j) => {
                  return(
                    <Fragment key={j}>
                      <td>{item[key]}</td>
                    </Fragment>
                  )
                })
                }
              </tr>
            </Fragment>
          );
        })}
        </tbody>
      </Table>
    </Container>
  );
}

export default DokoData;
