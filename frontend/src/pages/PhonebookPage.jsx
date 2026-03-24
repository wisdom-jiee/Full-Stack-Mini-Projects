import { useEffect, useState } from 'react'
import { Box, Paper, Typography, TextField, Button, Alert, List, ListItem, ListItemText, Divider} from '@mui/material'


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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Phonebook
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add a new contact
        </Typography>

        <Box
          component="form"
          onSubmit={addPerson}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />

          <TextField
            label="Number"
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />

          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Numbers
        </Typography>

        <List>
          {persons.map((person, index) => (
            <Box key={person.id}>
              <ListItem>
                <ListItemText
                  primary={person.name}
                  secondary={person.number}
                />
              </ListItem>
              {index < persons.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default PhonebookPage