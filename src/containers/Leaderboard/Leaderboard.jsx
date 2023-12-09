import React from "react";
import "./Leaderboard.scss";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox/DialogBox";
import useToggle from "../../hooks/useToggle";
import OptionBox from "../../components/OptionBox/OptionBox";
import VideoBox from "../../components/VideoBox/VideoBox";
import MintDialogBox from "../../components/MintDialogBox/MintDialogBox";


export default function Leaderboard() {
  const leaderboard = [
    {
      rank: 1,
      walletAddress: "0x1234567890",
      totalGasSaved: 100,
    },
    {
      rank: 2,
      walletAddress: "0x1234567890",
      totalGasSaved: 90,
    },
    {
      rank: 3,
      walletAddress: "0x1234567890",
      totalGasSaved: 80,
    },
    {
      rank: 4,
      walletAddress: "0x1234567890",
      totalGasSaved: 80,
    },
    {
      rank: 5,
      walletAddress: "0x1234567890",
      totalGasSaved: 80,
    },
  ];
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
      <div className="leaderboard_container">
        <div className="leaderboard_container__header">
          <div className="leaderboard_container__header__title">
            <p>🏆 Leaderboard 🏆</p>
          </div>
          <div className="leaderboard_container__header__btn_container">
            <button onClick={() => navigate("/home")}>My Passes</button>
            <div className="leaderboard_container__header__btn_container__border">
              <button onClick={() => navigate("/home/partner-offers")}>
                Partner Offers
              </button>
            </div>
            <button onClick={setIsOpen}>Acquire Instantly</button>
          </div>
        </div>
        <div className="leaderboard_container__body">
          <table className="leaderboard_container__body__table">
            <thead className="leaderboard_container__body__table__header">
              <tr>
                <th>Rank 🏃‍♂️</th>
                <th>Wallet Address ✉️</th>
                <th>Total Gas Saved ⛽</th>
              </tr>
            </thead>
            <tbody className="leaderboard_container__body__table__body">
              {leaderboard.map((item, index) => (
                <tr key={index}>
                  <td>{item.rank}</td>
                  <td>{item.walletAddress}</td>
                  <td>{item.totalGasSaved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
