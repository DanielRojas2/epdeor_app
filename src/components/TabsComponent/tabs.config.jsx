import ReporteUsuariosCompleto from "../../features/usuarios/ReporteUsuariosCompleto"

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
            content: <div>Contenido de Material</div>
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
    "/almacenes": [
        {
            id: "almacen",
            label: "Almacen",
            content: <div>Contenido de Almacenes</div>
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
