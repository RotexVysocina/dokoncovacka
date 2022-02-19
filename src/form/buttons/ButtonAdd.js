import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert, Modal } from 'react-bootstrap';

const ButtonClear = ({onClickAdd}) => {
  return (
    <Button size="xxl" variant="success" onClick={onClickAdd}>Přidat</Button>
  );
};

export default ButtonClear;