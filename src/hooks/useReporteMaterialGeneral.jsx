import { useContext, useEffect, useMemo, useState } from "react";
import { MaterialContext } from "../contexts/material.context";

export function useReporteMaterialGeneral() {
    const { material, getMaterial } = useContext(MaterialContext);
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(true);
    const [filters, setFilters] = useState({
        search: "",
        presentacion: "todos",
        udm: "todas"
    });

    useEffect(() => {
        getMaterial();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (material) {
                console.log("✅ [HOOK] seteando data a la tabla...");
                setData(
                    material.map(materiales => ({
                        id: materiales.id,
                        descripcion: materiales.descripcion,
                        nivel_minimo: materiales.nivel_minimo,
                        cantidad_existente: materiales.cantidad_existente,
                        partida: materiales.partida?.partida || "-",
                        categoria: materiales.partida?.categoria || "-",
                        presentacion: materiales.presentacion?.presentacion || "-",
                        udm: materiales.unidad_de_medida?.unidad_de_medida || "-"
                    }))
                );
            }
            setPending(false);
        }, 500)
        return () => clearTimeout(timeout);
    }, [material]);

    const columns = [
        {
            name: "Material",
            selector: row => row.descripcion,
            sortable: true
        },
        {
            name: "Cantidad Mínima",
            selector: row => row.nivel_minimo,
            sortable: true
        },
        {
            name: "Existencias",
            selector: row => row.cantidad_existente,
            sortable: true
        },
        {
            name: "Partida",
            selector: row => row.partida,
            sortable: true
        },
        {
            name: "Categoria",
            selector: row => row.categoria,
            sortable: true
        },
        {
            name: "Unidad de Medida",
            selector: row => row.udm,
            sortable: true
        }
    ];

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch = (
                item.descripcion.toLowerCase().includes(filters.search.toLowerCase())
            );
            const matchesPresentacion = filters.presentacion === 'todos' || item.presentacion === filters.presentacion;
            const matchesUdm = filters.udm === 'todos' || item.udm === filters.udm;

            return matchesSearch && matchesPresentacion && matchesUdm;
        });
    }, [data, filters]);

    return { columns, data: filteredData, pending, filters, setFilters };
}