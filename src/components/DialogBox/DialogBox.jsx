import React from "react";
import "./DialogBox.scss";

export default function DialogBox({ isOpen, setIsOpen }) {
  if (!isOpen) return <></>;
  return (
    <>
      <div className="dialog_box_container">
        <div className="dialog_box_container__close_container">
          <div className="dialog_box_container__close_container__close_btn">
            <button onClick={setIsOpen}>X</button>
          </div>
        </div>
        <div className="dialog_box_container__title">
          <h1>Get more coupons</h1>
        </div>
        <div className="dialog_box_container__body">
          <div className="dialog_box_container__body__button">
            <button>Watch an add</button>
          </div>
          <div className="dialog_box_container__body__button">
            <button>Refer a friend</button>
          </div>
        </div>
      </div>
    </>
  );
}
