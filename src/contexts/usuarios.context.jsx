import { createContext, useState } from "react";
import api from "../utils/axiosConfig";

const UsuariosContext = createContext();

function UsuariosProviderWrapper({ children }){
    const [reporteUsuarios, setReporteUsuarios] = useState([]);
    const [usuariosVencer, setUsuariosVencer] = useState([]);
    const [usuariosAuditoria, setUsuariosAuditoria] = useState([]);
    const [error, setError] = useState(false);

    const getReporteUsuarios = async () => {
        try {
            const response = await api.get('/api-usuarios/usuarios/');
            const data = response.data;
            setReporteUsuarios(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    return (
        <UsuariosContext.Provider
            value={{ reporteUsuarios, getReporteUsuarios, error }}
        >
            {children}
        </UsuariosContext.Provider>
    )
}

export { UsuariosContext, UsuariosProviderWrapper}
