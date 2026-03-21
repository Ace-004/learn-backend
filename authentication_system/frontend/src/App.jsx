import React from 'react'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}> 

        </Route>
      </Routes>
      
    </div>
  )
}

export default App