import React, { useContext, useState, useEffect } from 'react';
import { useCallback } from 'react';

const API_URL = 'https://europe-west1-matters-test.cloudfunctions.net/getCats';
const AppContext = React.createContext();

/**
 *
 * This Provider call the API to get the list of cats
 * @param {node} children
 * @returns The provider with all its children and the value of cats
 */
const AppProvider = ({ children }) => {
  const [cats, setCats] = useState([]);

  const fetchCats = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data) {
        const newCats = data.map((cat) => {
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
  }, []);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  return (
    <AppContext.Provider
      value={{
        cats,
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
