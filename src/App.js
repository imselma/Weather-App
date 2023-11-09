import ThermostatIcon from '@mui/icons-material/Thermostat';
import {TextField, Autocomplete} from '@mui/material';
import {useEffect, useState} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const cities = ['Sarajevo', 'Mostar', 'New York', 'Stockholm', 'Istanbul', 'Uppsala', 'Gradačac'];

  // case for autocomplete
  const handleChange = (event, value) => {
    setCity(value);
  }

  const fetchWeatherData = async () => {
    try{
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=69f397fb5b33ed4c46404bb3e1feac1e&units=metric`);
      console.log(result.data);
      if(result.status===200){
        setWeatherData(result.data);
      }
    } catch(e){
      
    console.log(e);
  }
   
  }

  useEffect(() => {
    // isto sto i city !== null
    if(city){

      fetchWeatherData();

    }
    else{
      setWeatherData(null);
    }
    //esline-disable-next-line
  }, [city])



  return (
    <div className="App">
      <div className="title-wrapper">
      <h2>WEATHER APP</h2>
          <ThermostatIcon/>
        </div>
        <div className="App-header">
          <div className='input-wrapper'>
          <Autocomplete
                disablePortal
                id="city-search"
                options={cities}
                sx={{width: 300}}
                onChange={(event,value) => handleChange(event,value)} value={city} 
                renderInput={(params) => <TextField {...params} label="City"/>}  
              />    
          </div>
          <div className='weather-wrapper'>
            {weatherData? (
            <><div>
              <h3 className='weather-title'>{weatherData?.name}</h3>
            </div><div className='temperature-wrapper'>
                <div>
                  <p>Temperature</p>
                  <p><b>{Math.round(weatherData?.main?.temp) + " °C"}</b></p>
                </div>
                <div>
                  <p>Feels Like</p>
                  <p><b>{Math.round(weatherData?.main?.feels_like) + " °C"}</b></p>
                </div>
              </div><div>
                <p className='weather'>{weatherData?.weather[0].main}</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                  alt='weather image' width="130" height="100"></img>
              </div><div className='humidity-wrapper'>
                <p>Humidity: <b>{weatherData?.main?.humidity}%</b></p>
              </div></>) : ( <h4>No data available!</h4>)}
          </div>
        </div>
    </div>
  );
}

export default App;
