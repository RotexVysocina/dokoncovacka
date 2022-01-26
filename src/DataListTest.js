import React, {useState, useMemo, useCallback, useEffect} from "react";
import DataListInput from "react-datalist-input";

const DataListTest = ({ value, listValues,  onSelect, onInput, placeholder }) => {
  const items = useMemo(
      () =>
        listValues.map((oneItem, index) => ({
          label: String(oneItem),
          key: index,
          ...oneItem, // keep everything
        })),
      [listValues]
    );

  const [currentInput, setCurrentInput] = useState();

  return (
    <>
      <DataListInput
        placeholder={placeholder}
        items={items}
        onSelect={(val) => {
          console.log(val);
          setCurrentInput(val.label);
        }}
        onInput={(val) => {
          console.log(val);
          setCurrentInput(val);
        }}
        // value={currentInput}
        clearInputOnClick={true}
        debounceLoader="Načítám..."
        value={value}
      />

      <button onClick={() => {setCurrentInput("1")}}>asd</button>
    </>

  );
};

export default DataListTest;