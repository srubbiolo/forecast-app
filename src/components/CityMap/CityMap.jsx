import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const CityMap = ({ lat, lon, zoom }) => {
  const center = {
    //fallback Pipa just in case
    lat: lat || -6.22758,
    lng: lon || -35.0476
  };

  const containerStyle = {
    width: '400px',
    height: '300px',
    borderRadius: '5px',
    border: '2px solid grey'
  };

  return (
    <LoadScript
        googleMapsApiKey="AIzaSyD_ZoTCvqf-K0XnkGS19ngGeJKkZL4isAM"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
        >
        </GoogleMap>
    </LoadScript>
  )
}

export default CityMap;