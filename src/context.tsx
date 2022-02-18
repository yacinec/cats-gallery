import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useCallback } from 'react';
import { formatNumber } from './cat-services';

interface AppProviderProps {
  cats: any[];
  getAppointment: (id: string, name: string) => Promise<string>;
}

const CATS_ENDPOINT =
  'https://europe-west1-matters-test.cloudfunctions.net/getCats';
const APPOINTMENT_ENDPOINT =
  'https://europe-west1-matters-test.cloudfunctions.net/getAdoptionAppointment';

const AppContext = React.createContext({} as AppProviderProps);

/**
 *
 * This Provider call the API to get the list of cats
 * @param {node} children
 * @returns The provider with all its children and the value of cats
 */
const AppProvider = ({ children }: any) => {
  const [cats, setCats] = useState([]);

  /**
   *
   * Return an array of cats
   * Send a GET request to the API
   * Update the cats state
   * @param {string} id
   */
  const fetchCats = async () => {
    try {
      const response = await fetch(CATS_ENDPOINT);
      const data = await response.json();

      if (data) {
        const newCats = data.map((cat: any) => {
          const { birthdate, breed, gender, id, location, name, picturePath } =
            cat;
          return {
            birthdate: birthdate,
            breed: breed,
            gender: gender,
            id: id,
            location: location,
            name: name,
            picturePath: picturePath,
          };
        });
        setCats(newCats);
      } else {
        setCats([]);
      }
    } catch (error) {
      if (error.code === 405) {
        console.log('Method not allowed');
      }
    }
  };

  /**
   *
   * Return the alertMessage with the appointment date or with an error
   * Send a POST request to the API to get an appointment date
   * Then the function update the alertMessage state to show to the user the date of his appointment.
   * @param {string} id
   * @return {Promise<string>}
   */
  const getAppointment = async (id: string, name: string): Promise<string> => {
    let message = '';
    try {
      const response = await fetch(
        'https://europe-west1-matters-test.cloudfunctions.net/getAdoptionAppointment',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ catId: parseInt(id) }),
        }
      );
      const data = await response.json();

      if (data) {
        const appointmentDate = new Date(data.appointment);
        const day = formatNumber(appointmentDate.getDay(), 2);
        const month = formatNumber(appointmentDate.getMonth(), 2);
        const year = formatNumber(appointmentDate.getFullYear(), 4);
        const hour =
          appointmentDate.getHours() <= 12
            ? formatNumber(appointmentDate.getHours(), 2) + 'am'
            : formatNumber(appointmentDate.getHours() - 12, 2) + 'pm';

        message += 'Thank you !\n';
        message += 'Let\'s meet at "Paris refuge" the ';
        message += day + '/' + month + '/' + year + ' at ' + hour;
        message += ' to finalize ' + name + "'s adoption.";
      } else {
        message = 'No appointment found for this cat.';
      }
    } catch (error) {
      if (error.code === 405) {
        message = 'You are not allowed to access this data.';
      } else if (error.code === 400) {
        message = "This cat doesn't exist";
      }
    }
    return message;
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cats,
        getAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
