import React from "react";
import "./VideoBox.scss";

export default function VideoBox({isOpen, setIsOpen, setIsWatched}) {
  const videoPath = require("../../assets/ad.mp4");

  const handleVideoEnd = () => {
    setIsWatched();
    setIsOpen();
  };

  return (
    isOpen &&
    <div className="video_box_container">
      <video
        width="100%"
        height="auto"
        controls
        autoPlay
        onEnded={handleVideoEnd}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
