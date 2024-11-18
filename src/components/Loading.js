import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="shimmer-spinner">
        <div className="shimmer-bar"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;
