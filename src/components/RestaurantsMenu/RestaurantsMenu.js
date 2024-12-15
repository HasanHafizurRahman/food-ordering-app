import React, { useState } from 'react';
import './RestaurantsMenu.css';
import ShimmerLoading from '../loading/ShimmerLoading';
import { useParams } from 'react-router-dom';
import useFetchResMenu from '../../hook/useFetchResMenu';

const RestaurantsMenu = () => {
  const {id} = useParams();
const { restaurants } = useFetchResMenu(id); 
const [activeSection, setActiveSection] = useState(null);    
console.log("res menu", restaurants);                                                                                                       

  if (!restaurants.length) {
    return <ShimmerLoading />;                                                  
  }

  // Filter for grouped cards
  const groupedCards = restaurants
    .find((restaurant) => restaurant?.groupedCard?.cardGroupMap?.REGULAR)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // Filter the relevant sections
  const filteredSections = groupedCards?.filter((card) => {
    const title = card?.card?.card?.title;
    return title === "Recommended" || title === "Biryanis" || title === "Main Course" || title === "Non Veg Main Course" || title === "Veg Main Course";
  });

   // Toggle section function
   const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (                                            
    <div className="container">
    <h1>Restaurants Menu</h1>
    {restaurants.map((restaurant, index) => {
      const restaurantInfo = restaurant?.card?.card?.info;
      if (!restaurantInfo) return null;

      return (
        <div key={restaurantInfo?.id || index} className="restaurant-card">
          <h2>{restaurantInfo?.name}</h2>
          <div className="restaurant-details">
            <p>{restaurantInfo?.locality}, {restaurantInfo?.areaName}</p>
            <p>Cost for Two: {restaurantInfo?.costForTwoMessage}</p>
            <p>Rating: {restaurantInfo?.avgRating} ({restaurantInfo?.totalRatingsString})</p>
          </div>
          <ul className="cuisines-list">
            {(restaurantInfo?.cuisines || []).map((cuisine, cuisineIndex) => (
              <li key={cuisineIndex}>{cuisine}</li>
            ))}
          </ul>
        </div>
      );
    })}

    {/* Render the filtered sections */}
    <div className="menu-sections">
        {filteredSections?.map((section, index) => {
          const title = section?.card?.card?.title;
          const items = section?.card?.card?.itemCards || [];

          return (
            <>
            {items?.length > 0 && <div key={index}>
              <div
                className="accordion-header"
                onClick={() => toggleSection(index)}
              >
                <h2>{title}({items?.length})</h2>
                <span>{activeSection === index ? '-' : '+'}</span>
              </div>
              {activeSection === index && (
                <ul className="menu-items-list">
                  {items.map((item, itemIndex) => {
                    const itemInfo = item?.card?.info;
                    if (!itemInfo) return null;

                    return (
                      <li key={itemIndex} className="menu-item">
                        <p>{itemInfo?.name}</p>
                        <p>Price: ₹{itemInfo?.price / 100}</p>
                        <p>{itemInfo?.description}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>}</>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsMenu;
