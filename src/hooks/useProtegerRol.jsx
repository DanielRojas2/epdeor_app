import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function useProtegerRol() {
    const { user } = useContext(AuthContext);
    const rol = user?.cargo_detalle?.rol_nombre?.toLowerCase();

    return { rol };
}

export default useProtegerRol