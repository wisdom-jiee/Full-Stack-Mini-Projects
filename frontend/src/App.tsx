import { Link as RouterLink, Routes, Route } from 'react-router-dom'
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PhonebookPage from './pages/PhonebookPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Phonebook App
          </Typography>

          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/phonebook">
            Phonebook
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/phonebook" element={<PhonebookPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
}

export default App