import { createContext, useState } from "react";
import api from "../utils/axiosConfig";

const MaterialContext = createContext();

function MaterialProviderWrapper({ children }) {
    const [material, setMaterial] = useState([]);
    const [error, setError] = useState(false);

    const getMaterial = async () => {
        try {
            const response = await api.get("/api-materiales/reporte-materiales/");
            const data = response.data;
            setMaterial(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    return (
        <MaterialContext.Provider
            value={{
                error, material, getMaterial
            }}
        >
            {children}
        </MaterialContext.Provider>
    )
}

export { MaterialContext, MaterialProviderWrapper }
