import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";
import "./body.css";
import ShimmerLoading from "../../loading/ShimmerLoading";
import { saveRestaurants, getRestaurants } from "../../../../indexedDB";

const Body = () => {
  const [resLists, setResLists] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        // Step 1: Always load data from IndexedDB first
        const offlineData = await getRestaurants();
  
        if (offlineData.length > 0) {
          console.log("Loaded data from IndexedDB:", offlineData);
          setResLists(offlineData);
          setFilteredResList(offlineData);
        }
  
        // Step 2: Fetch data from API only if online and URL is valid
        if (navigator.onLine) {
          const apiUrl = "https://www.swiggy.com/dapi/restaurants/list/v5";
          if (apiUrl) {
            const response = await axios.get(apiUrl, {
              params: {
                lat: 19.9615398,
                lng: 79.29614668,
                "is-seo-homepage-enabled": true,
                page_type: "DESKTOP_WEB_LISTING",
              },
            });
  
            const data = response.data;
  
            const restaurantsCard = data?.data?.cards?.find(
              (card) =>
                card?.card?.card?.gridElements?.infoWithStyle?.restaurants?.length
            );
  
            const restaurants =
              restaurantsCard?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants || [];
  
            const restaurantInfos = restaurants.map((res) => res?.info);
  
            if (restaurantInfos.length > 0) {
              console.log("Loaded data from API:", restaurantInfos);
              setResLists(restaurantInfos);
              setFilteredResList(restaurantInfos);
  
              // Save fresh data to IndexedDB
              await saveRestaurants(restaurantInfos);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError(
          "Failed to fetch restaurant data. Please check your connection or try again later."
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleFilterTopRated = () => {
    setFilteredResList((prevList) =>
      prevList.filter((res) => res.avgRating >= 4.1)
    );
  };

  const handleSearch = () => {
    const filteredRes = resLists.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResList(filteredRes);
  };

  return (
    <div className="body">
      <div className="filter">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-box"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button className="filter-btn" onClick={handleFilterTopRated}>
          Top Rated
        </button>
      </div>
      <div className="res-container">
        {loading ? (
          <ShimmerLoading />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredResList.length > 0 ? (
          filteredResList.map((res) => <Card key={res?.id} data={res} />)
        ) : (
          <p className="no-data-message">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
