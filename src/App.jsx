import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./router/ProtectedRoute"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import UsuariosPage from './pages/UsuariosPage'
import ArchivosPage from './pages/ArchivosPage'
import MaterialPage from './pages/MaterialPage'
import AlmacenesPage from './pages/AlmacenesPage'
import SolicitudesPage from './pages/SolicitudesPage'

function App() {
    return (
        <Routes>
            
                <Route path='/' element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path='/usuarios' element={
                    <ProtectedRoute>
                        <UsuariosPage />
                    </ProtectedRoute>
                } />
                <Route path='/archivos' element={
                    <ProtectedRoute>
                        <ArchivosPage />
                    </ProtectedRoute>
                } />
                <Route path='/material' element={
                    <ProtectedRoute>
                        <MaterialPage />
                    </ProtectedRoute>
                } />
                <Route path='/almacenes' element={
                    <ProtectedRoute>
                        <AlmacenesPage />
                    </ProtectedRoute>
                } />
                <Route path='/solicitudes' element={
                    <ProtectedRoute>
                        <SolicitudesPage />
                    </ProtectedRoute>
                } />
            <Route path='/iniciar-sesion' element={<LoginPage />} />
        </Routes>
    )
}

export default App
