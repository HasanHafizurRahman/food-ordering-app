import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./body.css";
import ShimmerLoading from "./loading/ShimmerLoading";
import { Link } from "react-router-dom";
import useFetchResList from "../hook/useFetchRestaurants";

const Body = () => {
  const {resLists, loading, error} = useFetchResList();             
  const [filteredResList, setFilteredResList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredResList(resLists);
  }, [resLists]);

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
