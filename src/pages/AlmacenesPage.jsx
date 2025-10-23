import NavbarComponent from "../components/NavbarComponent/NavbarComponent"
import { AlmacenesProvider } from "../contexts/almacenes.context"

function AlmacenesPage() {
    return (
        <AlmacenesProvider>
            <NavbarComponent />
        </AlmacenesProvider>
    )
}

export default AlmacenesPage