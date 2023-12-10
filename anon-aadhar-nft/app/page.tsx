"use client";
import { useEffect, useState } from "react";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
  AnonAadhaarProvider,
} from "anon-aadhaar-react";
import txBuilder from "../../src/gas-genie-sdk/TxBuilder";
import styles from "./page.module.css";
import { MetaMaskButton, useSDK } from "@metamask/sdk-react-ui"
import { encodeFunctionData } from "viem";
import { ethers } from "ethers"
const zkNftLinea = "0x0041Aac7166A2C19eCFfE2D6b64097fe5F176d31"
const zkNftBase = "0x4E769e22979e6E4fa957d584c57398711182460a"

export default function Home() {
  const [anonAadhaar, x] = useAnonAadhaar();
  const [proof, setProof] = useState<any>();
  const [publicInputs, setPublicInputs] = useState<any[]>();
  const { account, chainId } = useSDK()

  useEffect(() => {
    const proof = JSON.parse(
      localStorage.getItem("anonAadhaar") || "not found"
    ).pcd;
    if (!proof?.proof) {
      return;
    }
    setProof(proof.proof.proof);
    const publicInputs = [
      proof.proof.nullifier,
      splitToWords(BigInt(proof.proof.modulus), BigInt(64), BigInt(32)),
      proof.proof.app_id,
    ];
    setPublicInputs(publicInputs);
  }, [anonAadhaar]);

  function splitToWords(
    number: bigint,
    wordsize: bigint,
    numberElement: bigint
  ) {
    let t = number;
    const words: string[] = [];
    for (let i = BigInt(0); i < numberElement; ++i) {
      const baseTwo = BigInt(2);

      words.push(`${t % BigInt(Math.pow(Number(baseTwo), Number(wordsize)))}`);
      t = BigInt(t / BigInt(Math.pow(Number(BigInt(2)), Number(wordsize))));
    }
    if (!(t == BigInt(0))) {
      throw `Number ${number} does not fit in ${(
        wordsize * numberElement
      ).toString()} bits`;
    }
    return words;
  }

  const mint = async () => {
    const pi_a = [proof.pi_a[0], proof.pi_a[1]]
    const pi_b = [[proof.pi_b[0][0], proof.pi_b[0][1]], [proof.pi_b[1][0], proof.pi_b[1][1]]]
    const pi_c = [proof.pi_c[0], proof.pi_c[1]]
    const _public = [publicInputs[0], ...publicInputs[1], publicInputs[2]]
    
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
              "internalType": "uint256[2]",
              "name": "_pA",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[2][2]",
              "name": "_pB",
              "type": "uint256[2][2]"
            },
            {
              "internalType": "uint256[2]",
              "name": "_pC",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[34]",
              "name": "_pubSignals",
              "type": "uint256[34]"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      args: [account, pi_a, pi_b, pi_c, _public]
    })
    let chainName = ''
    let contractAddress = ''
    if (chainId == 59140) {
      chainName = 'linea-testnet'
      contractAddress = zkNftLinea
    }
    else if(chainId == 84531){
      chainName = 'base-goerli'
      contractAddress = zkNftBase
    }
    txBuilder({ chain: chainName, to: contractAddress, value: 0, data })
  }

  return (
    <>
      <AnonAadhaarProvider _appId="1269609176096593778878666309409951343617561853952">
        <div className={styles.border}>
          <div className={styles.container}>
            <div className={styles.top}>
              {proof && (
                <>
                  <h1>Proofs</h1>
                  <table className={styles.proofTable}>
                    <tbody>
                      <tr>
                        <td>Pi_a:</td>
                        <td>{proof.pi_a.toString().slice(0, 30)}...</td>
                      </tr>
                      <tr>
                        <td>Pi_b:</td>
                        <td>{proof.pi_b.toString().slice(0, 30)}...</td>
                      </tr>
                      <tr>
                        <td>Pi_c:</td>
                        <td>{proof.pi_c.toString().slice(0, 30)}...</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
            <div className={styles.bottom}>
              <LogInWithAnonAadhaar />
              <button className={styles.mint} onClick={mint}>🖨️ MINT</button>
            </div>
            <MetaMaskButton />
          </div>
        </div>
      </AnonAadhaarProvider>
    </>
  );
}
