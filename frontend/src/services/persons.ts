import type { Person } from '../types/person'

const baseUrl = 'http://localhost:3001/api/persons'

export const fetchPersons = async (): Promise<Person[]> => {
  const response = await fetch(baseUrl, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('failed to fetch persons')
  }

  return response.json()
}

export const createPerson = async (
  person: Omit<Person, 'id'>
): Promise<Person> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(person),
  })

  if (!response.ok) {
    throw new Error('failed to add person')
  }

  return response.json()
}

export const removePerson = async (id: string): Promise<string> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('failed to delete person')
  }

  return id
}