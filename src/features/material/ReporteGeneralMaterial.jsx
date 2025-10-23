import DataTable from "react-data-table-component";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import FormularioMaterial from "./FormularioMaterial";
import { useReporteMaterialGeneral } from "../../hooks/useReporteMaterialGeneral";
import { useState } from "react";

const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
};

const CustomLoader = () => (
    <div className="flex flex-col items-center justify-center py-6">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#680202] rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">Cargando materiales...</p>
    </div>
);

function ReporteGeneralMaterial() {
    const { columns, data, pending } = useReporteMaterialGeneral();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="flex-1 mt-2 p-4 bg-white dark:bg-gray-900 rounded-xl">
            <div className="max-w-8xl mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-black dark:text-white text-4xl font-black">Material</p>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                            Listado de Material
                        </p>
                    </div>
                    <button className="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"  onClick={() => setIsModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="truncate">Registrar Material</span>
                    </button>
                </div>
            </div>
            <div className="w-full mx-auto mt-2 bg-white dark:bg-gray-900 rounded-xl shadow p-4">
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
            </div>
            <ModalComponent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registrar nuevo material"
            >
                <FormularioMaterial onClose={() => setIsModalOpen(false)} />
            </ModalComponent>
        </main>
    );
}

export default ReporteGeneralMaterial;
