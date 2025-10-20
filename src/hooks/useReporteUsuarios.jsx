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
            sortable: true
        },
        {
            name: 'Rol',
            selector: row => row.rol,
            sortable: true
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