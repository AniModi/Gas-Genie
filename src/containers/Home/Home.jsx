import React from "react";
import "./Home.scss";
import GasCoupon from "../../components/GasCoupon/GasCoupon";
import DialogBox from "../../components/DialogBox/DialogBox";
import useToggle from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useToggle(false);
  return (
    <>
      <DialogBox isOpen={isOpen} setIsOpen={setIsOpen}></DialogBox>
      <div className="home_container">
        <div className="home_container__header">
          <div className="home_container__header__title">
            <p>🎟️ My Gas Cards</p>
          </div>
          <div className="home_container__header__btn_container">
            <button onClick={setIsOpen}>Leaderboard</button>
            <div className="home_container__header__btn_container__border">
              <button onClick={() => navigate('partner-offers')}>Partner Offers</button>
            </div>
            <button onClick={setIsOpen}>Acquire Instantly</button>
          </div>
        </div>
        <div className="home_container__body">
          <GasCoupon></GasCoupon>
        </div>
      </div>
    </>
  );
}
