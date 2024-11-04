import React from 'react';
import './card.css';

const Card = () => {
  return (
    <div className='res-card'>
      <img src='https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' alt='food-img' />
      <h3>Bismillah Burger</h3>
      <h4>Fast Food, Fast Casual</h4>
      <h4>4.4 stars</h4>
      <h4>₹50</h4>
      <h4>44 mins</h4>
    </div>
  );
};

export default Card;