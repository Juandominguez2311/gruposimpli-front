import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import ProductDetail from "./components/ProductDetailCard/ProductDetailCard";
import Accesory from "./pages/Accesory.js";
import AccesoryDetail from "./components/AccesoryDetailCard/AccesoryDetailCard.js";
import NavbarComponent from "./components/NavBarComponent/NavBarComponent.js";
import FooterComponent from "./components/FooterComponent/FooterComponent.js";
import Login from "./pages/LogIn.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import CreateVehicle from "./pages/CreateVehicle.js";
import Vehicle from "./pages/Vehicle.js";
import CreateAccesory from "./pages/CreateAccesory.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');
    setIsAuthenticated(isLoggedIn);
  }, []);

  return (
    <div className="margin">
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Vehicle />}/>
          <Route path="/detail/:id" element={<ProductDetail />}/>
          <Route path="/accesories" element={<Accesory />}/>
          <Route path="/accesories/detail/:id"element={<AccesoryDetail />}/>
          <Route path="/addvehicle"element={<ProtectedRoute islogged={isAuthenticated}><CreateVehicle /></ProtectedRoute>}/>
          <Route path="/addaccesory"element={<ProtectedRoute islogged={isAuthenticated}><CreateAccesory /></ProtectedRoute>}/>
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
