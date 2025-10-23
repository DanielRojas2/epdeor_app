import { createContext, useState } from "react";

const UdMContext = createContext();

function UdMProviderWrapper({ children }) {
    const [udm, setUdm] = useState([]);
    const [error, setError] = useState(false);

    const getUdm = async () => {
        try {
            const response = await api.get("/api-materiales/unidades-medida/");
            const data = response.data;
            setUdm(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const crearUdm = async (udmData) => {
        try {
            const response = await api.post("/api-materiales/unidades-medida/", udmData);
            return response.data;
        } catch (e) {
            return setError(true);
        }
    }

    return (
        <UdMContext.Provider
            value={{
                error, udm, crearUdm, getUdm
            }}
        >
            {children}
        </UdMContext.Provider>
    )
}

export { UdMContext, UdMProviderWrapper }
