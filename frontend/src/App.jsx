import { Link, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PhonebookPage from './pages/PhonebookPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <div>
      {/* 导航栏 */}
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/phonebook">Phonebook</Link> |{' '}
        <Link to="/about">About</Link>
      </nav>

      <hr />

      {/* 路由配置 匹配path后渲染element */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/phonebook" element={<PhonebookPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App