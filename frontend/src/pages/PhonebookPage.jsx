import { useEffect, useState } from 'react'

function PhonebookPage() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/api/persons', {
      credentials: 'include' // 发送请求时包含cookie
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('failed to fetch persons')
        }
        return response.json()
      })
      .then(data => {
        setPersons(data)
      })
      .catch(error => {
        setErrorMessage(error.message)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    fetch('http://localhost:3001/api/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(personObject)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('failed to add person')
        }
        return response.json()
      })
      .then(returnedPerson => {
        setPersons(prevPersons => prevPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage('')
      })
      .catch(error => {
        setErrorMessage(error.message)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PhonebookPage