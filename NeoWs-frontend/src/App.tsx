import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Feed from './pages/Feed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
          <Route path="/" element={<Feed />} />
          {/* <Route path="/lookup/:id" element={<AsteroidDetail />} /> */}
      </Routes>
    </>
  )
}

export default App
