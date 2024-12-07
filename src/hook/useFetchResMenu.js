import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchResMenu = (id) => {                     
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`
        );
        setRestaurants(response.data?.data?.cards || []);
      } catch (err) {
        console.log(err.message || 'Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { restaurants, isLoading };
};

export default useFetchResMenu;
