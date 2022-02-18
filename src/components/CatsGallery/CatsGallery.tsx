import * as React from 'react';
import './CatsGallery.scss';
import CatCard from './CatCard/CatCard';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';

/**
 *
 * CatsGallery is a component representing the list of cats
 */
export default function CatsGallery() {
  // We use the context to get cats from the API.
  const context = useGlobalContext();

  return (
    <div className='gallery'>
      <section className='list'>
        {context.cats.map((cat) => (
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
}
