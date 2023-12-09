import React from "react";
import "./Navbar.scss";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

export default function Navbar() {
  return (
    <>
      <nav className="nav_container">
        <div className = "nav_container__left">
          <div className = "nav_container__left__name">
            Gas Genie
          </div>
        </div>
        <div className = "nav_container__right">
          <MetaMaskButton></MetaMaskButton>
        </div>
      </nav>
    </>
  );
}
