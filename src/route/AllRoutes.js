import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Login from '../Login'
import Register from '../Register'

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
  )
}
