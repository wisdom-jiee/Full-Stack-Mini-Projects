import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // 导入useNavigate用于页面跳转

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()// 获取navigate函数用于页面跳转

  const handleLogin = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'login failed')
      }

      console.log('Login success:', data)

      setUsername('')
      setPassword('')

      navigate('/phonebook')// 跳转到电话簿页面
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div>
          username:{' '}
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div>
          password:{' '}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button type="submit" disabled={loading}> {/*发送登录请求后，按钮禁用*/}
            {loading ? 'logging in...' : 'login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage