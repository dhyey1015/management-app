import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/login"
import { Register } from "./pages/auth/register"
import { Success } from "./pages/dashboard/Success"
import { RedirectIfLoggedIn } from "./pages/middleware/RedirectIfLoggedIn"
import { ProtectedRoute } from "./pages/middleware/ProtectedRoute"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Success/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/register" 
          element={
            <RedirectIfLoggedIn>
              <Register/>
            </RedirectIfLoggedIn>
          }
        />
        <Route 
          path="/login" 
          element={
            <RedirectIfLoggedIn>
              <Login/>
            </RedirectIfLoggedIn>
          }
        />
        <Route 
          path="/success" 
          element={
            <ProtectedRoute>
              <Success/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
