import NavbarComponent from "../components/NavbarComponent/NavbarComponent"
import { UsuariosProviderWrapper } from "../contexts/usuarios.context"


function UsuariosPage() {
    return (
        <UsuariosProviderWrapper>
            <NavbarComponent />
        </UsuariosProviderWrapper>
    )
}

export default UsuariosPage