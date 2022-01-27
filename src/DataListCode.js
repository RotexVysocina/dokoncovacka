import React, {useState, useMemo, useCallback, useEffect} from "react";
import DataListInput from "react-datalist-input";

const DataListCode = ({ value, listValues,  onSelect, onInput, placeholder }) => {
  const items = useMemo(
      () =>
        listValues.map((oneItem, index) => ({
          label: oneItem["Kod"],
          key: index,
          ...oneItem, // keep everything
        })),
      [listValues]
    );


  return (
    <DataListInput
      placeholder={placeholder}
      items={items}
      onSelect={onSelect}
      onInput={onInput}
      clearInputOnClick={true}
      debounceLoader="Načítám..."
      value={value}
    />
  );
};

export default DataListCode;