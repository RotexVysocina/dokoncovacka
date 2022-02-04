import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Container, Button, Alert, Modal } from 'react-bootstrap';

const ButtonClear = ({onClickClear}) => {
  return (
    <div>
      <style type="text/css">
        {`  
      .btn-xxl {
        padding: 0.9rem 1rem;
        font-size: 1.8rem;
      }
      `}
      </style>
      <Button size="xxl" variant="warning" onClick={onClickClear}>Vyčistit</Button>
    </div>
  );
};

export default ButtonClear;