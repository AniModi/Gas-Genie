import React from "react";
import "./DialogBox.scss";
import {useNavigate} from "react-router-dom";

export default function DialogBox({ isOpen, setIsOpen, setOpenOptions }) {
  const navigate = useNavigate();
  return (
    isOpen && (
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
              <button
                onClick={() => {
                  setOpenOptions();
                  setIsOpen();
                }}
              >
                Watch an advertisement
              </button>
            </div>
            <div className="dialog_box_container__body__button">
              <button onClick={() => {
                navigate("/home/friends")
              }}>Refer a friend</button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
