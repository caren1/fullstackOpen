import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import CountryList from './CountryList'

const App = () => {

    const [ countriesList, setCountriesList ] = useState([])
    const [ countriesFilter, setCountriesFilter ] = useState('')    
    
    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('dawajresposa' ,response.data);
            setCountriesList(response.data);
        })
    },[])

    const handleCountriesFilter = (event) => {
        setCountriesFilter(event.target.value)
    }

    return (
        <>
        <Filter onChange={handleCountriesFilter} />
        <CountryList countries={countriesList} filter={countriesFilter}/>
        </>
    )
}


export default App