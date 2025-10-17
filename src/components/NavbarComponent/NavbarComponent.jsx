import './NavbarComponent.css'
import { useState, useEffect, useContext } from 'react'
import logo from '../../assets/logos/epdeor_nobg.png'
import { Link, useLocation } from 'react-router-dom'
import TabsComponent from '../TabsComponent/TabsComponent'
import { AuthContext } from '../../contexts/auth.context'

function NavbarComponent() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { cerrarSesion } = useContext(AuthContext)
    const location = useLocation()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setMenuOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isActive = (path) => location.pathname === path ? 'active' : ''

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap text-white backdrop-blur-sm border-b border-solid border-white/10 px-4 sm:px-6 lg:px-8 py-3 bg-primary-custom">
                    <div className="hidden lg:flex items-center gap-6">
                        <Link to="/" className={`nav-link text-white ${isActive('/')}`}>
                            Inicio
                        </Link>
                        <Link to="/usuarios" className={`nav-link text-white ${isActive('/usuarios')}`}>
                            Usuarios
                        </Link>
                        <Link to="/archivos" className={`nav-link text-white ${isActive('/archivos')}`}>
                            Archivos
                        </Link>
                        <Link to="/material" className={`nav-link text-white ${isActive('/material')}`}>
                            Material
                        </Link>
                        <Link to="/almacenes" className={`nav-link text-white ${isActive('/almacenes')}`}>
                            Almacenes
                        </Link>
                        <Link to="/solicitudes" className={`nav-link text-white ${isActive('/solicitudes')}`}>
                            Solicitudes
                        </Link>
                    </div>

                    <div className="lg:hidden">
                        <button
                            className="flex items-center justify-center p-2 rounded-lg hover:bg-white/20"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span className="material-symbols-outlined">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2">
                        <a className="flex items-center gap-2" href="#">
                            <img src={logo} alt="Logo Empresa" className="h-10 w-auto" />
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button className="flex items-center justify-center p-2 rounded-full hover:bg-white/20">
                                <span className="material-symbols-outlined">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                    </svg>
                                </span>
                                <span className="absolute top-0 right-0 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-c-custom opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-c-custom"></span>
                                </span>
                            </button>
                        </div>
                        <button onClick={cerrarSesion} className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-secondary-b-custom text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-colors">
                            <span className="truncate">Cerrar sesión</span>
                        </button>
                        <button className="sm:hidden flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-white/20">
                            <span className="material-symbols-outlined">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </header>

                <div id="mobileMenu" className={`mobile-menu lg:hidden ${menuOpen ? 'show' : ''}`}>
                    <Link to="/" className={`nav-link text-white ${isActive('/')}`}>
                        Inicio
                    </Link>
                    <Link to="/usuarios" className={`nav-link text-white ${isActive('/usuarios')}`}>
                        Usuarios
                    </Link>
                    <Link to="/archivos" className={`nav-link text-white ${isActive('/archivos')}`}>
                        Archivos
                    </Link>
                    <Link to="/material" className={`nav-link text-white ${isActive('/material')}`}>
                        Material
                    </Link>
                    <Link to="/almacenes" className={`nav-link text-white ${isActive('/almacenes')}`}>
                        Almacenes
                    </Link>
                    <Link to="/solicitudes" className={`nav-link text-white ${isActive('/solicitudes')}`}>
                        Solicitudes
                    </Link>
                </div>

                <main className="flex-1 p-4 sm:p-6 lg:p-5">
                    <TabsComponent />
                </main>
            </div>
        </div>
    )
}

export default NavbarComponent
