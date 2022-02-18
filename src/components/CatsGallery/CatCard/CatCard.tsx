import * as React from 'react';
import './CatCard.scss';

type CatCardProps = {
  name: string;
  picturePath: string;
};

/**
 *
 * CatCard is a component representing the a single cat in the Cats Gallery
 * @param {string} name,
 * @param {string} picturePath,
 */
const CatCard = ({ name, picturePath }: CatCardProps) => {
  return (
    <div className='cat'>
      <img className='img' src={picturePath} alt={name} />
      <h2 className='title'>{name}</h2>
      <p className='btn hidden-text'>See more</p>
    </div>
  );
};

export default CatCard;
