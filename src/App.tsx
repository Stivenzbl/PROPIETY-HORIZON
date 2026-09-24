import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/pages/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Condominios from "./pages/Condominios";
import Unidades from "./pages/Unidades";
import Vecinos from "./pages/Vecinos";
import Servicios from "./pages/Servicios";
import Cobranzas from "./pages/Cobranzas";
import Mantenimientos from "./pages/Mantenimientos";
import Financiero from "./pages/Financiero";
import Informes from "./pages/Informes";
import ConfiguracionPerfil from "./pages/Configuracion/Perfil";
import ConfiguracionGeneral from "./pages/Configuracion/General";

/**
 * App.tsx - Componente raíz de la aplicación PROPIETY-HORIZON
 *
 * Rutas del sistema:
 * /        → Dashboard (resumen global por condominio)
 * /condominios → lista y creación de condominios
 * /unidades     → gestión de unidades (común/exclusivo)
 * /vecinos      → directorio de vecinos y propietarios
 * /servicios    → servicios públicos y proveedores
 * /cobranzas    → calendario y estados de cobranza
 * /mantenimientos → planillas de mantenimiento
 * /financiero  → ingresos, egresos, caja, gastos admin
 * /informes    → reportes y métricas
 * /configuracion/perfil → perfil del admin
 * /configuracion/general → ajustes del sistema
 * /login → login de usuario
 */
function App() {
  return (
    <>
      <Routes>
        {/* --- PÁGINAS PRINCIPALES --- */}
        <Route
          path="/dashboard"
          element={<Layout />}
        >
          <Route index element={<Dashboard />} />

          <Route path="condominios" element={<Condominios />} />
          <Route path="unidades" element={<Unidades />} />
          <Route path="vecinos" element={<Vecinos />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="cobranzas" element={<Cobranzas />} />
          <Route path="mantenimientos" element={<Mantenimientos />} />
          <Route path="financiero" element={<Financiero />} />
          <Route path="informes" element={<Informes />} />
          <Route path="configuracion/perfil" element={<ConfiguracionPerfil />} />
          <Route path="configuracion/general" element={<ConfiguracionGeneral />} />

          {/* Redirigir dashboard a /condominios si hay condominios */}
          <Route index element={<Navigate to="/condominios" replace />} />
        </Route>

        {/* --- LOGIN (sin layout) --- */}
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

import { LoginPage } from './pages/auth/Login';

/** Componente de login con formulario completo */
function Login() {
  return <LoginPage />;
}

export { Login };
