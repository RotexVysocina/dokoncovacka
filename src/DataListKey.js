import React, { useState, useMemo, useCallback } from "react";
import DataListInput from "react-datalist-input";

const MyDatalist = ({ myValues,  onSelect, placeholder }) => {
  // selectedItem
  const [item, setItem] = useState();

  /**
   * your callback function gets called if the user selects one option out of the drop down menu
   * @param selectedItem object (the selected item / option)
   */
//   const onSelect = useCallback((selectedItem) => {
//     console.log("selectedItem", selectedItem);
//   }, []);

    // the array you want to pass to the react-data-list component
    // key and label are required properties
  const items = useMemo(
      () =>
        myValues.map((oneItem, index) => ({
          // required: what to show to the user
          label: oneItem.name,
          // required: key to identify the item within the array
          key: index,
          // feel free to add your own app logic to access those properties in the onSelect function
          // someAdditionalValue: oneItem.someAdditionalValue,
          // or just keep everything
          ...oneItem,
        })),
      [myValues]
    );

  return (
    <DataListInput
      placeholder={placeholder}
      items={items}
      onSelect={onSelect}
      clearInputOnClick={true}
      //   inputClassName={"data1"}
      //   dropdownClassName={"droep1"}
      //   value={value}
    />
  );
};

export default MyDatalist;