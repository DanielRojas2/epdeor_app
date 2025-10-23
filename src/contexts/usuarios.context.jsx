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

    const crearUsuario = async (usuarioData) => {
        try {
            const response = await api.post('/api-usuarios/usuarios/', usuarioData);
            return response.data;
        } catch (e) {
            setError(true)
        }
    }

    const actualizarUsuario = async (id, usuarioData) => {
        try {
            const response = await api.put(`/api-usuarios/usuarios/${id}/`, usuarioData);
            return response.data;
        } catch (e) {
            setError(true)
        }
    }

    const cambiarEstado = async (usuario) => {
        try {
            const response = await api.post(
                `/api-usuarios/usuarios/${usuario.id}/cambiar_estado/`,
                { usuario_activo: !usuario.usuario_activo }
            );
            return response.data;
        } catch (e) {
            setError(true);
        }
    }

    return (
        <UsuariosContext.Provider
            value={{
                error, reporteUsuarios, getReporteUsuarios,
                crearUsuario, actualizarUsuario, cambiarEstado
            }}
        >
            {children}
        </UsuariosContext.Provider>
    )
}

export { UsuariosContext, UsuariosProviderWrapper}
