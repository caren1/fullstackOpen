import React from 'react'

const DetailedCountry = ({ country }) => {

    return (
        <div>
            <h1>Country name: {country.name}</h1>
            <p>Country capital city: {country.capital}</p>
            <p>Population of {country.name}:{country.population}</p>
            <h2>Languages used:</h2>
            <ul>
                {country.languages.map(language => 
                    <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' style={{height: '50px', width: '50px'}} ></img>
        </div>
    )
}

export default DetailedCountry