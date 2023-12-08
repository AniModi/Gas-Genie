import React from "react";
import "./Home.scss";
import GasCoupon from "../../components/GasCoupon/GasCoupon";
import DialogBox from "../../components/DialogBox/DialogBox";
import useToggle from "../../hooks/useToggle";

export default function Home() {
  const [isOpen, setIsOpen] = useToggle(false)
  return (
    <>
    <DialogBox isOpen={isOpen} setIsOpen={setIsOpen}></DialogBox>
      <div className="home_container">
        <div className="home_container__header">
          <div className="home_container__header__title">
            <p>My Passes</p>
          </div>
          <div className="home_container__header__btn_container">
            <button onClick={setIsOpen}>Acquire a new pass</button>
          </div>
        </div>
        <div className="home_container__body">
          <GasCoupon></GasCoupon>
        </div>
      </div>
    </>
  );
}
