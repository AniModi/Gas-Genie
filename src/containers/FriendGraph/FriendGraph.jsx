import React, { useState, useEffect } from "react";
import "./FriendGraph.scss";
import { darkTheme } from "reagraph";
import { GraphCanvas } from "reagraph";

export default function FriendGraph() {
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
          label: `Node ${i}`,
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
    setShow(true);
    console.log(node);
  }

  return (
    <div className="friends_main_container">
      {show && (
        <>
          <div className="friend_details_container">
            <div className="friend_details_container__address">
              <b>Address : </b> 0x1234567890
            </div>
            <div className="friend_details_container__details">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sint!
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
