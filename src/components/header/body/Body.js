import React from 'react';
import Card from './Card/Card';
import './body.css';
import { restaurantLists } from '../../../restaurantLists';

const Body = () => {
  const [resLists, setResLists] = React.useState(restaurantLists);
  const handleClick = () => {
    setResLists(resLists.filter((res) => res.data.avgRating > 4.1));
  };
  return (
    <div className='body'>      
      <div className='filter'>
        <button className='filter-btn' onClick={handleClick}>Top Rated</button>
      </div>
      <div className='res-container'>
        {resLists.map((res) => (
          <Card 
          key={res.data.id}
          data={res.data}
          />
        ))}
      </div>
    </div>
  );
};  

export default Body;