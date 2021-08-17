
import './App.css';
import csc from 'country-state-city'
import { Country, State, City }  from 'country-state-city';
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import AppRouter from './router/AppRouter'


const App = () => {


    //Get states list from country-state-city library
  //   useEffect(()=> {
  //     const getStates = async() => {
  //       const countryCode = 'US';
  //       const country = Country.getCountryByCode(countryCode);
  //       console.log("country: ", country)
  //       const states = State.getStatesOfCountry(country.isoCode);
  //       console.log("states: ", states)
  //       const cities = City.getCitiesOfCountry(countryCode)
  //       console.log("cities: ", cities)
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

