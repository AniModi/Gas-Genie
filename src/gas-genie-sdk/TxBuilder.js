import { bundlerActions, getSenderAddress, signUserOperationHashWithECDSA } from "permissionless"
import { pimlicoBundlerActions, pimlicoPaymasterActions } from "permissionless/actions/pimlico"
import { concat, createClient, createPublicClient, encodeFunctionData, http, formatGwei } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { baseGoerli, lineaTestnet, polygonMumbai } from "viem/chains"

const txBuilder = async ({ chain, to, value, data }) => {
    const resolver = chain => {
        if (chain === 'linea-testnet') return [lineaTestnet, 59140]
        else if (chain === 'base-goerli') return [baseGoerli, 84531]
        else if (chain === 'mumbai') return [polygonMumbai, 80001]
    }

    const publicClient = createPublicClient({
        transport: http("https://rpc.goerli.linea.build/"),
        chain: lineaTestnet
    })

    // find the list of chain names on the Pimlico verifying paymaster reference page
    const apiKey = "4c3853a3-69ec-4fb1-ba2b-8da87496c874" // REPLACE THIS

    const bundlerClient = createClient({
        transport: http(`https://api.pimlico.io/v1/${chain}/rpc?apikey=${apiKey}`),
        chain: resolver(chain)[0]
    }).extend(bundlerActions).extend(pimlicoBundlerActions)

    const paymasterClient = createClient({
        // ⚠️ using v2 of the API ⚠️ 
        transport: http(`https://api.pimlico.io/v2/${chain}/rpc?apikey=${apiKey}`),
        chain: resolver(chain)[0]
    }).extend(pimlicoPaymasterActions)

    const pkey = generatePrivateKey()
    const owner = privateKeyToAccount(pkey)
    const initCode = concat([
        "0x9406Cc6185a346906296840746125a0E44976454",
        encodeFunctionData({
            abi: [{
                inputs: [{ name: "owner", type: "address" }, { name: "salt", type: "uint256" }],
                name: "createAccount",
                outputs: [{ name: "ret", type: "address" }],
                stateMutability: "nonpayable",
                type: "function",
            }],
            args: [owner.address, 0n]
        })
    ])

    const sender = await getSenderAddress(publicClient, {
        initCode,
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    })

    const callData = encodeFunctionData({
        abi: [{
            inputs: [
                { name: "dest", type: "address" },
                { name: "value", type: "uint256" },
                { name: "func", type: "bytes" },
            ],
            name: "execute",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        }],
        args: [to, value, data]
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({chainId: resolver(chain)[1]})
    }
    
    const infuraGasApiCall = await fetch('http://localhost:8000/gas', options)
    const gasPrice = await infuraGasApiCall.json()

    const userOperation = {
        sender,
        nonce: 0n,
        initCode,
        callData,
        maxFeePerGas: gasPrice.high.suggestedMaxFeePerGas*10**9,
        maxPriorityFeePerGas: gasPrice.high.suggestedMaxPriorityFeePerGas*10**9,
        // dummy signature, needs to be there so the SimpleAccount doesn't immediately revert because of invalid signature length
        signature: "0xa15569dd8f8324dbeabf8073fdec36d4b754f53ce5901e283c6de79af177dc94557fa3c9922cd7af2a96ca94402d35c39f266925ee6407aeb32b31d76978d4ba1c"
    }

    const sponsorUserOperationResult = await paymasterClient.sponsorUserOperation({
        userOperation,
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    })

    const sponsoredUserOperation = {
        ...userOperation,
        preVerificationGas: sponsorUserOperationResult.preVerificationGas,
        verificationGasLimit: sponsorUserOperationResult.verificationGasLimit,
        callGasLimit: sponsorUserOperationResult.callGasLimit,
        paymasterAndData: sponsorUserOperationResult.paymasterAndData
    }

    const signature = await signUserOperationHashWithECDSA({
        account: owner,
        userOperation: sponsoredUserOperation,
        chainId: resolver(chain)[0].id,
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    })
    sponsoredUserOperation.signature = signature

    const userOperationHash = await bundlerClient.sendUserOperation({
        userOperation: sponsoredUserOperation,
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    })

    const receipt = await bundlerClient.waitForUserOperationReceipt({ hash: userOperationHash })
    const txHash = receipt.receipt.transactionHash
    console.log(`${txHash}`)
}

export default txBuilder;