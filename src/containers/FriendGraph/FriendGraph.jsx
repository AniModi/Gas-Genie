import React, { useState, useEffect } from "react";
import "./FriendGraph.scss";
import { darkTheme } from "reagraph";
import { GraphCanvas } from "reagraph";
import { init, useQuery } from "@airstack/airstack-react"
import { zkNftBase, zkNftLinea } from "../../constants"
import txBuilder from "../../gas-genie-sdk/TxBuilder";
import { gasNftLinea, gasNftBase } from "../../constants";
import { useSDK } from "@metamask/sdk-react-ui";
import { encodeFunctionData } from "viem";
init("1a8fede6b9fa44ddfb305486b3cfea3a0")
const query = `TokenBalances(
  input: {
    filter: {
      tokenAddress: { _eq: ${zkNftLinea} }
    }
    blockchain: linea-testnet
  }
) {
  TokenBalance {
    owner {
      xmtp {
        isXMTPEnabled
      }
      addresses
    }
  }
}
}`
export default function FriendGraph() {
  const { account, chainId } = useSDK()
  const { data, loading } = useQuery(query)
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [node, setNode] = useState({});
  const [show, setShow] = useState(false);
  

  const handleInvite = () => {
    setShow(false);
  }

  useEffect(() => {
    setNodes([]);
    setEdges([]);
    for (let i = 1; i < 10; i++) {
      setNodes((nodes) => [
        ...nodes,
        {
          id: `${i}`,
          label: `Pal ${i}`,
          size: Math.floor(Math.random(0, 10) * 100) % 10,
          fill: "#6f42c1",
          data: {
            priority: 1,
          },
        },
      ]);
    }

    for (let j = 0; j < 10; j++) {
      setEdges((edges) => [
        ...edges,
        {
          id: `${1}->${j}`,
          source: `${1}`,
          target: `${j}`,
          fill: "#6f42c1",
        },
      ]);
    }
  }, []);

  function handleNodeClick(node) {
    setNode(node);
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
    txBuilder({chain: chainName, value: 0, to: contractAddress, data})
    setShow(true);
    console.log(node);
  }

  return (
    <div className="friends_main_container">
      {show && (
        <>
          <div className="friend_details_container">
            <div className="friend_details_container__address">
              <b>Address : </b> 0x36fc6...313e3
            </div>
            <div className="friend_details_container__details">
                Attended Eth India !<br/>
                Attended Eth Istanbul !
            </div>
            <div className="friend_details_container__btn">
                <button onClick={handleInvite}>
                    Invite
                </button>
            </div>
          </div>
        </>
      )}
      <div className="friend_graph_container">
        <GraphCanvas
          theme={darkTheme}
          layoutType={"radialOut3d"}
          children={<directionalLight position={[0, 5, -4]} intensity={1} />}
          nodes={nodes}
          edges={edges}
          cameraMode={"rotate"}
          edgeInterpolation="curved"
          edgeArrowPosition="none"
          layoutOverrides={{
            linkDistance: 200,
          }}
          onNodeClick={(node) => {
            handleNodeClick(node);
          }}
        />
      </div>
    </div>
  );
}
