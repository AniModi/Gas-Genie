import React from "react";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <>
      <nav className="nav_container">
        <div className = "nav_container__left">
          <div className = "nav_container__left__name">
            Gas Buddy
          </div>
        </div>
        <div className = "nav_container__right">
          <button>Connect</button>
        </div>
      </nav>
    </>
  );
}
