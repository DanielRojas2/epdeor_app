import { useContext, useEffect, useState } from "react";
import { AlmacenesContext } from "../../contexts/almacenes.context";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

function ReporteAlmacenes() {
    const {
        almacenes,
        detalleAlmacen,
        getAlmacenes,
        getDetalleAlmacen,
        setDetalleAlmacen,
        loadingDetalle,
        error
    } = useContext(AlmacenesContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        getAlmacenes();
    }, []);

    const handleOpenModal = async (id) => {
        setSelectedId(id);
        setDetalleAlmacen(null);
        setIsModalOpen(true);
        await getDetalleAlmacen(id);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedId(null);
        setDetalleAlmacen(null);
    };

    if (error) {
        return <p className="text-red-500">Error al obtener almacenes</p>;
    }

    if (!almacenes || almacenes.length === 0) {
        return <p className="text-gray-500">Cargando información...</p>;
    }

    return (
        <main className="flex-1 mt-2 p-4 bg-white dark:bg-gray-900 rounded-xl">
            <div className="max-w-8xl mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
                    <div className="flex flex-col gap-1">
                        <p className="text-black dark:text-white text-4xl font-black">Mis Almacenes</p>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                            Gestiona tus almacenes y estantes
                        </p>
                    </div>
                    <button
                        className="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined">add</span>
                        <span className="truncate">Añadir Nuevo Almacén</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {almacenes.map((almacen) => (
                        <div
                            key={almacen.id}
                            className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-[#3a2727] shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex flex-col gap-2">
                                <p className="text-black dark:text-white text-xl font-bold">
                                    Almacén {almacen.tipo_almacen} {almacen.id}
                                </p>
                                <p className="text-gray-600 dark:text-[#bc9a9a] text-sm">
                                    Ubicado en {almacen.ubicacion}
                                </p>
                            </div>
                            <button
                                onClick={() => handleOpenModal(almacen.id)}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 w-full bg-[#cc0000] text-white text-base font-bold hover:bg-[#cc0000]/90 transition-colors"
                            >
                                <span className="truncate">Ver Detalles</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <ModalComponent
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={`Detalle del Almacén ${selectedId}`}
            >
                {loadingDetalle ? (
                    <div className="flex justify-center py-6">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-[#cc0000] rounded-full animate-spin"></div>
                    </div>
                ) : detalleAlmacen ? (
                    <div className="flex flex-col gap-4">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                            <p><strong>Tipo:</strong> {detalleAlmacen.tipo_almacen}</p>
                            <p><strong>Ubicación:</strong> {detalleAlmacen.ubicacion}</p>
                            <p><strong>Total de estantes:</strong> {detalleAlmacen.total_estantes}</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold mb-2 dark:text-gray-100">Estantes:</p>
                            {Array.isArray(detalleAlmacen.estantes) && detalleAlmacen.estantes.length > 0 ? (
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                                            <th className="p-2 border-b border-gray-300 dark:border-gray-700">N° Estante</th>
                                            <th className="p-2 border-b border-gray-300 dark:border-gray-700">Cantidad de niveles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalleAlmacen.estantes.map((estante, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
                                                <td className="p-2 border-b border-gray-200 dark:border-gray-700">
                                                    {estante.nro_estante}
                                                </td>
                                                <td className="p-2 border-b border-gray-200 dark:border-gray-700">
                                                    {estante.cantidad_niveles}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-3 text-center text-gray-400 dark:text-gray-500 border border-dashed border-gray-300 rounded-lg">
                                    No hay estantes registrados.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">Sin información disponible.</p>
                )}
            </ModalComponent>
        </main>
    );
}

export default ReporteAlmacenes;
