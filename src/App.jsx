import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './component/RootLayout'
import RecipientsList from './component/RecipientsList'
import AddRecipient from './component/AddRecipient'
import RecipientDetails from './component/RecipientDetails'
import About from './component/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<RecipientsList />} />
          <Route path="recipients" element={<RecipientsList />} />
          <Route path="add-recipient" element={<AddRecipient />} />
          <Route path="recipient/:id" element={<RecipientDetails />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
