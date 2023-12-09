import React, { useState } from "react";
import "./GasCoupon.scss";
import txBuilder from "../../gas-genie-sdk/TxBuilder";

export default function GasCoupon() {
  const [eth, setEth] = useState(0.001);
  const [expiry, setExpiry] = useState("31st December 2023 (UTC)");
  return (
    <div className="gas_coupon_border">
      <div className="gas_coupon_container" onClick={()=>txBuilder({chain: 'linea-testnet'})}>
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
  );
}
