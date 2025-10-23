import { useContext, useEffect, useState } from "react";
import { CargosContext } from "../../contexts/cargos.context";

function FormularioCargo({ onSuccess }) {
    const {
        crearCargo,
        getDepartamento,
        getUnidad,
        getRoles,
        departamento,
        unidad,
        roles,
        getCargos
    } = useContext(CargosContext);

    const [formData, setFormData] = useState({
        cargo: "",
        departamento: "",
        unidad: "",
        rol: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([getDepartamento(), getUnidad(), getRoles()]);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearCargo(formData);
            await getCargos();
            alert("Cargo creado correctamente");
            onSuccess();
        } catch (err) {
            alert("Error al crear el cargo");
        }
    };

    if (loading) {
        return <p className="text-sm text-gray-500">Cargando datos...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="cargo"
                placeholder="Nombre del cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm w-full"
                required
                style={{ color: '#fff' }}
            />

            <select
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 dark:text-gray-100"
                required
            >
                <option value="">Seleccione un departamento</option>
                {departamento.map((d) => (
                    <option key={d.id} value={d.id}>{d.departamento}</option>
                ))}
            </select>

            <select
                name="unidad"
                value={formData.unidad}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 dark:text-gray-100"
                required
            >
                <option value="">Seleccione una unidad</option>
                {unidad.map((u) => (
                    <option key={u.id} value={u.id}>{u.unidad}</option>
                ))}
            </select>

            <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 dark:text-gray-100"
                required
            >
                <option value="">Seleccione un rol</option>
                {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.rol}</option>
                ))}
            </select>

            <div className="flex justify-end gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    Guardar cargo
                </button>
            </div>
        </form>
    );
}

export default FormularioCargo;
