import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function ProtectedRoute({ children, allowedRoles = [] }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    if (allowedRoles.length > 0) {
        const userRole = user?.cargo_detalle?.rol.toLowerCase();

        if(!allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
            return (
                <div className="text-center mt-10 text-red-500">
                    No tienes permiso para acceder a esta sección.
                </div>
            )
        }
    }

    return children;
}

export default ProtectedRoute;
