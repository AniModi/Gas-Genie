import React from "react";
import useToggle from "../../hooks/useToggle";
import "./PartnerOffers.scss";
import DialogBox from "../../components/DialogBox/DialogBox";
import { useNavigate } from "react-router-dom";
import PartnerOfferBox from "../../components/PartnerOfferBox/PartnerOfferBox";
import OptionBox from "../../components/OptionBox/OptionBox";
import VideoBox from "../../components/VideoBox/VideoBox";
import MintDialogBox from "../../components/MintDialogBox/MintDialogBox";

export default function PartnerOffers() {

  const data = [
    {
      src: "https://assets-global.website-files.com/61fc15c0f8310d584dfc683b/64f2b538468c25972d5edb81_Frame%20512918836.svg",
      about:
        "Embark on a journey with ETHIndia, a Zuzalu for builders, where innovation thrives, collaboration knows no bounds, and hierarchies fade into self-sovereign ownership.",
      offer: "Upto 0.005 ETH worth of gas ⛽",
      availsLeft: 3,
      totalAvails: 10,
      availBtn: "Participate",
    },
    {
      src: "https://images.mirror-media.xyz/publication-images/cgqxxPdUFBDjgKna_dDir.png?height=1200&width=1200",
      about: "Solve the issue #187 of base-org/pessimism on Github",
      offer: "Upto 0.002 ETH worth of gas ⛽",
      availsLeft: 0,
      totalAvails: 1,
      availBtn: "Solve Now",
    },
    {
      src: "https://i.pinimg.com/originals/b3/8a/a1/b38aa1b21050b0e769a97eb751d12829.png",
      about:
        "Order anything worth $60 from your favorite restaurants with the Swiggy app.",
      offer: "Upto 0.001 ETH worth of gas ⛽",
      availsLeft: 7,
      totalAvails: 10,
      availBtn: "Order Now",
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
      <MintDialogBox
        isWatched={isWatched}
        setIsWatched={setIsWatched}
      ></MintDialogBox>
      <div className="partner_offers_container">
        <div className="partner_offers_container__header">
          <div className="partner_offers_container__header__title">
            <p>Offers by our Partners</p>
          </div>
          <div className="partner_offers_container__header__btn_container">
            <button onClick={() => navigate("/home/leaderboard")}>Leaderboard</button>            
            <div className="partner_offers_container__header__btn_container__border">
              <button
                onClick={() => {
                  navigate("/home");
                }}
              >
                My Coupons
              </button>
            </div>
            <button onClick={setIsOpen}>Acquire Instantly</button>
          </div>
        </div>
        <div className="partner_offers_container__body">
          {data.map((item, index) => (
            <div className="partner_offers_container__body__offer" key={index}>
              <PartnerOfferBox {...item}></PartnerOfferBox>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
