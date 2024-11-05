import React from 'react';
import './card.css';

const Card = ({ data }) => {
  const {name, cuisines, avgRating, sla, costForTwo} = data;
  return (
    <div className='res-card'>
      <img src='https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' alt='food-img' />
      <h3>{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime}</h4>
    </div>
  );
};

export default Card;