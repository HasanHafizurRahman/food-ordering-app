import React from 'react';
import axios from 'axios';
import ShimmerLoading from '../loading/ShimmerLoading';

const RestaurantsMenu = () => {
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=425&submitAction=ENTER'
        );
        console.log("Raw API response:", response.data);
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
    <div>
      <h1>Restaurants Menu</h1>
      <p>This is the restaurants menu</p>
      {restaurants.map((restaurant, index) => {
        // console.log(`Restaurant at index ${index}:`, restaurant);

        const restaurantInfo = restaurant?.card?.card?.info;
        if (!restaurantInfo) {
          console.warn(`No info found for restaurant at index ${index}`);
          return null;
        }

        // console.log(`Restaurant info at index ${index}:`, restaurantInfo);

       
        return (
          <div key={restaurantInfo.id || index}>
            <h2>{restaurantInfo.name}</h2>
            <p>{restaurantInfo.locality}, {restaurantInfo.areaName}</p>
            <p>Cost for Two: {restaurantInfo.costForTwoMessage}</p>
            <p>Rating: {restaurantInfo.avgRating} ({restaurantInfo.totalRatingsString})</p>
            <ul>
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
