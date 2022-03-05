import {ChildButton, Directions, FloatingMenu, MainButton} from "react-floating-button-menu";
import {HouseFill, List, Table, ArrowClockwise, LayoutTextSidebarReverse, PcDisplay} from "react-bootstrap-icons"; //https://icons.getbootstrap.com/
import React, {useState} from "react";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
import creds from "../cred/rotex-339816-80d534ff0b05.json";

function FloatingAppMenu() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  let menuSize = {
    bigMenu: 80,
    bigIcon: 45,
    smallMenu: 65,
    smallIcon: 35,
    background: "#0cd94e",
    color: "royalblue",
  }

  const version = () => {
    let appVersion = creds.version;

    if(!creds.sheet_id.endsWith("oL0")) {
      appVersion += "D"
      menuSize.background = "red"
    }
    return appVersion ? appVersion : "v?";
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
          iconResting={<List color={menuSize.color} size={menuSize.bigIcon} />}
          iconActive={<List color={menuSize.color} size={menuSize.bigIcon} />}
          background={menuSize.background}
          onClick={() => setIsOpen((prev) => !prev)}
          size={menuSize.bigMenu}
        />
        <ChildButton
          icon={<HouseFill color={menuSize.color} size={menuSize.smallIcon} />}
          background={menuSize.background}
          size={menuSize.smallMenu}
          onClick={() => {navigate("/"); setIsOpen(false);}}
        />
        <ChildButton
          icon={<LayoutTextSidebarReverse color={menuSize.color} size={menuSize.smallIcon} />}
          background={menuSize.background}
          size={menuSize.smallMenu}
          onClick={() => {navigate("/data"); setIsOpen(false);}}
        />
        <ChildButton
          icon={<PcDisplay color={menuSize.color} size={menuSize.smallIcon} />}
          background={menuSize.background}
          size={menuSize.smallMenu}
          onClick={() => {navigate("/table"); setIsOpen(false);}}
        />
        <ChildButton
          icon={<ArrowClockwise color={menuSize.color} size={menuSize.smallIcon} />}
          background={menuSize.background}
          size={menuSize.smallMenu}
          onClick={() => {window.location.reload(); setIsOpen(false);}}
        />
        <ChildButton
          icon={<p style={{color: menuSize.color}}>v{version()}</p>}
          background={menuSize.background}
          size={menuSize.smallMenu}
          onClick={() => {window.location.href = "https://sev.rotexvysocina.cz"; setIsOpen(false);}}
          />
    </FloatingMenu>
    </div>
  );
}

export default FloatingAppMenu;
