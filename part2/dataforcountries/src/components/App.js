import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import CountryList from './CountryList'

const App = () => {

    const [ countriesList, setCountriesList ] = useState([])
    const [ countriesFilter, setCountriesFilter ] = useState('')
    const [ showCountryDetails, setShowCountryDetails ] = useState()    

    
    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            // console.log('dawajresposa' ,response.data);
            setCountriesList(response.data);
        })
    },[])

    const handleCountriesFilter = (event) => {
        setCountriesFilter(event.target.value)
        // on every input state change, set to an empty/falsy value
        setShowCountryDetails()
    }

    const onShowCountryDetails = (country) => {
        // is it allowed to pass on the state change like this?
        setShowCountryDetails(country)
    }

    return (
        <>
        <Filter onChange={handleCountriesFilter} />
        <CountryList 
        countries={countriesList}
        filter={countriesFilter}
        showCountryDetails={showCountryDetails}
        onShowCountryDetails={onShowCountryDetails}/>
        </>
    )
}


export default App