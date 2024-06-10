import React, { useEffect, useRef, useState } from 'react'
import "./weather.css"
import search_icon from '../assets/images/search.png'
import clear_icon from '../assets/images/clear.png'
import cloud_icon from '../assets/images/cloud.png'
import drizzle_icon from '../assets/images/drizzle.png'
import humidity_icon from '../assets/images/humidity.png'
import rain_icon from '../assets/images/rain.png'
import snow_icon from '../assets/images/snow.png'
import wind_icon from '../assets/images/wind.png'

function Weather() {

    const inputRef = useRef()
    const [weatherData, setWeaderData] = useState(false)
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

    const search = async (city) => {

        if (city == "") {
            alert("Enter City Name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.APP_ID}`

            const response = await fetch(url)
            const data = await response.json()

            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon]

            setWeaderData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeaderData(false)
            console.error("Error in fetching weather data")
        }
    }

    useEffect(() => {
        search()
    }, [])

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input type='text' ref={inputRef} placeholder='Search' />
                <img src={search_icon} alt='' onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? <>

                <img src={weatherData.icon} alt='weather-icon' className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}</p>
                <p className='location'>{weatherData.location}</p>
                <div className='weather-data'>
                    <div className='col'>
                        <img src={humidity_icon} alt='' />
                        <div>
                            <p>{weatherData.humidity}</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={wind_icon} alt='' />
                        <div>
                            <p>{weatherData.windSpeed}</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>

            </> : <></>}

        </div>
    )
}

export default Weather
