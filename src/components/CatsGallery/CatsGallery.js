import React from 'react';
import './CatsGallery.css';
import CatCard from './CatCard/CatCard';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';

/**
 *
 * CatsGallery is a component representing the list of cats
 */
const CatsGallery = () => {
  // We use the context to get cats from the API.
  const { cats } = useGlobalContext();

  if (cats.length < 1) {
    return <div>There is no cat to display 😢</div>;
  }

  return (
    <div className='gallery'>
      <section className='list'>
        {cats.map((cat) => (
          <Link
            style={{ textDecoration: 'none' }}
            to={'/cat/' + cat.id}
            key={cat.id}
          >
            <CatCard {...cat}></CatCard>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default CatsGallery;
