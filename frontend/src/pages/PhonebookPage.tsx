import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Box, Paper, Typography, TextField, Button, Alert, List, ListItem, ListItemText, Divider} from '@mui/material'
import type { Person } from '../types/person'
import { fetchPersons, createPerson, removePerson } from '../services/persons'


function PhonebookPage() {
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [deleteId, setDeleteId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const queryClient = useQueryClient()

  const {
    data: persons = [],
    isPending,
    error,
  } = useQuery<Person[], Error>({
    queryKey: ['persons'],
    queryFn: fetchPersons,
    staleTime: 1000 * 10, //登录时已预取电话簿，设置10秒的过期时间避免重复拉取
  })

  const addPersonMutation = useMutation({
    mutationFn: createPerson,
    onSuccess: (newPerson) => {
      queryClient.setQueryData<Person[]>(['persons'], (old = []) => [
        ...old,
        newPerson,
      ])
      setNewName('')
      setNewNumber('')
      setErrorMessage('')
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  const deletePersonMutation = useMutation({
    mutationFn: removePerson,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Person[]>(['persons'], (old = []) =>
        old.filter((person) => person.id !== deletedId)
      )
      setDeleteId('')
      setErrorMessage('')
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  const addPerson = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const personObject: Omit<Person, 'id'> = {
      name: newName,
      number: newNumber,
    }
    addPersonMutation.mutate(personObject)
  }

  const deletePerson = (event: React.SyntheticEvent) => {
    event.preventDefault()
    deletePersonMutation.mutate(deleteId)
  }

  if (isPending) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
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

      {/* 上方先展示电话簿内容 */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Numbers
        </Typography>

        <List>
          {persons.map((person, index) => (
            <Box key={person.id}>
              <ListItem>
                <ListItemText
                  primary={`${person.name} (id: ${person.id})`}
                  secondary={person.number}
                />
              </ListItem>
              {index < persons.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>

      {/* 下方添加联系人，一行布局 */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add
        </Typography>

        <Box
          component="form"
          onSubmit={addPerson}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <TextField
            label="Name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            size="small"
          />

          <TextField
            label="Number"
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
            size="small"
          />

          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Delete
        </Typography>

        <Box
          component="form"
          onSubmit={deletePerson}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <TextField
            label="Person ID"
            value={deleteId}
            onChange={(event) => setDeleteId(event.target.value)}
            size="small"
          />

          <Button type="submit" variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default PhonebookPage