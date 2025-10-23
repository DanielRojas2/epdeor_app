import { createContext, useState } from "react";
import api from "../../utils/axiosConfig";

const PartidaContext = createContext();

function PartidaProviderWrapper({ children }){
    const [partida, setPartida] = useState([]);
    const [error, setError] = useState(false);

    const getPartida = async () => {
        try {
            const response = await api.get("/api-materiales/partidas/");
            const data = response.data;
            setPartida(data);
            setError(false);
        } catch (e) {
            setError(true);
        }
    }

    const crearPartida = async (partidaData) => {
        try {
            const response = await api.post("/api-materiales/partidas/", partidaData);
            return response.data;
        } catch (e) {
            return setError(true);
        }
    }

    return (
        <PartidaContext.Provider
            value={{
                error, partida, crearPartida, getPartida
            }}
        >
            {children}
        </PartidaContext.Provider>
    )
}

export { PartidaContext, PartidaProviderWrapper }
