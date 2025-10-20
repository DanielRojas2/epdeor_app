import { useContext, useEffect, useState, useMemo } from "react";
import { UsuariosContext } from "../contexts/usuarios.context";

export function useReporteUsuarios() {
    const { reporteUsuarios, getReporteUsuarios } = useContext(UsuariosContext);
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(true);
    const [filters, setFilters] = useState({
        search: "",
        estado: "todos",
        unidad: "todas",
        rol: "todos"
    });

    useEffect(() => {
        getReporteUsuarios();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (reporteUsuarios) {
                setData(
                    reporteUsuarios.map(usuario => ({
                        id: usuario.id,
                        nombre_completo: `${usuario.nombre} ${usuario.apellido_paterno}`,
                        username: usuario.username,
                        email: usuario.email,
                        estado: usuario.usuario_activo ? 'activo' : 'Inactivo',
                        alta: usuario.alta,
                        baja: usuario.baja,
                        unidad: usuario.cargo_detalle ? usuario.cargo_detalle.unidad : 'administrador',
                        rol: usuario.cargo_detalle ? usuario.cargo_detalle.rol : 'administrador'
                    }))
                );
            }
            setPending(false);
        }, 1000)
        return () => clearTimeout(timeout);
    }, [reporteUsuarios]);

    const columns = [
        {
            name: 'Nombre Completo',
            selector: row => row.nombre_completo,
            sortable: true
        },
        {
            name: 'Nombre de Usuario',
            selector: row => row.username,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Alta',
            selector: row => row.alta,
            sortable: true
        },
        {
            name: 'Baja',
            selector: row => row.baja,
            sortable: true
        },
        {
            name: 'Unidad',
            selector: row => row.unidad,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.rol,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="flex gap-2">
                    <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors" title="Editar Usuario">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button
                        className={`p-2 rounded-md transition-colors ${
                            row.estado === 'activo'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                        title={row.estado === 'activo' ? 'Dar de baja' : 'Dar de alta'}
                    >
                        {row.estado === 'activo' ? 'Dar de baja' : 'Dar de alta'}
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ];

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch = (
                item.nombre_completo.toLowerCase().includes(filters.search.toLowerCase()) ||
                item.username.toLowerCase().includes(filters.search.toLowerCase()) ||
                item.email.toLowerCase().includes(filters.search.toLowerCase())
            );
            const matchesEstado = filters.estado === "todos" || item.estado === filters.estado;
            const matchesUnidad = filters.unidad === "todas" || item.unidad === filters.unidad;
            const matchesRol = filters.rol === "todos" || item.rol === filters.rol;
            return matchesSearch && matchesEstado && matchesUnidad && matchesRol;
        });
    }, [data, filters]);

    const unidades = [...new Set(data.map(d => d.unidad))];
    const roles = [...new Set(data.map(d => d.rol))];

    return { columns, data: filteredData, pending, filters, setFilters, unidades, roles }
}