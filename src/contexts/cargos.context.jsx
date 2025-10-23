import { createContext, useState } from "react";
import api from "../utils/axiosConfig";

const CargosContext = createContext();

function CargosProvider({ children }) {
    const [cargos, setCargos] = useState([]);
    const [departamento, setDepartamento] = useState([]);
    const [unidad, setUnidad] = useState([]);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(false);

    const getDepartamento = async () => {
        try {
            const response = await api.get('/api-usuarios/departamentos/');
            const data = response.data;
            setDepartamento(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const getUnidad = async () => {
        try {
            const response = await api.get('/api-usuarios/unidades/');
            const data = response.data;
            setUnidad(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const getRoles = async () => {
        try {
            const response = await api.get('/api-usuarios/roles/');
            const data = response.data;
            setRoles(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const getCargos = async () => {
        try {
            const response = await api.get('/api-usuarios/cargos/');
            const data = response.data;
            setCargos(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const crearCargo = async (cargoData) => {
        try {
            const response = await api.post('/api-usuarios/cargos/', cargoData);
            return response.data;
        } catch (e) {
            setError(true);
        }
    }

    return (
        <CargosContext.Provider
            value={{ 
                error, cargos, getCargos, departamento, getDepartamento,
                unidad, getUnidad, roles, getRoles, crearCargo
            }}
        >
            {children}
        </CargosContext.Provider>
    )
}

export {CargosContext, CargosProvider}
