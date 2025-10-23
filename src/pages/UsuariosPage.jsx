import NavbarComponent from "../components/NavbarComponent/NavbarComponent"
import { CargosProvider } from "../contexts/cargos.context"
import { UsuariosProviderWrapper } from "../contexts/usuarios.context"


function UsuariosPage() {
    return (
        <UsuariosProviderWrapper>
            <CargosProvider>
                <NavbarComponent />
            </CargosProvider>
        </UsuariosProviderWrapper>
    )
}

export default UsuariosPage