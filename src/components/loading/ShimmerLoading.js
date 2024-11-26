import React from "react";
import "./shimmer.css";

const ShimmerCard = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-card-img shimmer"></div>
      <div className="shimmer-card-content">
        <div className="shimmer-line shimmer"></div>
        <div className="shimmer-line shimmer short"></div>
        <div className="shimmer-line shimmer"></div>
        <div className="shimmer-line shimmer short"></div>
      </div>
    </div>
  );
};

const ShimmerLoading = () => {
  return (
    <div className="shimmer-container">
      {Array(10) // Adjust to match the number of placeholder cards you want
        .fill("")
        .map((_, index) => (
          <ShimmerCard key={index} />
        ))}
    </div>
  );
};

export default ShimmerLoading;

