import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import creds from "./rotex-339222-9848006a37ef.json";

import { Container, Alert, Table} from 'react-bootstrap';

function DokoTable() {
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

  const columns = ["Katalog", "Kód", "Klíč", "Velikost", "Provedení", "Páry", "Kdo zadal", "Umístění",  "Datum"];

  return (
    <Container className="pt-3">
      {sheetError && <Alert variant="danger">ERROR: {sheetError}</Alert>}
      <Table striped bordered hover className="dok-table">
        <thead>
        <tr>
          {columns.map((item, i) => {
            return(
              <Fragment>
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
            <Fragment>
              <tr key={i} onClick="">
                {columns.map((key, i) => {
                  return(
                    // <Fragment>
                    <th>{item[key]}</th>
                    // </Fragment>
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

export default DokoTable;
