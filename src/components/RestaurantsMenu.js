import React, { useState } from "react";
import ShimmerLoading from "./loading/ShimmerLoading";
import { useParams } from "react-router-dom";
import useFetchResMenu from "../hook/useFetchResMenu";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantsMenu = () => {
  const { id } = useParams();
  const { restaurants } = useFetchResMenu(id);
  const [activeSection, setActiveSection] = useState(null);
  // console.log("res menu", restaurants);
  const dispatch = useDispatch();

  const imageUrl =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill";

  if (!restaurants.length) {
    return <ShimmerLoading />;
  }

  // Filter for grouped cards
  const groupedCards = restaurants.find(
    (restaurant) => restaurant?.groupedCard?.cardGroupMap?.REGULAR
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // Filter the relevant sections
  const filteredSections = groupedCards?.filter((card) => {
    const title = card?.card?.card?.title;
    return (
      title === "Recommended" ||
      title === "Biryanis" ||
      title === "Main Course" ||
      title === "Non Veg Main Course" ||
      title === "Veg Main Course"
    );
  });

  // Toggle section function
  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleAddCart = (item) => {
    dispatch(addItem(item));
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Restaurants Menu
    </h1>
    {restaurants.map((restaurant, index) => {
      const restaurantInfo = restaurant?.card?.card?.info;
      if (!restaurantInfo) return null;

      return (
        <div
          key={restaurantInfo?.id || index}
          className="bg-white shadow-md rounded-lg p-4 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {restaurantInfo?.name}
          </h2>
          <div className="text-gray-600 mb-2">
            <p>
              {restaurantInfo?.locality}, {restaurantInfo?.areaName}
            </p>
            <p>Cost for Two: {restaurantInfo?.costForTwoMessage}</p>
            <p>
              Rating: {restaurantInfo?.avgRating} (
              {restaurantInfo?.totalRatingsString})
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {(restaurantInfo?.cuisines || []).map((cuisine, cuisineIndex) => (
              <li
                key={cuisineIndex}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm"
              >
                {cuisine}
              </li>
            ))}
          </ul>
        </div>
      );
    })}

    <div className="bg-white shadow-md rounded-lg p-4">
      {filteredSections?.map((section, index) => {
        const title = section?.card?.card?.title;
        const items = section?.card?.card?.itemCards || [];

        return (
          <>
            {items?.length > 0 && (
              <div key={index}>
                <div
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg cursor-pointer mb-4"
                  onClick={() => toggleSection(index)}
                >
                  <h2 className="text-lg font-semibold text-gray-700">
                    {title} ({items?.length})
                  </h2>
                  <span className="text-xl font-bold text-blue-500">
                    {activeSection === index ? "-" : "+"}
                  </span>
                </div>
                {activeSection === index && (
                  <ul className="space-y-4">
                    {items.map((item, itemIndex) => {
                      const itemInfo = item?.card?.info;
                      if (!itemInfo) return null;

                      return (
                        <li
                          key={itemIndex}
                          className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-lg"
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={`${imageUrl}/${itemInfo?.imageId}`}
                              alt={itemInfo?.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <p className="text-lg font-semibold text-gray-800">
                                {itemInfo?.name}
                              </p>
                              <p className="text-blue-500 font-medium">
                                Price: ₹{itemInfo?.price / 100}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {itemInfo?.description}
                              </p>
                            </div>
                          </div>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" 
                          onClick={() => handleAddCart(item)}>
                            <span className="font-bold text-lg">+</span> Add
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </>
        );
      })}
    </div>
  </div>
  );
};

export default RestaurantsMenu;
