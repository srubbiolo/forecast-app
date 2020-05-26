import { 
  DATA_LOADED,
  SET_CITY,
  SESSION_STORAGE_CODE,
  REMOVE_CITY } from '../constants/action-types';

export function setCity(payload) {

  //Get existing string from localStorage and converting string to object
  let arrayOfCities = JSON.parse( localStorage.getItem(SESSION_STORAGE_CODE) );

  //Don't re add the city in case its on the array already
  if (arrayOfCities.findIndex(x => x.id === payload.id) < 0) {

    //limit max of 5 saved at local storage
    if (arrayOfCities.length > 4) {
      arrayOfCities.splice(0, 1, payload)
    } else {
      arrayOfCities.unshift(payload);
    }
  }

  localStorage.setItem(SESSION_STORAGE_CODE, JSON.stringify(arrayOfCities) );
  return { type: SET_CITY, arrayOfCities, payload }
}

export function removeCity(payload) {
  let arrayOfCities = JSON.parse( localStorage.getItem(SESSION_STORAGE_CODE) );
  let filteredArray = arrayOfCities.filter( city => {
    return city.id !== payload.id;
  })

  localStorage.setItem(SESSION_STORAGE_CODE, JSON.stringify(filteredArray) );
  return { type: REMOVE_CITY, filteredArray }
}

export function getData() {
  if (localStorage.getItem(SESSION_STORAGE_CODE) === null) {
    let arr = [];
    localStorage.setItem(SESSION_STORAGE_CODE, JSON.stringify(arr));
  }
  return { type: DATA_LOADED, payload: JSON.parse( localStorage.getItem(SESSION_STORAGE_CODE) ) };
}