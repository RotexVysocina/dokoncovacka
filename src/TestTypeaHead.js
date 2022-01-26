import range from 'lodash.range';

import React, {useCallback, useState, Fragment, useRef, useEffect} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap'
import {Typeahead} from 'react-bootstrap-typeahead';


const InputSizeExample = ({listValues, clear, defaultSelected}) => {
  const ref = useRef();

  const [selected, setSelected] = useState();

  useEffect(() => {
      setSelected(undefined);
      ref.current.clear()
  }, [clear])

  // useEffect(() => {
  //   handlePreset()
  // }, [defaultSelected])

  // function handleSelect(s) {
  //   // console.log((s[0] ? s[0].DataType : 'Nothing') + ' selected');
  //   setSelected(s);
  // }
  //
  // function handlePreset() {
  //   let s = listValues[2];
  //   console.log('Preset', s);
  //   setSelected([s]);
  // }

  return (
    <Fragment>
      <Form.Group>
        <InputGroup>
          <Typeahead
            id="input-size-example"
            labelKey="Kod"
            options={listValues}
            placeholder="Choose a state..."
            size="large"
            // itemSize={42}
            ref={ref}
            // defaultSelected={defaultSelected}
            onInputChange={(text) => {
              console.log(text);
            }}

            // onChange={handleSelect}
            onChange={(selected) => {
              console.log(selected);
              // setSelected(selected["Kod"]);
            }}
            // selected={selected}
          />

          <Button onClick={() => ref.current.clear()}>
            x
          </Button>
          {/*<button onClick={handlePreset}>Preset</button>*/}
        </InputGroup>
      </Form.Group>
    </Fragment>


  );
};

export default InputSizeExample;