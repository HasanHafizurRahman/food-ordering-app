import React from 'react';
import Card from './Card/Card';
import './body.css';
import { restaurantLists } from '../../../restaurantLists';

const Body = () => {
  return (
    <div className='body'>      
      <div className='Search'>
        Search
      </div>
      <div className='res-container'>
        {restaurantLists.map((res) => (
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