import { createContext, useEffect, useState } from "react";
import api from "../utils/axiosConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const access = localStorage.getItem("access");
        if (storedUser && access) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const iniciarSesion = async (username, password) => {
        try {
            const res = await api.post("/api-usuarios/iniciar-sesion/", { username, password });
            const data = res.data;

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("user", JSON.stringify(data));

            setUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, message: "Error al iniciar sesión. Verifique sus credenciales." };
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        setUser(null);
    };

    const refreshToken = async () => {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) return logout();

        try {
            const res = await api.post("/usuarios/refrescar-token/", { refresh });
            localStorage.setItem("access", res.data.access);
        } catch (error) {
            logout();
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, loading, iniciarSesion, cerrarSesion, refreshToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
