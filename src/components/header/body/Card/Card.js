import React from 'react';
import './card.css';

const Card = ({ data }) => {
  const { name, cuisines, avgRating, sla, costForTwo } = data;

  return (
    <div className='res-card'>
      <img
        src='https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg'
        alt='food-img'
        className='res-card-img'
      />
      <div className='res-card-content'>
        <h3 className='res-card-name'>{name}</h3>
        <p className='res-card-cuisines'>{cuisines.join(', ')}</p>
        <div className='res-card-info'>
        <span className='res-card-rating'>
            &#9733; {avgRating} 
          </span>
          <span className='res-card-delivery-time'>
            ⏱ {sla.deliveryTime} mins
          </span>
        </div>
        <p className='res-card-cost'>{costForTwo}</p>
      </div>
    </div>
  );
};

export default Card;
