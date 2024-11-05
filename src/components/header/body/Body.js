import React from 'react';
import Card from './Card/Card';
import './body.css';

const Body = () => {
  return (
    <div className='body'>      
      <div className='Search'>
        Search
      </div>
      <div className='res-container'>
        <Card name="Bismillah Burger" rating="4.4" price="₹50" duration="44 mins" />
        <Card name="ginshin Burger" rating="4.3" price="₹70" duration="124 mins" />
        <Card name="Mayer Dua Food Corner" rating="4.4" price="₹40" duration="34 mins" />
        <Card name="Mayer Dua Food Corner" rating="4.3" price="₹40" duration="34 mins" />
        <Card name="ginshin Burger" rating="4.3" price="₹70" duration="124 mins" />
        <Card name="Bismillah Burger" rating="4.4" price="₹50" duration="44 mins" />
        <Card name="ginshin Burger" rating="4.3" price="₹70" duration="124 mins" />
        <Card name="Mayer Dua Food Corner" rating="4.4" price="₹40" duration="34 mins" />
        <Card name="Mayer Dua Food Corner" rating="4.5" price="₹40" duration="34 mins" />
        <Card name="ginshin Burger" rating="4.3" price="₹70" duration="124 mins" />
        <Card name="Ginshin Burger" rating="4.4" price="₹50" duration="44 mins" />
        <Card name="Mayer Dua Food Corner" rating="4.4" price="₹40" duration="34 mins" />
        <Card name="Bismillah Burger" rating="4.4" price="₹50" duration="44 mins" />
      </div>
    </div>
  );
};  

export default Body;