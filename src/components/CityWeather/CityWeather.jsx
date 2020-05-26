import React, { useState } from 'react';
import { Container, Row, Col, ListGroup  } from 'react-bootstrap';

const CityWeather = ( { name, main, sys}) => {

  const [scale] = useState(
    [
      {
        id: 0,
        labelShort: 'ºC',
        label: 'Celsius',
        convert: (k) => k - 273.15
      },
      {
        id: 1,
        labelShort: 'ºF',
        label: 'Farenheit',
        convert: (k) => ( k * (9/5) ) - 459.67
      },
      {
        id: 2,
        labelShort: 'K',
        label: 'Kelvin',
        convert: (k) => k
      }
    ]
  )

  const [selectedScale, setSelectedScale] = useState(0);

  return (
    <Container>
      <Row>
        <Col>
          <label style={{color: "grey"}}>Today in: </label>
          <span style={{fontSize: "22px"}}>{` ${name}, ${sys.country}` }</span> 
        </Col>

        <Col>
        <label style={{color: "grey"}}>Show information in:   </label>
          {/* {`Show information in:  `} */}
          {scale.map( el =>  <span 
                                style={{color: "#007bff", cursor: "pointer"}}
                                key={el.id}
                                onClick={() => setSelectedScale(el.id)}> {el.label}
                              </span>
          )}
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md lg="6">
        <ListGroup variant="flush" style={{borderRadius: "8px"}}>
          <ListGroup.Item>
            <Row>
              <Col Col xs lg="6">Temperature:</Col>
              <Col Col xs lg="4">{Math.trunc( scale[selectedScale].convert(main.temp) )} {scale[selectedScale].labelShort}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col Col xs lg="6">Max temperature:</Col>
              <Col Col xs lg="4">{Math.trunc( scale[selectedScale].convert(main.temp_max) )} {scale[selectedScale].labelShort}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col Col xs lg="6">Min temperature:</Col>
              <Col Col xs lg="4">{Math.trunc( scale[selectedScale].convert(main.temp_min) )} {scale[selectedScale].labelShort}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col Col xs lg="6">Pressure:</Col>
              <Col Col xs lg="4">{main.pressure} hPa</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col Col xs lg="6">Humidity:</Col>
              <Col Col xs lg="4">{main.humidity} %</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col>
        
        </Col>
      </Row>
    </Container>
  )
}

export default CityWeather;