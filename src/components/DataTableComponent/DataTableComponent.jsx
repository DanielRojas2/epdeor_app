import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../../utils/axiosConfig";

function DataTableComponent({ endpoint, title }) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get(endpoint);
                const fetchedData = response.data;

                if (Array.isArray(fetchedData) && fetchedData.length > 0) {
                    const generatedColumns = Object.keys(fetchedData[0]).map((key) => ({
                        name: key.replace(/_/g, " ").toUpperCase(),
                        selector: (row) => row[key],
                        sortable: true,
                        wrap: true,
                        cell: (row) => (
                            <div className="truncate max-w-[200px]" title={String(row[key])}>
                                {String(row[key] ?? "-")}
                            </div>
                        ),
                    }));

                    setColumns(generatedColumns);
                    setData(fetchedData);
                } else {
                    setData([]);
                    setColumns([]);
                }
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("No se pudo cargar la información desde el servidor.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    if (loading)
        return <div className="p-4 text-gray-600 text-sm">Cargando datos...</div>;
    if (error)
        return <div className="p-4 text-red-600 text-sm">{error}</div>;
    if (!data.length)
        return <div className="p-4 text-gray-600 text-sm">No hay datos disponibles.</div>;

    return (
        <div className="w-full p-2 bg-white rounded-lg shadow-md">
            {title && (
                <h2 className="text-lg text-gray-700 p-2 border-b border-gray-200">
                    {title}
                </h2>
            )}

            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                striped
                responsive
                dense
            />
        </div>
    );
}

export default DataTableComponent;
