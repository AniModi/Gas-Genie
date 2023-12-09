'use client'
import { useStartConversation, useClient, useCanMessage } from "@xmtp/react-sdk";
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'
import { MetaMaskButton, useSDK } from "@metamask/sdk-react-ui"
import { ethers } from 'ethers'

const Invite = () => {
    const pathname = usePathname()
    const { client, initialize } = useClient()
    const { canMessage } = useCanMessage()
    const { connected } = useSDK()
    const { startConversation } = useStartConversation()
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    useEffect(() => {
        async function func() {
            const address = pathname.split('/')[2]
            const conversation = await startConversation(address, "Invitation to Gas Genie!")
        }
        func()
    }, [])

    const register = async () => {
        const options = {
            persistConversations: false,
            env: "dev",
        };
        const signer = await provider.getSigner()
        await initialize({ signer });
    }

    return <>
        Connect to register on XMTP!<br />
        {!connected && <MetaMaskButton />}
        {connected && <button onClick={register}>Register</button>}
    </>;
}

export default Invite;