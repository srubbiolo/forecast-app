import { 
  SELECT_HERO,
  DATA_LOADED,
  HERO_LOADED,
  SET_CITY,
  SESSION_STORAGE_CODE,
  REMOVE_CITY } from '../constants/action-types';
// const SEARCH_URI = 'https://api.openweathermap.org/data/2.5/weather';

export function setHero(payload) {
    return { type: SELECT_HERO, payload }
};

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

export function getHero(apiKey, heroId) {
  return function(dispatch) {
    // TODO: here move the apikey to a separate file to mae it configurable, its available on the mern project
    return fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroId}?apikey=${apiKey}`)
      .then(response => response.json())
      .then(json => {
        if (json.code === 404) {
          dispatch({ type: HERO_LOADED, payload: {} });
        } else {
          dispatch({ type: HERO_LOADED, payload: json.data.results[0] });
        }
      });
  };
};

// export async function findCity (query) {
//   setIsLoading(true);
//   setOptions(previousSearches);
  
//   const resp = await fetch(`${SEARCH_URI}?q=${query}&appid=c0b02444709c5dc54be09a20371ca397`);
//   const json = await resp.json();
  
//   let opt;
//   if (json.cod !== "404") {
//     if (previousSearches.findIndex(x => x.id === json.id) < 0) {
//       opt = [...previousSearches, {...json}];
//     } else {
//       opt = [...previousSearches]
//     }

//     setOptions(opt);
//   } else {
//     opt = [...previousSearches]
//     setOptions(opt);
//   }
//   setIsLoading(typeof json === Object);

// };

export function getData() {
  if (localStorage.getItem(SESSION_STORAGE_CODE) === null) {
    let arr = [];
    localStorage.setItem(SESSION_STORAGE_CODE, JSON.stringify(arr));
  }
  return { type: DATA_LOADED, payload: JSON.parse( localStorage.getItem(SESSION_STORAGE_CODE) ) };
}