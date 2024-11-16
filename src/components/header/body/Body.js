import React, { useEffect } from 'react';
import Card from './Card/Card';
import './body.css';

const Body = () => {
  const [resLists, setResLists] = React.useState([]);
  const handleClick = () => {
    setResLists(resLists.filter((res) => res.data.avgRating >= 4.1));
  };

  useEffect(() => {
   fetchData();
  }, [])
 

const fetchData = async () => {
  const res = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.29614668&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
  const data = await res.json();
  // console.log(data?.data?.cards[2].card.card.gridElements.infoWithStyle.restaurants[0].info, 'data');
  setResLists(data?.data?.cards[2].card.card.gridElements.infoWithStyle.restaurants);  
};

  return (
    <div className='body'>      
      <div className='filter'>
        <button className='filter-btn' onClick={handleClick}>Top Rated</button>
      </div>
      <div className='res-container'>
        {resLists?.map((res) => (
          <Card 
          key={res.id}
          data={res.info}
          />
        ))}
      </div>
    </div>
  );
};  

export default Body;