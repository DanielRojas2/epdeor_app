import { useContext, useEffect, useMemo, useState } from "react";
import { MaterialContext } from "../contexts/material_contexts/material.context";

export function useReporteMaterialGeneral() {
    const { material, getMaterial } = useContext(MaterialContext);
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        getMaterial();
    }, []);

    useEffect(() => {
        if (!material || material.length === 0) return;
        
        const timeout = setTimeout(() => {
            setData(
                material.map(materiales => ({
                    id: materiales.id,
                    descripcion: materiales.descripcion,
                    nivel_minimo: materiales.nivel_minimo,
                    cantidad_existente: materiales.cantidad_existente,
                    partida: materiales.partida_detalle?.partida || "-",
                    categoria: materiales.partida_detalle?.categoria || "-",
                    presentacion: materiales.presentacion_detalle?.presentacion || "-",
                    udm: materiales.unidad_de_medida_detalle?.unidad_de_medida || "-",
                    raw: materiales
                }))
            );
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
            name: "Presentación",
            selector: row => row.presentacion,
            sortable: true
        },
        {
            name: "Unidad de Medida",
            selector: row => row.udm,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="flex gap-2 items-center justify-center">
                    <button
                        className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                        title="Editar Material"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                        </svg>
                    </button>

                    <button
                        className="p-1.5 rounded-md transition-colors bg-red-500 hover:bg-red-600 text-white"
                        title="Eliminar Material"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ];

    return { columns, data, pending };
}