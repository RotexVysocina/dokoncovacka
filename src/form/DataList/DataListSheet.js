import React, {useState, useMemo, useCallback, useEffect} from "react";
import DataListInput from "../../DataListInput/DataListInput";

const DataListSheet = ({ value, sheetValues, sheetColumn, placeholder, clearInputOnClick=true, type="text", name, handleChangeName }) => {
  const items = useMemo(
    () => {
      let elements = [];
      for(const row of sheetValues) {
        if(row[sheetColumn]) {
          elements.push({
            label: String(row[sheetColumn]),
            key: String(row[sheetColumn]),
            ...row,
          });
        }
      }
      return elements;
    },
    [sheetValues]
  );

  const onSelect = useCallback((selected) => {
    console.log("Provedení:", selected);
    handleChangeName(name, selected.label)
  }, []);

  const onInput = useCallback((value) => {
    // setValueType(valueType);
    handleChangeName(name, value)
  }, []);

  return (
    <DataListInput
      placeholder={placeholder}
      items={items}
      onSelect={onSelect}
      onInput={onInput}
      // clearInputOnClick={clearInputOnClick}
      debounceLoader="Načítám..."
      value={value}
      type={type}
      suppressReselect={false}
      name={name}
    />
  );
};

export default DataListSheet;