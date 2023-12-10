import React, { useState } from "react";
import "./GasCoupon.scss";
import txBuilder from "../../gas-genie-sdk/TxBuilder";
import { parseEther } from "viem";

export default function GasCoupon() {
  const [eth, setEth] = useState(0.001);
  const [expiry, setExpiry] = useState("31st December 2023 (UTC)");
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
      <div style={{ marginTop: '20%', marginLeft:'10%', position: 'absolute', fontSize: '1.5rem' }}>
      </div>
    </>
  );
}
