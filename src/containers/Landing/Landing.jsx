import React, { useState } from "react";
import "./Landing.scss";
import logo from "../../assets/landing.svg";

export default function Landing() {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <div className="landing_container">
      <div className="landing_container__left">
        <div className="landing_container__left__title">
          <span>GAS</span>
          <span>BUDDY</span>
        </div>
        <div className="landing_container__left__body">
          Gas Buddy is a web application that allows users to find the cheapest
          gas prices in their area. Users can also find the closest gas stations
          to their location.
        </div>
        <div className="landing_container__left__button">
          <button disabled = {!isConnected} className={!isConnected ? "disabled" : ""}>
            {!isConnected ? "Connect Metamask First!" : "Verify Aadhaar"}
          </button>
        </div>
      </div>
      <div className="landing_container__right">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}
