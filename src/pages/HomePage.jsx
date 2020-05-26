import React, { useEffect} from 'react';
import InputSearch from '../components/InputSearch/InputSearch';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { getData } from '../actions/index';
import CityMap from '../components/CityMap/CityMap';
import CityWeather from '../components/CityWeather/CityWeather';

const HomePage = () => {
  const selectedCity = useSelector(state => state.selectedCity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  })

  
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md lg="6">
          <h1>Weather Challenge App</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-5">
        <Col md lg="6">
          <InputSearch /> 
        </Col>
      </Row>
        
      <Row className="justify-content-md-center">
        <Col xs="12" lg="8">
          {selectedCity.name && <CityWeather {...selectedCity} /> }
        </Col>
          <Col xs="12" lg="4" className="justify-content-md-center mt-4">
            {selectedCity.coord && <CityMap {...selectedCity.coord } zoom={11} />}
          </Col>
      </Row>
    </Container>
  );
}

export default HomePage;