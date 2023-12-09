import React from "react";
import "./PartnerOfferBox.scss";

export default function PartnerOfferBox({src, about, offer, availsLeft, totalAvails, availBtn}) {
  return (
    <>
      <div className="partner_offers_box_container">
        <div className="partner_offers_box_container__left">
          <div className="partner_offers_box_container__left__image">
            <img
            //   src="https://assets-global.website-files.com/61fc15c0f8310d584dfc683b/64f2b538468c25972d5edb81_Frame%20512918836.svg"
              alt="eth-india"
                src={src}
            />
          </div>
        </div>
        <div className="partner_offers_box_container__right">
          <div className="partner_offers_box_container__right__container">
            <div className="partner_offers_box_container__right__container__about">
              <b>About : </b>
              {/* Embark on a journey with ETHIndia, a Zuzalu for
              builders, where innovation thrives, collaboration knows no bounds,
              and hierarchies fade into self-sovereign ownership. */}
                {about}
            </div>
            <div className="partner_offers_box_container__right__container__offer">
              <b> Offer : </b>
              {/* Upto 0.005 ETH worth of gas */}
                {offer}
            </div>
            <div className="partner_offers_box_container__right__container__avails_left">
              <b>Avails Left : </b>
              {/* <b>3</b> / <b>10</b> */}
                <b>{availsLeft}</b> / <b>{totalAvails}</b>
            </div>
            <div className="partner_offers_box_container__right__container__avail_btn">
              <div className="partner_offers_box_container__right__container__avail_btn__border">
                {/* <button>Avail Now</button> */}
                <button>{availBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
