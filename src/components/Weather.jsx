import React, { useEffect, useRef, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import Cloud from "../image/clear.png";
import Humidity from "../image/humidity.png"
import Widn from "../image/wind-spreed.png"

const Weather = () => {
  // input e ja type kora hobe tar ref inputref e rakhar jonno 
  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(null)
  // icon image er jonno object banano hoiche
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon
  }
  // weather er api neya hoiche async function use kore
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0]. icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp *3.6),
        location: data.name,
        icon: icon
      })

    } catch (error) {

    }
  }
  // api kaj kore naki dekhar jonno 
  useEffect(() => {
    search("London");
  }, [])



  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-100">

      {/* card */}
      <div className="bg-white p-10 rounded-xl shadow-lg">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Weather App 🌤️
        </h1>

        {/* search bar */}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search city..."
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-sky-400"
          />

          <button className="bg-sky-500 text-white p-3 rounded-lg text-3xl hover:bg-sky-600 transition" onClick={() => search(inputRef.current.value)}>
            <IoSearch />
          </button>
        </div>

        <div className="flex flex-col items-center mb-5">
          <img
            src={weatherData.icon}
            alt="Cloudy weather"
            className="h-16 mt-5"
          />
          <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
          <p className="text-5xl font-bold">{weatherData.location}</p>
        </div>

        <div className=' flex flex-wrap justify-center items-center gap-3'>
          {/* left */}
          <div className='flex items-center gap-3'>
            <img className='h-10' src={Humidity} />
            <p className='text-2xl font-bold'>{weatherData.humidity}%</p>
            <p className='font-semibold'>Humidity</p>
          </div>
          {/* right */}
          <div className='flex items-center gap-3' >
            <img className='h-10' src={Widn} />
            <p className='text-2xl font-bold'>{weatherData.windSpeed} Km/h</p>
            <p className='font-semibold'>Widn Spreed</p>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Weather
