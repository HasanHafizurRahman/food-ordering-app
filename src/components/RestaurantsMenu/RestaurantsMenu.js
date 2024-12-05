import React from 'react';
import axios from 'axios';
import './RestaurantsMenu.css';
import ShimmerLoading from '../loading/ShimmerLoading';
import { useParams } from 'react-router-dom';

const RestaurantsMenu = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const {id} = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`   
        );
        setRestaurants(response.data?.data?.cards || []);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchData();
  }, []);

  if (!restaurants.length) {
    return <ShimmerLoading />;
  }

  return (
    <div className="container">
      <h1>Restaurants Menu</h1>
      {restaurants.map((restaurant, index) => {
        const restaurantInfo = restaurant?.card?.card?.info;
        if (!restaurantInfo) return null;

        return (
          <div key={restaurantInfo.id || index} className="restaurant-card">
            <h2>{restaurantInfo.name}</h2>
            <div className="restaurant-details">
              <p>{restaurantInfo.locality}, {restaurantInfo.areaName}</p>
              <p>Cost for Two: {restaurantInfo.costForTwoMessage}</p>
              <p>Rating: {restaurantInfo.avgRating} ({restaurantInfo.totalRatingsString})</p>
            </div>
            <ul className="cuisines-list">
              {(restaurantInfo.cuisines || []).map((cuisine, cuisineIndex) => (
                <li key={cuisineIndex}>{cuisine}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantsMenu;
