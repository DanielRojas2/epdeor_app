import { useState, useContext, useEffect } from "react";
import { MaterialContext } from "../../contexts/material_contexts/material.context";
import { PartidaContext } from "../../contexts/material_contexts/partida.context";
import { PresentacionContext } from "../../contexts/material_contexts/presentacion.context";
import { UdMContext } from "../../contexts/material_contexts/udm.context";

function FormularioMaterial({ onClose }) {
    const { crearMaterial, getMaterial } = useContext(MaterialContext);
    const { partida, getPartida } = useContext(PartidaContext);
    const { presentacion, getPresentacion } = useContext(PresentacionContext);
    const { udm, getUdm } = useContext(UdMContext);

    const [formData, setFormData] = useState({
        descripcion: "",
        nivel_minimo: "",
        partida: "",
        presentacion: "",
        unidad_de_medida: "",
    });

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getPartida();
        getPresentacion();
        getUdm();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await crearMaterial({
                descripcion: formData.descripcion,
                nivel_minimo: Number(formData.nivel_minimo),
                partida: Number(formData.partida),
                presentacion: Number(formData.presentacion),
                unidad_de_medida: Number(formData.unidad_de_medida),
            });
            await getMaterial();
            onClose();
        } catch (error) {
            console.error("Error al crear material:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Descripción
                </label>
                <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Nivel mínimo
                </label>
                <input
                    type="number"
                    name="nivel_minimo"
                    value={formData.nivel_minimo}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Partida presupuestaria
                    </label>
                    <select
                        name="partida"
                        value={formData.partida}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Seleccionar</option>
                        {partida.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.partida} {p.categoria}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Presentación
                    </label>
                    <select
                        name="presentacion"
                        value={formData.presentacion}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Seleccionar</option>
                        {presentacion.map((pr) => (
                            <option key={pr.id} value={pr.id}>
                                {pr.presentacion}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Unidad de medida
                    </label>
                    <select
                        name="unidad_de_medida"
                        value={formData.unidad_de_medida}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Seleccionar</option>
                        {udm.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.unidad_de_medida}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-white transition-colors ${
                        loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-[#680202] hover:bg-[#8a0303]"
                    }`}
                    >
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </form>
    );
}

export default FormularioMaterial;
