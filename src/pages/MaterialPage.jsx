import NavbarComponent from "../components/NavbarComponent/NavbarComponent"
import { MaterialProviderWrapper } from "../contexts/material.context"

function MaterialPage() {
    return (
        <MaterialProviderWrapper>
            <NavbarComponent />
        </MaterialProviderWrapper>
    )
}

export default MaterialPage