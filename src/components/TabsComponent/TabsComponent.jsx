import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import DataTableComponent from "../DataTableComponent/DataTableComponent"

const tabsConfig = {
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
    "/usuarios": [
        { 
            id: "usuarios",
            label: "Usuarios",
            content: <DataTableComponent title="Usuarios" endpoint="/usuarios/reporte_completo/"/>
        },
        { 
            id: "proximos",
            label: "Próximos a Vencer",
            content: <DataTableComponent title="Usuarios próximos a vencer" endpoint="/usuarios/proximos_a_vencer/"/>
        },
        {
            id: "auditoria",
            label: "Auditoría",
            content: <div>Contenido de Auditoría</div>
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
            content: <DataTableComponent title="Usuarios" endpoint="/reporte-almacenes/"/>
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

function TabsComponent() {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(null)
    const [tabs, setTabs] = useState([])

    useEffect(() => {
        const path = location.pathname
        const newTabs = tabsConfig[path] || []
        setTabs(newTabs)
        setActiveTab(newTabs[0]?.id || null)
    }, [location.pathname])

    if (!tabs.length) return null

    return (
        <div className="w-full">
            <div className="flex border-b dark:border-[#3b4754] border-gray-200 gap-4 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`flex flex-col items-center justify-center pb-3 pt-2 text-sm font-bold tracking-[0.015em] font-display transition-colors
                            ${activeTab === tab.id
                                ? "border-b-2 border-b-primary text-primary"
                                : "border-b-2 border-b-transparent text-gray-500 dark:text-[#9dabb9] hover:text-primary dark:hover:text-white"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {tabs.map((tab) => (
                    <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TabsComponent
