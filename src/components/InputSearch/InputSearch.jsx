import React, { useState, useEffect } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useSelector, useDispatch } from 'react-redux';
import { setCity, removeCity } from '../../actions/index';
import  SearchedElement  from './SearchedElement';
const SEARCH_URI = 'https://api.openweathermap.org/data/2.5/weather';

const InputSearch = () => {
  const previousSearches = useSelector(state => state.allCities);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [toRemove, setToRemove] = useState(false);
  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    setOptions(previousSearches)
  },[previousSearches])

  const citySelected = (city) => {
    let selectedCity = city[0];
    if (selectedCity !== undefined) {//library errors / lack of understanding
      //TODO: change this, didn't figure out how to click cross and not execute this onchange, event.preventedefault didn't work :(
      if (toRemove) {
        dispatch(removeCity(selectedCity));
        setToRemove(false);
      } else {
        //Just adding prop previoslySearched for the X appearing purposes
        dispatch(setCity({...selectedCity, previoslySearched: true}));
      }
    }
  }

  const removeCityFromPrev = () => {
    setToRemove(true)
  }

  //TODO: do this on back end
  async function handleSearch (query) {
    setIsLoading(true);
    setOptions(previousSearches);
    
    const resp = await fetch(`${SEARCH_URI}?q=${query}&appid=c0b02444709c5dc54be09a20371ca397`);
    const json = await resp.json();
    
    let opt;
    if (json.cod !== "404") {
      if (previousSearches.findIndex(x => x.id === json.id) < 0) {
        opt = [...previousSearches, {...json}];
      } else {
        opt = [...previousSearches]
      }

      setOptions(opt);
    } else {
      opt = [...previousSearches]
      setOptions(opt);
    }
    setIsLoading(typeof json === Object);

  };

  return (
    <AsyncTypeahead
      id="async-input"
      isLoading={isLoading}
      useCache={false}
      labelKey="name"
      minLength={0}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a city..."
      onChange={ (selected) => citySelected(selected) }
      renderMenuItemChildren={option => (
        <SearchedElement
          removeCityFromPrev={removeCityFromPrev}
          {...option} />
      )}
    />
  );
}

export default InputSearch;