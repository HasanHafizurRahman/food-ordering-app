import { useState, useEffect } from "react";
import axios from "axios";

const useFetchResList = () => {
  const [resLists, setResLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (navigator.onLine) {
          const apiUrl = "https://www.swiggy.com/dapi/restaurants/list/v5";
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

          setResLists(restaurantInfos);
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

  return { resLists, loading, error };
};

export default useFetchResList;
