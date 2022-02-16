import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CatDetails.css';

export default function CatDetails() {
  const params = useParams();
  const { cats } = useGlobalContext();
  const [cat, setCat] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchCat = () => {
    // Get the currentCat
    const currentCat = cats.find((cat) => cat.id === params.catId);

    if (currentCat === undefined) {
      setCat(null);
    } else {
      setCat(currentCat);
    }
  };

  /**
   *
   * Add the missing zero to a number of 'size' digits.
   * We can use it with date
   * @param {number} num
   * @param {number} size
   * @returns number of 'size' digits
   */
  const formatNumber = (num, size) => {
    var formattedNumber = num + '';

    while (formattedNumber.length < size)
      formattedNumber = '0' + formattedNumber;

    return formattedNumber;
  };

  /**
   *
   * Update the alertMessage with the appointment date.
   * Send a POST request to the API to get an appointment date
   * Then the function update the alertMessage state to show to the user the date of his appointment.
   * @return void
   */
  const getAppointment = async () => {
    try {
      const response = await fetch(
        'https://europe-west1-matters-test.cloudfunctions.net/getAdoptionAppointment',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ catId: parseInt(cat.id) }),
        }
      );
      const data = await response.json();

      if (data) {
        const appointmentDate = new Date(data.appointment);
        const day = formatNumber(appointmentDate.getDay(), 2);
        const month = formatNumber(appointmentDate.getMonth(), 2);
        const year = formatNumber(appointmentDate.getFullYear(), 4);
        const hour =
          formatNumber(appointmentDate.getHours(), 2) <= 12
            ? formatNumber(appointmentDate.getHours(), 2) + 'am'
            : formatNumber(appointmentDate.getHours() - 12, 2) + 'pm';

        setAlertMessage(day + '/' + month + '/' + year + ' at ' + hour);
      } else {
        console.log('nope');
      }
    } catch (error) {
      if (error.code === 405) {
        console.log('Method not allowed');
      } else if (error.code === 400) {
        console.log('You must provide a valid catId (number)');
      }
    }
  };

  /**
   *
   * Return the cat's birthdate in the format DD/MM/YYYY
   * @returns string
   */
  const getBirthdate = () => {
    const catDate = new Date(cat.birthdate);
    const day = formatNumber(catDate.getDay(), 2);
    const month = formatNumber(catDate.getMonth(), 2);
    const year = formatNumber(catDate.getFullYear(), 4);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - catDate.getFullYear();
    return day + '/' + month + '/' + year + ' (' + age + 'yo)';
  };

  useEffect(() => {
    fetchCat(params.catId);
  }, [cats, params.catId]);

  if (cat === null || cat === undefined) {
    return <div>This cat doesn't exist</div>;
  }

  return (
    <article className='cat-details'>
      <Link
        style={{ textDecoration: 'none', color: '#ff5695' }}
        className='cat-detail-link'
        to={'/'}
      >
        ⬅️ Back home
      </Link>
      {alertMessage ? (
        <div className='alert'>
          <h3>Appointment request</h3>
          <p>Thank you !</p>
          <p>
            Let's meet at "Paris refuge" the {alertMessage} to finalize{' '}
            {cat.name}'s adoption.
          </p>
          <button className='closebtn' onClick={() => setAlertMessage('')}>
            ❌
          </button>
        </div>
      ) : null}

      <div className='card'>
        <div className='card--left'>
          <img src={cat.picturePath} alt={cat.name} />
        </div>
        <div className='card--right'>
          <h2 className='card--name'>{cat.name}</h2>
          <p>Birthdate: {getBirthdate()}</p>
          <p>Gender: {cat.gender}</p>
          <p>Breed: {cat.breed}</p>
          <button className='btn' onClick={getAppointment}>
            Make an appointment to adopt
          </button>
        </div>
      </div>
    </article>
  );
}
