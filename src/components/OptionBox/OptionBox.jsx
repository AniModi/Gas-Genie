import React from "react";
import "./OptionBox.scss";

export default function OptionBox({ isOpen, setIsOpen, setOpenAd }) {
  return (
    isOpen && (
      <>
        <div className="option_box_container">
          <div className="option_box_container__close_container">
            <div className="option_box_container__close_container__close_btn">
              <button onClick={setIsOpen}>X</button>
            </div>
          </div>
          <div className="option_box_container__title">
            <h1>Choose coupon value</h1>
          </div>
          <div className="option_box_container__body">
            <div className="option_box_container__body__button">
              <button
                onClick={() => {
                  setOpenAd();
                  setIsOpen();
                }}
              >
                Upto 0.0001 (2 min ad)
              </button>
            </div>
            <div className="option_box_container__body__button">
              <button
                onClick={() => {
                  setOpenAd();
                  setIsOpen();
                }}
              >
                Upto 0.0002 (4 min ad)
              </button>
            </div>
            <div className="option_box_container__body__button">
              <button
                onClick={() => {
                  setOpenAd();
                  setIsOpen();
                }}
              >
                Upto 0.0003 (6 min ad)
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
