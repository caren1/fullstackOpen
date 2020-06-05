import React from 'react'
import DetailedCountry from './DetailedCountry'

const CountryList = ({countries, filter, showCountryDetails, onShowCountryDetails}) => {

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));        

    if (filteredCountries.length > 10 && !showCountryDetails) {
        return (<div><h2>There is too many matches, please provide more into the filter</h2></div>)

    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1 && !showCountryDetails) {
        return (
        <ul>
            {filteredCountries.map(country => 
                <li key={country.name}>{country.name} <button onClick={() => onShowCountryDetails(country)}>show</button></li>
            )}
        </ul>
        )

    } else if (filteredCountries.length === 1 && !showCountryDetails){
        const theOnlyCountry = filteredCountries[0];
        return (<DetailedCountry country={theOnlyCountry} />)

    } else if (filteredCountries.length < 1 && !showCountryDetails){
        return(<div><h2>Unfortunately, there is no such country.. :(</h2></div>)

        // only if there is a country in the state, show details of this country
    } else if (showCountryDetails){
        return (<DetailedCountry country={showCountryDetails} />)
    }
}

export default CountryList