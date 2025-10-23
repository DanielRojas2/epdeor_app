import { useState } from "react";
import DataTable from "react-data-table-component";
import { useReporteUsuarios } from "../../hooks/useReporteUsuarios";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import FormularioUsuario from "./FormularioUsuario";

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const CustomLoader = () => (
    <div className="flex flex-col items-center justify-center py-6">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600 text-sm">Cargando datos...</p>
    </div>
);

function ReporteUsuariosCompleto() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    
    const handleEditUsuario = (usuario) => {
        setUsuarioEditar(usuario);
        setIsModalOpen(true);
    };

    const { columns, data, pending, filters, setFilters, unidades, roles } = useReporteUsuarios(handleEditUsuario);
    
    const handleCloseModal = () => {
        setUsuarioEditar(null);
        setIsModalOpen(false);
    };

    return (
        <div className="w-full mx-auto mt-2 bg-white dark:bg-gray-900 rounded-xl shadow p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                <h2 className="text-2xl dark:text-gray-100">Usuarios</h2>
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Nuevo usuario
                </button>
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                <input
                    type="text"
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Buscar por nombre, usuario o correo..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />

                <select
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.estado}
                    onChange={(e) => setFilters(prev => ({ ...prev, estado: e.target.value }))}
                >
                    <option value="todos">Todos los estados</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>

                <select
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.unidad}
                    onChange={(e) => setFilters(prev => ({ ...prev, unidad: e.target.value }))}
                >
                    <option value="todas">Todas las unidades</option>
                    {unidades.map(u => (
                        <option key={u} value={u}>{u}</option>
                    ))}
                </select>

                <select
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.rol}
                    onChange={(e) => setFilters(prev => ({ ...prev, rol: e.target.value }))}
                >
                    <option value="todos">Todos los roles</option>
                    {roles.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            {/* Tabla */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    progressPending={pending}
                    progressComponent={<CustomLoader />}
                    highlightOnHover
                    striped
                    dense
                    customStyles={{
                        headCells: {
                            style: {
                                backgroundColor: "#f3f4f6",
                                color: "#374151",
                                fontWeight: "600",
                                fontSize: "0.9rem",
                            },
                        },
                        rows: {
                            style: {
                                height: "3rem",
                            },
                        },
                    }}
                />
            </div>
            <ModalComponent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={usuarioEditar ? "Editar Usuario" : "Registrar Nuevo Usuario"}
            >
                <FormularioUsuario
                    usuarioEditar={usuarioEditar}
                    onSuccess={handleCloseModal}
                />
            </ModalComponent>
        </div>
    );
}

export default ReporteUsuariosCompleto;
