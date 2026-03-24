export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  message?: string
  username?: string
  error?: string
}

export const login = async ({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch('http://localhost:3001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })

  const data: LoginResponse = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'login failed')
  }

  return data
}