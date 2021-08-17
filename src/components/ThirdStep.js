import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { Country, State, City }  from 'country-state-city';
import swal from 'sweetalert2'
import { BASE_API_URL } from '../utils/constants'


const ThirdStep = () => {
    //State of countries, states and cities list
    //[] -> [Algeria,....., France,...]
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    //State of selected country or city of state from user
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

    //Get contries list from country-state-city library
    useEffect(()=> {
        const getCountries = async() => {
            try {
                setIsLoading(true)
                const result = Country.getAllCountries()
                let allCountries = []
                allCountries = result?.map(({ isoCode, name})=> ({
                    isoCode,
                    name
                }))
                const firstCountry = allCountries[0].isoCode
                console.log("firstCountry ", firstCountry)
                setCountries(allCountries)
                setSelectedCountry(firstCountry)
                setIsLoading(false)
            } catch(error) {
                setCountries([])
                setIsLoading(false)
            }
        }
        getCountries()
    }, [])


    //Get states list from country-state-city library
    useEffect(()=> {
        const getStates = async() => {
            try {
                console.log("-----2-selectedCountry: ", selectedCountry)
                const result = State.getStatesOfCountry(selectedCountry);
                console.log("---states: ", result)
                let allStates = []
                allStates = result?.map(({ isoCode, name})=> ({
                    isoCode,
                    name
                }))
                console.log("allStates: ", allStates)
                // const firstState = allStates[0].isoCode
                // console.log("firstState: ", firstState)
                setStates(allStates)
                setCities([])
                // setSelectedState(firstState)

            } catch(error) {
                setStates()
                setCities([])
            }
            
        }
        getStates()
    }, [selectedCountry])


    //Get cities list from country-state-city library
    useEffect(()=> {
        const getCities = async() => {
            try {
                console.log("-----3-selectedState: ", selectedState)
                const result = City.getCitiesOfCountry(selectedState)
                console.log("cities: ", result)
                let allCities = []
                allCities = result?.map(({ name})=> ({
                    name
                }))

                console.log("allCities: ",allCities)
                //  const firstCity = allCities[0].name
                // setStates(allCities)
                setCities(allCities)
                // setSelectedCity(firstCity)

            } catch(error) {
                console.log("error: ", error)
                setCities([])
            }
        }
        getCities()
    }, [selectedState])

    const handleSubmit = async () => {
        //API Call to register the user
    }
    return (
        <Form className="input-form" onSubmit={handleSubmit}>
            <Form.Group controlId="country">
                {isLoading && (
                    <p className="loading"> Loading countries. Please wait....</p>
                )}
                <Form.Label>Country</Form.Label>
                <Form.Control
                    as="select"
                    name="country"
                    value={selectedCountry}
                    onChange={(event)=> setSelectedCountry(event.target.value)}
                >
                {
                    countries.map(({isoCode, name}) => (
                        <option value={isoCode} key={isoCode}>
                            {name}
                        </option>
                    ))
                }

                </Form.Control>

            </Form.Group>

            <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                    as="select"
                    name="state"
                    value={selectedState}
                    onChange={(event)=> setSelectedState(event.target.value)}
                >
                { states.length > 0 ? (
                     states.map(({isoCode, name}) => (
                        <option value={isoCode} key={isoCode}>
                            {name}
                        </option>
                    ))
                ): (
                    <option value="" key="">
                        No State found
                    </option>
                )   
                }
                </Form.Control>

            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    as="select"
                    name="city"
                    value={selectedCity}
                    onChange={(event)=> setSelectedCity(event.target.value)}
                >
                {
                     cities.length > 0 ? (
                        cities.map(({ name}) => (
                           <option value={name} key={name}>
                               {name}
                           </option>
                       ))
                   ): (
                       <option value="" key="">
                           No Cities found
                       </option>
                   )   
                }

                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    )
}

export default ThirdStep