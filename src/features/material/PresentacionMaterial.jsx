import { useContext, useEffect } from "react";
import { MaterialContext } from "../../contexts/material_contexts/material.context";

function PresentacionMaterial() {
    const { presentacionMaterial, getPresentacionMaterial, error } = useContext(MaterialContext);

    useEffect(() => {
        getPresentacionMaterial();
    }, []);

    if (error) {
        return <p className="text-red-500">Error al obtener material</p>;
    };

    if (!presentacionMaterial || presentacionMaterial.length === 0) {
        return <p className="text-gray-500">Cargando información...</p>;
    };

    return (
        <main className="flex-1 mt-2 p-4 bg-white dark:bg-gray-900 rounded-xl">
            <div className="max-w-8xl mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
                    <div className="flex flex-col gap-1">
                        <p className="text-black dark:text-white text-4xl font-black">Material</p>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                            Solicita material desde esta ventana.
                        </p>
                    </div>
                    <button
                        className="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="truncate">Mis solicitudes</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {presentacionMaterial.map((material) => (
                    <div className="flex flex-col bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800" key={material.id}>
                        <div className="p-2 flex-grow">
                            <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", textAlign: "center" }}>
                                <h2 className="text-2xl font-bold text-[#0d141b] dark:white-slate-50 leading-tight">
                                    {material.descripcion}
                                </h2>
                                {material.partida.partida}
                            </span>
                            <p className="text-base font-medium text-slate-600 dark:text-slate-400 mt-2">
                                <strong>Presentación:</strong> <i>{material.presentacion.presentacion}</i>
                            </p>
                            <p className="text-base font-medium text-slate-600 dark:text-slate-400 mt-2">
                                <strong>UdM:</strong> <i>{material.unidad_de_medida.unidad_de_medida}</i>
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-start gap-3 px-3 py-2 border-t border-slate-200 dark:border-slate-800">
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#680202] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#680202]/90 focus:ring-4 focus:ring-primary/30 transition-colors">
                                <span className="truncate">Solicitar</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default PresentacionMaterial