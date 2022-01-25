import React, {useState, useMemo, useCallback, useEffect} from "react";
import DataListInput from "react-datalist-input";

const DataListSizeType = ({ listValues,  onSelect, onInput, placeholder, type }) => {
  const items = useMemo(
      () => {
        let sizes = [];
        for(const [key,value] of Object.entries(listValues)) {
          if(value && key.includes(type)) { // find attributes with name Velikost-1, 2, ...
            sizes.push({ // create structure for DataListInput
              label: value,
              key: value,
            });
          }
        }
        return sizes;
      },
    [listValues]
    );

  return (
    <DataListInput
      placeholder={placeholder}
      items={items}
      onSelect={onSelect}
      clearInputOnClick={true}
      debounceLoader="Načítám..."
      onInput={onInput}
    />
  );
};

export default DataListSizeType;