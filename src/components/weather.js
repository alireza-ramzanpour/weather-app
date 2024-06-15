import React, { useState } from 'react'
import "./weather.css"
import search_icon from '../assets/images/search.png'
import clear_icon from '../assets/images/clear.png'
import cloud_icon from '../assets/images/cloud.png'
import drizzle_icon from '../assets/images/drizzle.png'
import humidity_icon from '../assets/images/humidity.png'
import rain_icon from '../assets/images/rain.png'
import snow_icon from '../assets/images/snow.png'
import wind_icon from '../assets/images/wind.png'
import axios from 'axios'


function Weather() {

    const [weather, setWeather] = useState({})
    const [location, setLocation] = useState("")

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "010d": rain_icon,
        "010n": rain_icon,
        "013d": snow_icon,
        "013n": snow_icon,
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4ea8a9bc0049cc6ea4e5292b1cab2113`

    const searchPressed = () => {
        axios.get(url).then((response) => {
            setWeather(response.data)
            console.log(response.data);
        })
        setLocation("")
    }

    return (
        <>
            <div className='weather'>
                <div className='search-bar'>
                    <input
                        type='text'
                        value={location}
                        placeholder='Search...'
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <img src={search_icon} alt='search-icon' onClick={() => searchPressed()} />
                </div>

                {weather.weather ? <img src={allIcons[weather.weather[0].icon]} alt='weather-icon' className='weather-icon' /> : null}
                {weather.main ? <p className='temperature'>{weather.main.temp.toFixed()}</p> : null}
                <p className='location'>{weather.name}</p>
                <div className='weather-data'>
                    <div className='col'>
                        <img src={humidity_icon} alt='humidity-icon' />
                        <div>
                            {weather.main ? <p>{weather.main.humidity + " %"}</p> : null}
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={wind_icon} alt='wind-icon' />
                        <div>
                            {weather.wind ? <p>{weather.wind.speed + " Km/h"}</p> : null}
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather
