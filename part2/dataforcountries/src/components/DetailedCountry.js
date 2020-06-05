import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DetailedCountry = ({ country }) => {

    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const currentWeather = 'http://api.weatherstack.com/current';
    const [ weather, setWeather ] = useState('')

    useEffect(() =>{
        axios
        .get(`${currentWeather}?access_key=${weather_api_key}&query=${country.capital}`)
        .then(response => {
            console.log(response);
            setWeather(response.data.current)
        })
    }, [])

    return (
        <div>
            <h1>Country name: {country.name}</h1>
            <p>Country capital city: {country.capital}</p>
            <p>Population of {country.name}:{country.population}</p>
            <h2>Languages used:</h2>
            <ul>
                {country.languages.map(language => 
                    <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' style={{height: '50px', width: '50px'}} ></img>

            <hr />
            <div>
                <h1>Weather in {country.name}</h1>
                <img src={weather.weather_icons} alt='weather_icon' style={{height: '50px', width: '50px'}} ></img>
                <p>Temperature: {weather.temperature} Celcius</p>
                <p>Wind: {weather.wind_speed}mph, with direction of: {weather.wind_dir}</p>
            </div>
        </div>
        
    )
}

export default DetailedCountry