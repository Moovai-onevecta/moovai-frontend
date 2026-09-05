import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import Landing from './landing'
// import Landing from './App'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CompleteProfile from './pages/CompleteProfile'
import ProtectedRoute from './components/ProtectedRoute'
import HomeDashboard from './pages/traveler/HomeDashboard'
import Onboarding from './pages/traveler/Onboarding'
import Chat from './pages/traveler/Chat'
import Itinerary from './pages/traveler/Itinerary'
import EditItinerary from './pages/traveler/EditItinerary'
import Providers from './pages/traveler/Providers'
import Flights from './pages/traveler/Flights'
import Payment from './pages/traveler/Payment'
import Booked from './pages/traveler/Booked'
import LiveTrip from './pages/traveler/LiveTrip'

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/home"
            element={
              <ProtectedRoute>
                <HomeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/itinerary"
            element={
              <ProtectedRoute>
                <Itinerary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/itinerary/edit"
            element={
              <ProtectedRoute>
                <EditItinerary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/providers"
            element={
              <ProtectedRoute>
                <Providers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/flights"
            element={
              <ProtectedRoute>
                <Flights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/checkout"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/booked"
            element={
              <ProtectedRoute>
                <Booked />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/trip"
            element={
              <ProtectedRoute>
                <LiveTrip />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
