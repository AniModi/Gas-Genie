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

export default function Home() {
  const [anonAadhaar, x] = useAnonAadhaar();
  const [proof, setProof] = useState<any>();
  const [publicInputs, setPublicInputs] = useState<any[]>();

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

  return (
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
            <button className={styles.mint}>🖨️ MINT</button>
          </div>
        </div>
      </div>
    </AnonAadhaarProvider>
  );
}
