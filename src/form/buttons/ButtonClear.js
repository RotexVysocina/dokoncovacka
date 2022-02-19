import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert, Modal } from 'react-bootstrap';

const ButtonClear = ({onClickClear}) => {
  return (
      <Button size="xxl" variant="warning" onClick={onClickClear}>Vyčistit</Button>
  );
};

export default ButtonClear;