import React, {useState, useMemo, useCallback, useEffect} from "react";
import DataListInput from "react-datalist-input";

const DataListSheet = ({ value, sheetValues, sheetColumn,  onSelect, onInput, placeholder, clearInputOnClick=false }) => {
  const items = useMemo(
    () => {
      let elements = [];
      for(const row of sheetValues) {
        if(row[sheetColumn]) {
          elements.push({
            label: String(row[sheetColumn]),
            key: String(row[sheetColumn])
          });
        }
      }
      return elements;
    },
    [sheetValues]
  );

  return (
    <DataListInput
      placeholder={placeholder}
      items={items}
      onSelect={onSelect}
      onInput={onInput}
      clearInputOnClick={clearInputOnClick}
      debounceLoader="Načítám..."
      value={value}
    />
  );
};

export default DataListSheet;