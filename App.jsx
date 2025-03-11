import React, { useState } from "react";
import axios from "axios";
import {Component} from 'react'

class WeatherApp extends Component {
  state={error:"",weather:null,city:""}


   fetchWeather = async () => {
    const {city}=this.state
    if (!city) {
      this.setState({error:"Please enter a city name!"});
    }

    try {
      const API_KEY = "a3d4941179498f3ceca827d81785b7f1";
        const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      this.setState({weather:response.data})
      console.log(response.data)
    } catch (err) {
      this.setState({error:"City not found! Please try again."});
    }
  };
  changed=(event)=>{
     this.setState({city:event.target.value})
  }
  
  render(){
  const {weather,city,error}=this.state
  return (
    <div className="flex flex-col justify-center items-center pt-70">
      <h1 className="text-3xl font-bold mb-5">Weather App</h1>
      <div className="flex space-x-2 mb-5">
        <input
          type="text"
          className="p-2 border rounded-lg"
          placeholder="Enter city name"
          value={city}
          onChange={this.changed}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={this.fetchWeather}
        >
          Get Weather
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="bg-black p-5 rounded-lg shadow-lg text-center">
          <h2 className="font-bold">Country Name:{weather.sys.country}</h2>
          <h2 className="font-bold">City Name:{weather.name}</h2>
          <p className="">description:{weather.weather[0].description}</p>
          <p className="">Temperature:{weather.main.temp}°C</p>
          <p className="text-red">Wind speed:{weather.wind.speed}°C</p>
          <p className="text-red">Humidity:{weather.main.humidity}</p>
        </div>
      )}
    </div>
  );
}
};

export default WeatherApp;
