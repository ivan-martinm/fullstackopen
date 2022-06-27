import { useEffect, useState } from "react"
import personService from './services/persons'

const Filter = ({ searchTerm, handleSearchTermChange }) =>
  <div>
    filter shown with
    <input value={searchTerm} onChange={handleSearchTermChange} />
  </div>

const PersonForm = (props) =>
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({ persons, searchTerm, deletePerson }) => {
  const filteredPeople = persons.filter(
    person => person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
      {filteredPeople.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
    </>
  )
}

const Person = ({ person, deletePerson }) =>
  <div>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person)}> delete</button>
  </div>

const Notification = ({ message }) => {
  if (message !== null) {
    return (
      <div className='successMessage'>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        replaceNumber()
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`'${returnedPerson.name}' has been added.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Do you want to delete '${person.name}' ?`)) {
      const personID = person.id
      personService
        .remove(personID)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personID))
          setMessage(`'${person.name}' has been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          alert(`The person '${person.name}' has already been deleted from server`)
          setPersons(persons.filter(person => person.id !== personID))
        })
    }
  }

  const replaceNumber = () => {
    const person = persons.find(p => p.name === newName)
    const changedPerson = { ...person, number: newNumber }
    personService
      .replace(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(person => person.id != changedPerson.id ? person : returnedPerson)
        )
        setNewName('')
        setNewNumber('')
        setMessage(`Phone number for '${returnedPerson.name}' has been replaced.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} deletePerson={deletePerson} />
    </div>
  )
}

export default App;