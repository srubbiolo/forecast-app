import React from 'react';

const SearchedElement = ({ removeCityFromPrev, previoslySearched, name }) => {

  return (
    <div>
      {previoslySearched && <span onClick={() => removeCityFromPrev()}> &#10006;</span>}
      <span>{name}</span> 
    </div>
  )
}

export default SearchedElement;