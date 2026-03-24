import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // 导入useNavigate用于页面跳转
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Box, Paper, Typography, TextField, Button, Alert} from '@mui/material'
import { login, type LoginResponse } from '../services/auth'
import { fetchPersons } from '../services/persons'

function LoginPage() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()// 获取navigate函数用于页面跳转
  const queryClient = useQueryClient()

  const loginMutation = useMutation<LoginResponse, Error, { username: string; password: string }>({
    mutationFn: login,
    onSuccess: async () => {
      setUsername('')
      setPassword('')
      setErrorMessage('')

      await queryClient.prefetchQuery({// 预取联系人数据
        queryKey: ['persons'],
        queryFn: fetchPersons,
      })

      navigate('/phonebook')
    },
    onError: (error) => {
      setErrorMessage(error.message)
    },
  })

  const handleLogin = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setErrorMessage('')

    loginMutation.mutate({ username, password })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, width: 420 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Please sign in to access your phonebook.
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage