import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";
import "./body.css";
import ShimmerLoading from "../../loading/ShimmerLoading";
import { Link } from "react-router-dom";

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
        // Step 1: Fetch data from API if online
        if (navigator.onLine) {
          const apiUrl = "https://www.swiggy.com/dapi/restaurants/list/v5";
          // const apiUrl = "http://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5";
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
            setResLists(restaurantInfos);
            setFilteredResList(restaurantInfos);
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
          filteredResList.map((res) => <Link to={`/restaurants/${res?.id}`}><Card key={res?.id} data={res} /></Link>) 
        ) : (
          <p className="no-data-message">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
