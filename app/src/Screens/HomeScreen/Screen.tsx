import React from "react";
import "./HScreen.css";
import { NavLink } from "react-router-dom";

const Screen: React.FC = () => {
  return (
    <div className="bgColor bgStyle">
      <NavLink to={"/choose"} style={{ textDecoration: 'none' }}>
        <div className="centerStyle">
          <img width={"40%"} style={{maxWidth: '200px'}} src={"/images/logo.png"} alt={"sss"} />
        </div>
        <div className="centerStyle">
        <img width={"80%"} style={{maxWidth: '450px'}} src={"/images/homePageImg.png"} alt={"sss"} />
        </div>
        <div className="centerStyle text-center">
          <img width={"30%"} src={"/images/giphy.gif"} alt={"sss"} />
          <h3>Boshlash uchun bosing</h3>
        </div>
      </NavLink>
    </div>
  );
};

export default Screen;
