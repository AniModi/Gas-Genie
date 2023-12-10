import React, { useState } from "react";
import "./Landing.scss";
import logo from "../../assets/landing.svg";
import { useSDK } from "@metamask/sdk-react-ui";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers'
import { aadharAbi, zkNftLinea, zkNftBase } from "../../constants";

export default function Landing() {
  const navigate = useNavigate()
  const { connected, account, chainId } = useSDK()
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const verify = async () => {
    let contractAddress = ''
    if (chainId == 59140) {
      contractAddress = zkNftLinea
    }
    else if (chainId == 84531) {
      contractAddress = zkNftBase
    }
    const contract = new ethers.Contract(contractAddress, aadharAbi, provider)
    const isVerified = await contract.isVerified(account)
    if (isVerified) navigate('./home')
  }

  return (
    <div className="landing_container">
      <div className="landing_container__left">
        <div className="landing_container__left__title">
          <span>GAS - </span>
          <span>GENIE</span>
        </div>
        <div className="landing_container__left__body">
          Gas Buddy is a web application that allows users to find the cheapest
          gas prices in their area. Users can also find the closest gas stations
          to their location.
        </div>
        <div className="landing_container__left__button">
          <button
            disabled={!connected} className={!connected ? "disabled" : ""}
            onClick={verify}>
            {!connected ? "Connect Metamask First!" : "Verify with Anon Aadhar NFT"}
          </button>
          <div className="landing_container__left__aadhar_link">
            <a href="http://localhost:3001/">Don't have an aadhar NFT? Get it now</a>
          </div>
        </div>
      </div>
      <div className="landing_container__right">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}