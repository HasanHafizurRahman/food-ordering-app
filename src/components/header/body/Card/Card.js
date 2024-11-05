import React from 'react';
import './card.css';

const Card = ({ name, rating, price, duration }) => {
  return (
    <div className='res-card'>
      <img src='https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' alt='food-img' />
      <h3>{name}</h3>
      <h4>Fast Food, Fast Casual</h4>
      <h4>{rating}</h4>
      <h4>{price}</h4>
      <h4>{duration}</h4>
    </div>
  );
};

export default Card;