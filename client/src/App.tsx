import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profiles from './pages/Profiles'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import CreateOffer from "./pages/CreateOffer";
import Ofertas from "./pages/Ofertas";
import OfertaDetalle from "./pages/OfertaDetalle";
import MisPostulaciones from "./pages/MisPostulaciones";
import PostulacionesRecibidas from "./pages/PostulacionesRecibidas";

function App() {
  const userType = localStorage.getItem("userType");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/crear-oferta"
          element={userType === "empresa" ? <CreateOffer /> : <Navigate to="/login" />}
        />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/ofertas/:id" element={<OfertaDetalle />} />
        <Route path="/mis-postulaciones" element={<MisPostulaciones />} />
        <Route
  path="/postulaciones-recibidas"
  element={
    localStorage.getItem("userType") === "reclutador" ? (
      <PostulacionesRecibidas />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
      </Routes>
    </>
  );
}

export default App;
