import axios from 'axios'
import { useEffect, useState } from 'react'

const Filter = ({ searchTerm, handleSearchTerm }) => {
  return (
    <div>
      find countries
      <input value={searchTerm} onChange={handleSearchTerm} />
    </div>
  )
}

const Countries = ({ countries, searchTerm, setSearchTerm }) => {
  const filteredCountries =
    countries.filter(country => country.name.common.toLowerCase()
      .includes(searchTerm.toLowerCase()))

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (filteredCountries.length > 1) {
    return filteredCountries.map(country =>
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => setSearchTerm(country.name.common)}>show</button>
      </div>
    )
  }
  else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }
}

const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="Flag" width="150px" border="1px" />
      <Weather capital={country.capital} />
    </>
  )
}

const Weather = ({ capital }) => {
  const [weatherInfo, setWeather] = useState('')
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`)
      .then(response => setWeather(response.data))
  }, [capital]) // I only want to execute the hook if the capital has changed

  // I am checking here if 'weatherInfo' has been assigned yet, in order to show the data,
  // preventing the error I was getting on the first render of this component when 'weatherInfo'
  // still had the default value. 
  if (weatherInfo !== '') {
    return (
      <>
        <h2>Weather in {capital}</h2>
        <div>
          temperature { // Converting from Kelvin to Celsius and rounding to 2 decimal places
            Math.round((weatherInfo.main.temp - 273.15) * 100) / 100} Celsius
        </div>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="icon" />
        <div>
          wind {weatherInfo.wind.speed} m/s
        </div>
      </>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <Countries countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </>
  )
}

export default App;
