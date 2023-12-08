import React from "react";
import "./Home.scss";
import GasCoupon from "../../components/GasCoupon/GasCoupon";

export default function Home() {
  return (
    <>
      <div className="home_container">
        <div className="home_container__header">
          <div className="home_container__header__title">
            <p>My Passes</p>
          </div>
          <div className="home_container__header__btn_container">
            <button>Acquire a new pass</button>
          </div>
        </div>
        <div className="home_container__body">
          <GasCoupon></GasCoupon>
        </div>
      </div>
    </>
  );
}
