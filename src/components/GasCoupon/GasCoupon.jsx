import React, { useState } from "react";
import "./GasCoupon.scss";

export default function GasCoupon() {
  const [eth, setEth] = useState(0.1);
  const [expiry, setExpiry] = useState("31st December 2023 (UCT)");
  return (
    <div className="gas_coupon_border">
      <div className="gas_coupon_container">
        <div className="gas_coupon_container__limit">
          <p>Gas fees upto {eth} ETH</p>
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
