import React from "react";
import "./Home.scss";
import GasCoupon from "../../components/GasCoupon/GasCoupon";
import DialogBox from "../../components/DialogBox/DialogBox";
import useToggle from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import OptionBox from "../../components/OptionBox/OptionBox";
import VideoBox from "../../components/VideoBox/VideoBox";
import MintDialogBox from "../../components/MintDialogBox/MintDialogBox";

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useToggle(false);
  const [isWatched, setIsWatched] = useToggle(false);
  const [openAd, setOpenAd] = useToggle(false);
  const [openOptions, setOpenOptions] = useToggle(false);


  return (
    <>
      <DialogBox
        setIsOpen={setIsOpen}
        setOpenOptions={setOpenOptions}
        isOpen={isOpen}
      ></DialogBox>
      <OptionBox
        isOpen={openOptions}
        setIsOpen={setOpenOptions}
        setOpenAd={setOpenAd}
      ></OptionBox>
      <VideoBox
        isOpen={openAd}
        setIsOpen={setOpenAd}
        setIsWatched={setIsWatched}
      ></VideoBox>
      <MintDialogBox isWatched={isWatched} setIsWatched={setIsWatched}></MintDialogBox>
      <div className="home_container">
        <div className="home_container__header">
          <div className="home_container__header__title">
            <p>My Passes</p>
          </div>
          <div className="home_container__header__btn_container">
            <button onClick={() => navigate("/home/leaderboard")}>Leaderboard</button>
            <div className="home_container__header__btn_container__border">
              <button onClick={() => navigate("/home/partner-offers")}>
                Partner Offers
              </button>
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
