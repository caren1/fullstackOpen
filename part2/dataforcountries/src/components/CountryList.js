import React from 'react'
import DetailedCountry from './DetailedCountry'

const CountryList = ({countries, filter}) => {

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

    if (filteredCountries.length > 10) {
        return (<div><h2>There is too many matches, please provide more into the filter</h2></div>)

    } else if (filteredCountries.length <10 && filteredCountries.length > 1){
        return (
        <ul>
            {filteredCountries.map(country => 
                <li key={country.name}>{country.name}</li>
            )}
        </ul>
        )

    } else if (filteredCountries.length === 1){
        const theOnlyCountry = filteredCountries[0];
        return (<DetailedCountry country={theOnlyCountry} />)

    } else if (filteredCountries.length <= 0){
        return(<div><h2>Unfortunately, there is no such country.. :(</h2></div>)
    }
}

export default CountryList