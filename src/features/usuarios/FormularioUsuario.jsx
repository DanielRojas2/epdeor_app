import { useContext, useEffect, useState } from "react";
import { UsuariosContext } from "../../contexts/usuarios.context";
import { CargosContext } from "../../contexts/cargos.context";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import FormularioCargo from "../cargos/FormularioCargo";

function FormularioUsuario({ onSuccess, usuarioEditar = null }) {
    const { crearUsuario, getReporteUsuarios, actualizarUsuario } = useContext(UsuariosContext);
    const { cargos, getCargos } = useContext(CargosContext);
    const [isCargoModalOpen, setIsCargoModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        baja: null,
        cargo: ""
    });

    useEffect(() => {
        const fetchCargos = async () => {
            await getCargos();
            setLoading(false);
        };
        fetchCargos();
    }, []);

    useEffect(() => {
        if (usuarioEditar) {
            setFormData({
                username: usuarioEditar.username || "",
                email: usuarioEditar.email || "",
                password: "",
                nombre: usuarioEditar.nombre || "",
                apellido_paterno: usuarioEditar.apellido_paterno || "",
                apellido_materno: usuarioEditar.apellido_materno || "",
                baja: usuarioEditar.baja || null,
                cargo: usuarioEditar.cargo_detalle?.id || ""
            });
        }
    }, [usuarioEditar]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuarioEditar) {
                await actualizarUsuario(usuarioEditar.id, formData);
                alert("Usuario actualizado correctamente")
            } else {
                await crearUsuario(formData);
                alert("Usuario creado correctamente");
            }
            await getReporteUsuarios();
            onSuccess();
        } catch (error) {
            alert("Error al guardar usuario");
        }
    };

    if (loading) {
        return <p className="text-sm text-white-500">Cargando cargos...</p>;
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                    ["username", "Nombre de usuario", "text"],
                    ["email", "Correo electrónico", "email"],
                    ["password", "Contraseña", "password"],
                    ["nombre", "Nombre", "text"],
                    ["apellido_paterno", "Apellido paterno", "text"],
                    ["apellido_materno", "Apellido materno", "text"],
                ].map(([name, label, type]) => (
                    <div key={name}>
                        <label className="block text-sm font-medium mb-1 text-gray-200">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="border rounded-lg px-3 py-2 text-sm w-full bg-gray-800 text-white"
                            required={name !== "password" || !usuarioEditar}
                        />
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">Fecha de baja</label>
                    <input
                        type="date"
                        name="baja"
                        value={formData.baja || ""}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 text-sm w-full bg-gray-800 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">Cargo</label>
                    <div className="flex gap-2">
                        <select
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            className="border rounded-lg px-3 py-2 text-sm w-full bg-gray-800 text-white"
                            required
                        >
                            <option value="">Seleccione un cargo</option>
                            {cargos.map((cargo) => (
                                <option key={cargo.id} value={cargo.id}>
                                    {cargo.cargo}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setIsCargoModalOpen(true)}
                            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    {usuarioEditar ? "Actualizar usuario" : "Crear usuario"}
                </button>
            </div>
        </form>

        <ModalComponent
            isOpen={isCargoModalOpen}
            onClose={() => setIsCargoModalOpen(false)}
            title="Registrar nuevo cargo"
        >
            <FormularioCargo onSuccess={() => setIsCargoModalOpen(false)} />
        </ModalComponent>
        </>
    );
}

export default FormularioUsuario;
