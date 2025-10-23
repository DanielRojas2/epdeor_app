import { createContext, useState } from "react";
import api from "../utils/axiosConfig";

const AlmacenesContext = createContext();

function AlmacenesProvider({ children }) {
    const [almacenes, setAlmacenes] = useState([]);
    const [detalleAlmacen, setDetalleAlmacen] = useState(null);
    const [error, setError] = useState(false);
    const [loadingDetalle, setLoadingDetalle] = useState(false);

    const getAlmacenes = async () => {
        try {
            const response = await api.get('/api-almacenes/almacenes/');
            setAlmacenes(response.data);
            setError(false);
        } catch (e) {
            console.error(e);
            setError(true);
        }
    };

    const getDetalleAlmacen = async (id) => {
        try {
            setLoadingDetalle(true);
            const response = await api.get(`/api-almacenes/reporte-almacenes/${id}/`);
            setDetalleAlmacen(response.data);
            setError(false);
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoadingDetalle(false);
        }
    };

    return (
        <AlmacenesContext.Provider
            value={{
                error,
                almacenes,
                detalleAlmacen,
                loadingDetalle,
                setAlmacenes,
                getAlmacenes,
                getDetalleAlmacen,
                setDetalleAlmacen,
            }}
        >
            {children}
        </AlmacenesContext.Provider>
    );
}

export { AlmacenesContext, AlmacenesProvider };
