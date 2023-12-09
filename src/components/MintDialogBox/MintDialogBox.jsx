import React from "react";
import "./MintDialogBox.scss";

export default function MintDialogBox({ isWatched, setIsWatched }) {
  const mint = async () => {
    await "";
    setIsWatched();
  }
  return (
    isWatched && (
      <>
        <div className="mint_box_container">
          <div className="mint_box_container__close_container">
            <div className="mint_box_container__close_container__close_btn">
              <button onClick={setIsWatched}>X</button>
            </div>
          </div>
          <div className="mint_box_container__title">
            <h1>Mint your coupon</h1>
          </div>
          <div className="mint_box_container__body">
            <div className="mint_box_container__body__button">
              <button
                onClick={() =>{
                  mint()
                }}
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
