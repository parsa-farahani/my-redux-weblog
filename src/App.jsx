import { useState } from 'react'
import MainLayout from './layouts/MainLayout'
import { Outlet } from 'react-router-dom'


const App = () => {

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default App
