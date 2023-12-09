import React, { useState } from "react";
import "./Landing.scss";
import logo from "../../assets/landing.svg";
import { useSDK } from "@metamask/sdk-react-ui";

export default function Landing() {
  const { connected } = useSDK()

  return (
    <div className="landing_container">
      <div className="landing_container__left">
        <div className="landing_container__left__title">
          <span>GAS</span>
          <span>GENIE</span>
        </div>
        <div className="landing_container__left__body">
          Gas Buddy is a web application that allows users to find the cheapest
          gas prices in their area. Users can also find the closest gas stations
          to their location.
        </div>
        <div className="landing_container__left__button">
          <button
            disabled={!connected} className={!connected ? "disabled" : ""}
            onClick={()=>null}>
            {!connected ? "Connect Metamask First!" : "Verify with Anon Aadhar NFT"}
          </button>
          <div className="landing_container__left__aadhar_link">
            <a href="http://localhost:3001/">Don't have an aadhar NFT? Get it now</a>
          </div>
        </div>
      </div>
      <div className="landing_container__right">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}