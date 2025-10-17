import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context"
import epdeorFrontis from "../../assets/img/epdeor_frontis.png"

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { iniciarSesion } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await iniciarSesion(username, password);
        if (res.success) {
            navigate("/");
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <header className="absolute top-0 left-0 w-full z-10 px-4 sm:px-6 lg:px-8 pt-6">
                <div className="flex items-center">
                    <img alt="Company Logo" className="h-10 w-auto" data-alt="Company Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA92B8VoqdPxsF7xSVT-RyC0wTf7Jxv-0lzTyhAuREj7FFkHyVk51qFpg3Koaf2Ix7ISNEN_FdS48Qv3xNi0l-lkPXxmp_oJLcvl4RXdR6tKYC4OiOAZsWaOPuewJVmvWITccSANI5Jf6E8h9v8TaWHVgJ9qH399yw1BWJA4Uu6qap40bkG1_0mLJImcKQrgj1AAo_oEyf-v-tZIpbz6YcdKfsyHeCZxVaotlOcQx0ZwBwnnyNVFmmKoRjpP3RYTUFCskEp9aSN4N5e" />
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 lg:p-12 rounded-xl shadow-lg">
                    <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                            Bienvenido!
                        </p>
                        <p className="mt-2 text-base text-gray-500">
                            Ingresa tus credenciales para iniciar sesión.
                        </p>
                        {error && (
                            <p className="text-red-500 text-center text-sm font-medium">
                                {error}
                            </p>
                        )}
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label className="flex flex-col flex-1">
                                    <p className="text-text-primary text-base font-medium leading-normal pb-2">Nombre de Usuario</p>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-gray-300 bg-white h-14 placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
                                        placeholder="Ingresa tu nombre de usuario"
                                        required
                                    />
                                </label>
                            </div>
                            <div className="pt-4">
                                <label className="flex flex-col flex-1">
                                    <p className="text-text-primary text-base font-medium leading-normal pb-2">
                                        Contraseña
                                    </p>
                                    <div className="relative flex w-full flex-1 items-center rounded-lg">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-gray-300 bg-white h-14 placeholder:text-gray-400 p-4 pr-12 text-base font-normal leading-normal"
                                            placeholder="Ingresa tu contraseña"
                                            required
                                        />
                                        <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary focus:outline-none" type="button">
                                            <span className="material-symbols-outlined">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/20" style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)', backgroundColor: 'rgba(56, 95, 160, 0.2)' }}></div>
            <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-primary/20" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', backgroundColor: 'rgba(104, 2, 2, 0.2)' }}></div>
        </div>
    )
}

export default LoginForm