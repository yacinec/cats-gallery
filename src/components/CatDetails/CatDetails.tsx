import * as React from 'react';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getBirthdate } from '../../cat-services';

import './CatDetails.scss';

export default function CatDetails() {
  const params = useParams();
  const context = useGlobalContext();
  const cat = context.cats.find((cat) => cat.id === params.catId);
  const [alertMessage, setAlertMessage] = useState('');

  if (cat === null || cat === undefined) {
    return (
      <div className='alert'>
        <h3>Error 404</h3>
        <p>This cat doesn't exist.</p>
        <button className='closebtn' onClick={() => setAlertMessage('')}>
          ❌
        </button>
      </div>
    );
  }

  return (
    <article className='cat-details'>
      <Link
        style={{ textDecoration: 'none', color: '#ff5695' }}
        className='link'
        to={'/'}
      >
        ⬅️ Back home
      </Link>
      {alertMessage ? (
        <div className='alert'>
          <h3>Appointment request</h3>
          <p>{alertMessage}</p>
          <button className='closebtn' onClick={() => setAlertMessage('')}>
            ❌
          </button>
        </div>
      ) : null}

      <div className='card'>
        <div className='left'>
          <img src={cat.picturePath} alt={cat.name} />
        </div>
        <div className='right'>
          <h2 className='name'>{cat.name}</h2>
          <p>Birthdate: {getBirthdate(new Date(cat.birthdate))}</p>
          <p>Gender: {cat.gender}</p>
          <p>Breed: {cat.breed}</p>
          <button
            className='btn'
            onClick={async () => {
              const message = await context.getAppointment(cat.id, cat.name);
              setAlertMessage(message);
            }}
          >
            Make an appointment to adopt
          </button>
        </div>
      </div>
    </article>
  );
}
