import React from 'react';
import './card.css';

const Card = ({ data }) => {
  const { name, cuisines, avgRating, sla, costForTwo, cloudinaryImageId } = data;

  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`;

  return (
    <div className='res-card'>
      <img
        src={imageUrl}
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
            ⏱ {sla?.deliveryTime} mins
          </span>
        </div>
        <p className='res-card-cost'>{costForTwo}</p>
      </div>
    </div>
  );
};

export default Card;
