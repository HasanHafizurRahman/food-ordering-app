import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";
import "./body.css";

const Body = () => {
  const [resLists, setResLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.swiggy.com/dapi/restaurants/list/v5",
          {
            params: {
              lat: 19.9615398,
              lng: 79.29614668,
              "is-seo-homepage-enabled": true,
              page_type: "DESKTOP_WEB_LISTING",
            },
          }
        );
  
        const data = response.data;
  
        // Search for the card containing `restaurants` dynamically
        const restaurantsCard = data?.data?.cards?.find(
          (card) =>
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants?.length
        );
  
        // Extract restaurants if found
        const restaurants =
          restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
          [];
        console.log("Extracted restaurants:", restaurants);
  
        // Map to `.info` if necessary
        const restaurantInfos = restaurants.map((res) => res?.info);
        console.log("Extracted restaurant info:", restaurantInfos);
  
        setResLists(restaurantInfos); // Update the state with restaurant info
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
      prevList.filter((res) => res.avgRating >= 4.1)
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
          resLists.map((res) => <Card key={res?.id} data={res} />)
        ) : (
          <p className="no-data-message">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
