import React from 'react';
import './CatCard.css';

/**
 *
 * CatCard is a component representing the a single cat in the Cats Gallery
 * @param {string} name,
 * @param {string} picturePath,
 */
const CatCard = ({ name, picturePath }) => {
  return (
    <div className='cat'>
      <img className='cat--img' src={picturePath} alt={name} />
      <h2 className='cat--title'>{name}</h2>
      <p className='btn hidden-text'>See more</p>
    </div>
  );
};

export default CatCard;
