import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentDashboard from './Pages/StudentDashboard'
import CompanyDashboard from './Pages/CompanyDashboard'
import InternshipDetails from './Pages/InternshipApplication'
import ProfileBuilder from './Pages/ProfileBuilder'
import AuthenticationApp from './Pages/AuthenticationScreens'
import AdminDashboard from './Pages/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <StudentDashboard/> */}
      {/* <CompanyDashboard/> */}
      {/* <InternshipDetails/> */}
      {/* <ProfileBuilder/> */}
      <AuthenticationApp/>
      {/* <AdminDashboard/> */}
    </>
  )
}

export default App
