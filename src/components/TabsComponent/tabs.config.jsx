import ReporteUsuariosCompleto from "../../features/usuarios/ReporteUsuariosCompleto";
import ReporteAlmacenes from "../../features/almacenes/ReporteAlmacenes";
import PresentacionMaterial from "../../features/material/PresentacionMaterial";
import ReporteGeneralMaterial from "../../features/material/ReporteGeneralMaterial";

export const tabsConfig = {
    "/usuarios": [
        { 
            id: "usuarios",
            label: "Usuarios",
            content: <ReporteUsuariosCompleto />
        },
        { 
            id: "proximos",
            label: "Próximos a Vencer",
            content: <div>Contenido de Usuarios Próximos a vencer</div>
        },
        {
            id: "auditoria",
            label: "Auditoría",
            content: <div>Contenido de Auditoría</div>
        },
    ],
    "/archivos": [
        { 
            id: "archivos",
            label: "Archivos",
            content: <h1>Contenido de Archivos</h1>
        },
        {
            id: "inventario",
            label: "Inventario",
            content: <div>Contenido de Inventario</div>
        },
        {
            id: "solicitudes",
            label: "Solicitudes",
            content: <div>Contenido de Solicitudes</div>
        },
    ],
    "/material": [
        {
            id: "material",
            label: "Material",
            content: <PresentacionMaterial />
        },
        {
            id: "general",
            label: "General",
            content: <ReporteGeneralMaterial />,
            roles: ['encargado activos fijos y almacen']
        },
        {
            id: "inventario",
            label: "Inventario",
            content: <div>Contenido de Inventario</div>,
            roles: ['encargado activos fijos y almacen']
        },
        {
            id: "solicitudes",
            label: "Solicitudes",
            content: <div>Contenido de Solicitudes</div>
        },
    ],
    "/almacenes": [
        {
            id: "almacen",
            label: "Almacen",
            content: <ReporteAlmacenes />
        },
        {
            id: "atender",
            label: "Atender",
            content: <div>Contenido de Atender Solicitudes</div>
        },
    ],
    "/solicitudes": [
        {
            id: "realizadas",
            label: "Realizadas",
            content: <div>Contenido de Solicitudes Realizadas</div>
        },
        {
            id: "atender",
            label: "Atender",
            content: <div>Contenido de Atender Solicitudes</div>
        },
    ],
}
