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

const api = {
    key: "4ea8a9bc0049cc6ea4e5292b1cab2113",
    base: "http://api.openweathermap.org/data/2.5/"
}

function Weather() {

    const [search, setSearch] = useState("")
    const [weather, setWeather] = useState(false)

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "02n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "010d": rain_icon,
        "010n": rain_icon,
        "013d": snow_icon,
        "013n": snow_icon,
    }

    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metricAPPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
            })
    }

    return (
        <>
            <div className='weather'>
                <div className='search-bar'>
                    <input type='text' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
                    <img src={search_icon} alt='' onClick={() => searchPressed()} />
                </div>

                <img src={weather.icon} alt='weather-icon' className='weather-icon' />
                <p className='temperature'>{weather.main.temp}</p>
                <p className='location'>{weather.name}</p>
                <div className='weather-data'>
                    <div className='col'>
                        <img src={humidity_icon} alt='' />
                        <div>
                            <p>{weather.main.humidity}</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={wind_icon} alt='' />
                        <div>
                            <p>{weather.wind.speed}</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather
