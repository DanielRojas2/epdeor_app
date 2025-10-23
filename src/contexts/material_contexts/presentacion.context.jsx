import { createContext, useState } from "react";

const PresentacionContext = createContext();

function PresentacionProviderWrapper({ children }) {
    const [presentacion, setPresentacion] = useState([]);
    const [error, setError] = useState(false);

    const getPresentacion = async () => {
        try {
            const response = await api.get("/api-materiales/presentaciones/");
            const data = response.data;
            setPresentacion(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const crearPresentacion = async (presentacionData) => {
        try {
            const response = await api.post("/api-materiales/presentaciones/", presentacionData);
            return response.data;
        } catch (e) {
            return setError(true);
        }
    }

    return (
        <PresentacionContext.Provider
            value={{
                error, presentacion, crearPresentacion, getPresentacion
            }}
        >
            {children}
        </PresentacionContext.Provider>
    )
}

export { PresentacionContext, PresentacionProviderWrapper }
