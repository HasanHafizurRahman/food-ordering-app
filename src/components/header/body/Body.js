import React from 'react';
import Card from './Card/Card';

const Body = () => {
  return (
    <div className='body'>      
      <div className='Search'>
        Search
      </div>
      <div className='res-container'>
        <Card />
      </div>
    </div>
  );
};  

export default Body;