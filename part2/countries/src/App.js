import axios from 'axios'
import { useEffect, useState } from 'react'

const Countries = ({ countries, searchTerm }) => {
  const filteredCountries =
    countries.filter(country => country.name.common.toLowerCase()
      .includes(searchTerm.toLowerCase()))

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (filteredCountries.length > 1) {
    return filteredCountries.map(country => <div key={country.name.common}>{country.name.common}</div>)
  }
  else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
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
        <img src={country.flags.png} alt="Flag" width="20%" border="1px" />
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
    <div>
      find countries
      <input value={searchTerm} onChange={handleSearchTerm} />
      <Countries countries={countries} searchTerm={searchTerm} />
    </div>
  )
}

export default App;
