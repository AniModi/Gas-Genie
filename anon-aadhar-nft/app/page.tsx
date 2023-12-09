'use client'
import { useEffect, useState } from 'react'
import { LogInWithAnonAadhaar, useAnonAadhaar, AnonAadhaarProof, AnonAadhaarProvider } from 'anon-aadhaar-react'
import txBuilder from "../../src/gas-genie-sdk/TxBuilder"

export default function Home() {
  const [anonAadhaar, x] = useAnonAadhaar()
  const [proof, setProof] = useState<any>(null)
  const [publicInputs, setPublicInputs] = useState<any[]>()

  useEffect(() => {
    const proof = JSON.parse(localStorage.getItem("anonAadhaar")||'not found').pcd
    console.log()
    setProof(proof.proof.proof)
    const publicInputs = [
      proof.proof.nullifier,
      splitToWords(BigInt(proof.proof.modulus), BigInt(64), BigInt(32)),
      proof.proof.app_id
    ]
    setPublicInputs(publicInputs)
  }, [anonAadhaar]);

  function splitToWords(
    number: bigint,
    wordsize: bigint,
    numberElement: bigint
  ) {
    let t = number
    const words: string[] = []
    for (let i = BigInt(0); i < numberElement; ++i) {
      const baseTwo = BigInt(2)
  
      words.push(`${t % BigInt(Math.pow(Number(baseTwo), Number(wordsize)))}`)
      t = BigInt(t / BigInt(Math.pow(Number(BigInt(2)), Number(wordsize))))
    }
    if (!(t == BigInt(0))) {
      throw `Number ${number} does not fit in ${(
        wordsize * numberElement
      ).toString()} bits`
    }
    return words
  }

  return (
    <AnonAadhaarProvider _appId='1269609176096593778878666309409951343617561853952'>
      <div>
        <LogInWithAnonAadhaar />
        {proof && (<>
          <p className="truncate min-w-0">
            Pi_a: {proof.pi_a.toString().slice(0,30)}...
          </p>
          <p className="truncate min-w-0">
            Pi_b: {proof.pi_b.toString().slice(0,30)}...
          </p>
          <p className="truncate min-w-0">
            Pi_c: {proof.pi_c.toString().slice(0,30)}...
          </p>
        </>
        )}
      </div>
    </AnonAadhaarProvider>
  )
}
