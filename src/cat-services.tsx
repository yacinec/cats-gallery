/**
 *
 * Add the missing zero to a number of 'size' digits.
 * We can use it with date
 * @param {number} num
 * @param {number} size
 * @returns {string}
 */
export const formatNumber = (num: number, size: number): string => {
  var formattedNumber = num + '';

  while (formattedNumber.length < size) formattedNumber = '0' + formattedNumber;

  return formattedNumber;
};

/**
 *
 * Return the cat's birthdate in the format DD/MM/YYYY
 * @returns string
 */
export const getBirthdate = (birthdate: Date): string => {
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthdate.getFullYear();
  return (
    formatNumber(birthdate.getDay(), 2) +
    '/' +
    formatNumber(birthdate.getMonth(), 2) +
    '/' +
    formatNumber(birthdate.getFullYear(), 4) +
    ' (' +
    age +
    'yo)'
  );
};
