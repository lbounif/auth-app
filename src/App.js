
import './App.css';
import csc from 'country-state-city'
import { Country, State, City }  from 'country-state-city';
import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import AppRouter from './router/AppRouter'


const App = () => {

  //   // Get states list from country-state-city library
  //   useEffect(()=> {
  //     const getStates = async() => {
  //       const countryCode = 'AF';
  //       const country = Country.getCountryByCode(countryCode);
  //       console.log("---country: ", country)
  //       const states = State.getStatesOfCountry(country.isoCode);
  //       console.log("----states: ", states)
  //       // const StateCode = states[41].isoCode;
  //       // console.log("StateCode: ", StateCode)
  //       // let cities = City.getCitiesOfCountry(countryCode,StateCode)
  //       // let filteredCities = cities.filter(city => 
  //       //   city.stateCode === StateCode
  //       // )
  //       // console.log("---filteredCities: ", filteredCities)
  //     }
  //     getStates()
  // }, [])
  return (
    <div className="App">
      <AppRouter />
  
    </div>
  );
}


export default App;

