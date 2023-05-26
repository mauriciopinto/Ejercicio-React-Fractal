import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { Login } from "./pages/login";
import { NotFound } from "./pages/not_found";
import { Dashboard } from "./pages/dashboard";
import { SignUp } from "./pages/sign_up";
import { Favorites } from "./pages/favorites";


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
