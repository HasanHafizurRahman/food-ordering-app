import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import "./body.css";

const Body = () => {
  const [resLists, setResLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurant data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.29614668&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        );
        const data = await response.json();
        const restaurants =
          data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];
        setResLists(restaurants);
      } catch (err) {
        setError("Failed to fetch restaurant data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle filtering for top-rated restaurants
  const handleFilterTopRated = () => {
    setResLists((prevList) =>
      prevList.filter((res) => res.info.avgRating >= 4.1)
    );
  };

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={handleFilterTopRated}>
          Top Rated
        </button>
      </div>
      <div className="res-container">
        {loading ? (
          <p className="loading-message">Loading restaurants...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : resLists.length > 0 ? (
          resLists.map((res) => <Card key={res.info.id} data={res?.info} />)
        ) : (
          <p className="no-data-message">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
