import React, {useState, useEffect, useContext} from 'react';
import {Cell, Grid} from "react-foundation";

import {calculateFeelsLikeTemp} from '../../utils/weather';
import testWeatherData from '../../data/test-weather.json'
import {WeatherContext} from "../../contexts/weather";

const CurrentWeather = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const weatherContext = useContext(WeatherContext);

  const [currentTemp, setCurrentTemp] = useState(null);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [chanceOfPrecip, setChanceOfPrecip] = useState(null);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {
    if (weatherContext.forecast) {
      setCurrentTemp(Math.round(weatherContext.forecast.currently.temperature));
      setFeelsLikeTemp(Math.round(weatherContext.forecast.currently.apparentTemperature));
      setWeatherIcon(weatherContext.forecast.currently.icon)
      // setChanceOfPrecip(weatherContext.forecast.daily.data[0].precipProbability)
    }
  }, [weatherContext.forecast]);

  /*******************************************
   * STYLES
   *******************************************/

  const currentWeatherStyle = {
    'marginTop': '20px'
  };

  const currentTempStyle = {
    'lineHeight': '80%',
    'fontSize': '150px',
    'marginBottom': '15px'
  };

  const feelsLikeTempTextStyle = {
    'verticalAlign': 'top',
    'fontSize': '24px',
    marginLeft: -70
  };

  const feelsLikeTempNumberStyle = {
    'lineHeight': '80%',
    'fontSize': '74px'
  };

  const imageStyle = {
    'display': 'block',
    'width': '100%',
    'height': 'auto'
  };

  /****************************************
   * RENDER METHODS
   ****************************************/

  const renderTempFormat = (temp) => {
    return (
      <span>{temp}&#176;</span>
    )
  };

  const renderTemp = () => {
    return (
      <div>
        <Grid>
          <Cell style={currentTempStyle}>
            {renderTempFormat(currentTemp)}
          </Cell>
          <Cell style={{textAlign: 'left'}}>
            <span style={feelsLikeTempTextStyle}>feels like</span><span style={feelsLikeTempNumberStyle}> {renderTempFormat(feelsLikeTemp)}</span>
          </Cell>
        </Grid>
      </div>
    )
  };

  const renderWeather = () => {
    return(
      <div>
        <img style={imageStyle} src={`/images/weather-icons/${weatherIcon}.svg`}/>
        {/*{Math.round(chanceOfPrecip * 100)}%*/}
      </div>
    )
  };

  return (
    <Grid style={currentWeatherStyle}>
      <Cell small={5}>
        {renderWeather()}
      </Cell>
      <Cell small={7}>
        {renderTemp()}
      </Cell>
    </Grid>
  )
};

export default CurrentWeather;