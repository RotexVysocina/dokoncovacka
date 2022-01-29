import {ChildButton, Directions, FloatingMenu, MainButton} from "react-floating-button-menu";
import {HouseFill, List, PieChartFill, Table} from "react-bootstrap-icons";
import React, {useState} from "react";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";



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
        class
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
          icon={<Table color="royalblue" size={menuSize.smallIcon} />}
          background="white"
          size={menuSize.smallMenu}
          onClick={() => {navigate("/data"); setIsOpen(false);}}
        />
        <ChildButton
          icon={<PieChartFill color="royalblue" size={menuSize.smallIcon} />}
          background="white"
          size={menuSize.smallMenu}
          onClick={() => {navigate("/table"); setIsOpen(false);}}
        />
      </FloatingMenu>
    </div>
  );
}

export default FloatingAppMenu;

// class App extends React.Component {
//   menuSize;
//
//   constructor(props) {
//     super(props);
//     this.this.menuSize = {
//       bigMenu: 80,
//       bigIcon: 45,
//       smallMenu: 55,
//       smallIcon: 35,
//     }
//
//     this.state = {
//       isOpen: false,
//     }
//   }
//
//   render() {
//     return(
//       <div className="menuButton">
//         <FloatingMenu
//           slideSpeed={500}
//           direction={Directions.Up}
//           spacing={8}
//           isOpen={this.isOpen}
//           class
//         >
//           <MainButton
//             iconResting={<List color="royalblue" size={this.menuSize.bigIcon} />}
//             iconActive={<List color="royalblue" size={this.menuSize.bigIcon} />}
//             background="white"
//             // onClick={() => setIsOpen((prev) => !prev)}
//             onClick={() => this.setState(function (state) {
//               return {
//                 isOpen: !state.constructor,
//               };
//             })}
//             size={this.menuSize.bigMenu}
//           />
//           <ChildButton
//             icon={<HouseFill color="royalblue" size={this.menuSize.smallIcon} />}
//             background="white"
//             size={this.menuSize.smallMenu}
//             onClick={() => {navigate("/"); setIsOpen(false);}}
//           />
//           <ChildButton
//             icon={<Table color="royalblue" size={this.menuSize.smallIcon} />}
//             background="white"
//             size={this.menuSize.smallMenu}
//             onClick={() => {navigate("/data"); setIsOpen(false);}}
//           />
//           <ChildButton
//             icon={<PieChartFill color="royalblue" size={this.menuSize.smallIcon} />}
//             background="white"
//             size={this.menuSize.smallMenu}
//             onClick={() => {navigate("/table"); setIsOpen(false);}}
//           />
//         </FloatingMenu>
//       </div>
//     )
//   }
// }
