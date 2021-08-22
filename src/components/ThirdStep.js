import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { Country, State, City }  from 'country-state-city';
import swal from 'sweetalert2'
import { BASE_API_URL } from '../utils/constants'


const ThirdStep = (props) => {
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

    useEffect(() => {
        const getCountries = async () => {
          try {
            setIsLoading(true);
            const result = await Country.getAllCountries()
            let allCountries = [];
            allCountries = result?.map(({ isoCode, name }) => ({
              isoCode,
              name
            }));
            const firstCountry = allCountries[0].isoCode
            setCountries(allCountries);
            setSelectedCountry(firstCountry);
            setIsLoading(false);
          } catch (error) {
            setCountries([]);
            setIsLoading(false);
          }
        };
    
        getCountries();
      }, []);
    
      useEffect(() => {
        const getStates = async () => {
          try {
            console.log("selectedCountry is: ", selectedCountry)
           
            const result = await State.getStatesOfCountry(selectedCountry)
            console.log("states: ", result)
            let allStates = [];
            allStates = result?.map(({ isoCode, name }) => ({
              isoCode,
              name
            }));
            const firstState = allStates[0].isoCode
            console.log("---firstState: ", firstState)
            setCities([]);
            setSelectedCity('');
            setStates(allStates);
            setSelectedState(firstState);
          } catch (error) {
            setStates([]);
            setCities([]);
            setSelectedCity('');
          }
        };
    
        getStates();
      }, [selectedCountry]);
    
      useEffect(() => {
        const getCities = async () => {
          console.log("selectedCountry is: ", selectedCountry)
          console.log("selectedState is: ", selectedState)
          try {
           
                const result = await City.getCitiesOfCountry(
                    selectedCountry
                  );
                console.log("------cities are: ", result)
                let filteredCities = result.filter(city => 
                    city.stateCode === selectedState
                )
                console.log("------filteredCities: ", filteredCities)
                let allCities = []
                allCities = filteredCities?.map(({ name})=> ({
                    name
                }))
                const firstCity = allCities[0].name
                setCities(allCities);
                setSelectedCity(firstCity);
            } catch (error) {
            setCities([]);
          }
        };
    
        getCities();
      }, [selectedState]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        props.history.push('/login')
        //API Call to register the user
        const addedData = {
            country: countries.find(
            (country) => country.isoCode === selectedCountry
            )?.name,
            state:
            states.find((state) => state.isoCode === selectedState)?.name || '', // or condition added because selectedState might come as undefined
            city: selectedCity
        };
        try {
            let { user } = props
            user = {...user, ...addedData}
            console.log("user is: ", user)
            const response = await axios.post(`${BASE_API_URL}/register`, user)
            console.log("-----response.data: ", response)
            swal.fire('Awsome!', "You are successfully registred!", 'success').then(
                (result) => {
                    console.log("result: ", result)
                    if(result.isConfirmed || result.isDismissed){
                        props.resetUser()
                        props.history.push('/login')
                    }
                }
            )

        } catch (error) {
            console.log("error: ", error)
        }
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