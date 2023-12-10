import React, { useState } from "react";
import "./GasCoupon.scss";
import txBuilder from "../../gas-genie-sdk/TxBuilder";
import { parseEther } from "viem";

export default function GasCoupon() {
  const [eth, setEth] = useState(0.001);
  const [expiry, setExpiry] = useState("31st December 2023 (UTC)");
  const [quotes, setQuotes] = useState(null)
  const showQuotes = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chainId: 59140 })
    }
    const infuraGasApiCall = await fetch('http://localhost:8000/gas', options)
    const gasPrice = await infuraGasApiCall.json()
    setQuotes(gasPrice)
  }
  return (
    <>
      <div className="gas_coupon_border">
        <div className="gas_coupon_container" onClick={() => null}>
          <div className="gas_coupon_container__limit">
            <p style={{ textAlign: 'center' }}>
              <pre>
                ⛽Genie's boost</pre>
              ~{eth} ETH
            </p>
          </div>
          <div className="gas_coupon_container__expiry_container">
            <div className="gas_coupon_container__expiry_container__expiry">
              <p>Expires on {expiry}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20%', marginLeft: '10%', position: 'absolute', fontSize: '1.5rem' }}>
      </div>
      <div style={{ fontSize: 'large', position: 'absolute', marginTop: '30%', marginLeft: '40%' }}>
        Demo Tx: &nbsp;<button style={{ padding: '0.7rem', borderRadius: '10px' }} onClick={showQuotes}>Send ✈️</button></div>
      {quotes && <>
        <div className="dialog_box_container">
          <div className="dialog_box_container__close_container">
            <div className="dialog_box_container__close_container__close_btn">
              <button onClick={() => setQuotes('')}>X</button>
            </div>
          </div>
          <div className="dialog_box_container__title">
            <h1>Available Quotes</h1>
          </div>
          <div className="dialog_box_container__body">
            <div className="dialog_box_container__body__button">
              <button
              >
                Slow: {quotes.low.suggestedMaxFeePerGas} ETH
              </button>
            </div>
            <div className="dialog_box_container__body__button">
              <button>Fast: {quotes.high.suggestedMaxFeePerGas} ETH</button>
            </div>
          </div>
        </div>
      </>}
    </>
  );
}
