'use client'
import { LogInWithAnonAadhaar, useAnonAadhaar, AnonAadhaarProof, AnonAadhaarProvider } from 'anon-aadhaar-react'
import txBuilder from "../../src/gas-genie-sdk/TxBuilder"
export default function Home() {
  const [anonAadhaar] = useAnonAadhaar()

  return (
    <AnonAadhaarProvider _appId='1269609176096593778878666309409951343617561853952'>
      <div>
        <LogInWithAnonAadhaar />
        {anonAadhaar.status === 'logged-in' && (
          <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd)} />
        )}
        <button onClick={()=>txBuilder({ chain: 'linea-testnet', to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', value: '0', data: '0x68656c6c6f'})}>hello</button>
      </div>
    </AnonAadhaarProvider>
  )
}
