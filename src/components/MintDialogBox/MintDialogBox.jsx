import React from "react";
import "./MintDialogBox.scss";
import txBuilder from "../../gas-genie-sdk/TxBuilder";
import { gasAbi, gasNftLinea, gasNftBase } from "../../constants";
import { encodeFunctionData } from "viem";
import { useSDK } from "@metamask/sdk-react-ui";

export default function MintDialogBox({ isWatched, setIsWatched }) {
  const { account, chainId } = useSDK()
  const mint = async () => {
    const data = encodeFunctionData({
      abi: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "gasLimit",
              "type": "uint256"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }],
      args: [account, 1]
    })
    let chainName = ''
    let contractAddress = ''
    if (chainId == 59140) {
      chainName = 'linea-testnet'
      contractAddress = gasNftLinea
    }
    else if (chainId == 84531) {
      chainName = 'base-goerli'
      contractAddress = gasNftBase
    }
    txBuilder({ chain: chainName, to: contractAddress, value: 0, data })
  }
  return (
    isWatched && (
      <>
        <div className="mint_box_container">
          <div className="mint_box_container__close_container">
            <div className="mint_box_container__close_container__close_btn">
              <button onClick={setIsWatched}>X</button>
            </div>
          </div>
          <div className="mint_box_container__title">
            <h1>Mint your coupon</h1>
          </div>
          <div className="mint_box_container__body">
            <div className="mint_box_container__body__button">
              <button
                onClick={() => {
                  mint()
                }}
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
