import {ChildButton, Directions, FloatingMenu, MainButton} from "react-floating-button-menu";
import {HouseFill, List, PieChartFill, Table, ArrowClockwise, LayoutTextSidebarReverse} from "react-bootstrap-icons";
import React, {useState} from "react";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
import creds from "../cred/rotex-339816-80d534ff0b05.json";

function FloatingAppMenu() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuSize = {
    bigMenu: 80,
    bigIcon: 45,
    smallMenu: 65,
    smallIcon: 35,
  }

  return(
    <div className="menuButton">
      <FloatingMenu
        slideSpeed={500}
        direction={Directions.Up}
        spacing={8}
        isOpen={isOpen}
      >
        <MainButton
          iconResting={<List color="royalblue" size={menuSize.bigIcon} />}
          iconActive={<List color="royalblue" size={menuSize.bigIcon} />}
          background="white"
          onClick={() => setIsOpen((prev) => !prev)}
          size={menuSize.bigMenu}
        />
        <ChildButton
          icon={<HouseFill color="royalblue" size={menuSize.smallIcon} />}
          background="white"
          size={menuSize.smallMenu}
          onClick={() => {navigate("/"); setIsOpen(false);}}
        />
        <ChildButton
          icon={<LayoutTextSidebarReverse color="royalblue" size={menuSize.smallIcon} />}
          background="white"
          size={menuSize.smallMenu}
          onClick={() => {navigate("/data"); setIsOpen(false);}}
        />
        <ChildButton
          icon={<Table color="royalblue" size={menuSize.smallIcon} />}
          background="white"
          size={menuSize.smallMenu}
          onClick={() => {navigate("/table"); setIsOpen(false);}}
        />
        <ChildButton
          icon={<ArrowClockwise color="royalblue" size={menuSize.smallIcon} />}
          background="white"
          size={menuSize.smallMenu}
          onClick={() => {window.location.reload(); setIsOpen(false);}}
        />
        <ChildButton
              icon={<p style={{color: "royalblue"}}>v{creds.version}</p>}
              background="white"
              size={menuSize.smallMenu}
              onClick={() => {window.location.href = "https://sev.rotexvysocina.cz"; setIsOpen(false);}}
              />
    </FloatingMenu>
    </div>
  );
}

export default FloatingAppMenu;
