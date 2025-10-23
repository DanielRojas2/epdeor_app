import { createContext, useState } from "react";
import api from "../../utils/axiosConfig";

const MaterialContext = createContext();

function MaterialProviderWrapper({ children }) {
    const [presentacionMaterial, setPresentacionMaterial] = useState([]);
    const [material, setMaterial] = useState([]);
    const [error, setError] = useState(false);

    const getPresentacionMaterial = async () => {
        try {
            const response = await api.get("/api-materiales/reporte-materiales/");
            const data = response.data;
            setPresentacionMaterial(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const getMaterial = async () => {
        try {
            const response = await api.get("/api-materiales/materiales/");
            const data = response.data;
            setMaterial(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const crearMaterial = async (materialData) => {
        try {
            const response = await api.post("/api-materiales/materiales/", materialData);
            return response.data;
        } catch (e) {
            setError(true);
        }
    }

    return (     
        <MaterialContext.Provider
            value={{
                error, presentacionMaterial,material, getPresentacionMaterial,
                getMaterial, crearMaterial
            }}
        >
            {children}
        </MaterialContext.Provider>
    )
}

export { MaterialContext, MaterialProviderWrapper }
