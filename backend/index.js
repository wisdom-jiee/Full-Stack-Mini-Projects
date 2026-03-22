const express = require('express')
const cors = require('cors') //引入cors中间件，允许跨域请求
const cookieParser = require('cookie-parser')//引入cookie-parser中间件，解析请求中的cookie
const app = express()
app.use(cors()) //使用cors中间件，允许所有来源的请求
app.use(cookieParser()) 
app.use(express.json())//中间件 解析请求体中的JSON数据，使我们可以request.body来访问

let persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

let users = [
  {
    id: "u1",
    username: "admin",
    password: "admin",
    name: "Administrator"
  },
  {
    id: "u2",
    username: "wisdom",
    password: "wisdom",
    name: "wisdom"
  }
]

const authMiddleware = (request, response, next) => {//中间件，身份验证
  const userId = request.cookies.userId
  if (!userId) {
    return response.status(401).json({
      error: 'not authenticated'
    })
  }
  const user = users.find(u => u.id === userId)
  if (!user) {
    return response.status(401).json({
      error: 'invalid authentication'
    })
  }
  request.user = user
  next()
}

const generateId = () => {
  return String(Math.floor(Math.random() * 1000000))
}

app.get('/api/persons',authMiddleware, (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', authMiddleware, (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id) 
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons/:id', authMiddleware, (request, response) => {//删除联系人
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', authMiddleware, (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'  
    })
  }
  const nameExists = persons.some(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique' 
    })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})

app.post('/api/login', (request, response) => { //登入
  const { username, password } = request.body
  const user = users.find(
    u => u.username === username && u.password === password
  )
  if (!user) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  response.cookie('userId', user.id, {//设置cookie
    httpOnly: true
  })

  response.json({
    message: 'login successful',
    user: {
      id: user.id,
      username: user.username,
      name: user.name
    }
  })
})

app.post('/api/logout', (request, response) => { //登出
  response.clearCookie('userId')
  response.json({ message: 'logout successful' })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})