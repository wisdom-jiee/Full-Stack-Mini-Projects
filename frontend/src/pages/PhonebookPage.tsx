import { useEffect, useState } from 'react'
import { Box, Paper, Typography, TextField, Button, Alert, List, ListItem, ListItemText, Divider} from '@mui/material'
import type { Person } from '../types/person'

function PhonebookPage() {
  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:3001/api/persons', {
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('failed to fetch persons')
        }
        return response.json() as Promise<Person[]> //告诉TypeScript这个Promise解析后会得到一个Person数组
      })
      .then((data) => {
        setPersons(data)
      })
      .catch((error: Error) => {
        setErrorMessage(error.message)
      })
  }, [])

  const addPerson = (event: React.SyntheticEvent) => { //定义事件处理函数的参数类型为React.SyntheticEvent
    event.preventDefault()

    const personObject: Omit<Person, 'id'> = { //定义一个从Person类型中去掉id属性的新类型
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('failed to add person')
        }
        return response.json() as Promise<Person>
      })
      .then((returnedPerson) => {
        setPersons((prevPersons) => prevPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage('')
      })
      .catch((error: Error) => {
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