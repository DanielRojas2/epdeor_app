import NavbarComponent from "../components/NavbarComponent/NavbarComponent"
import { MaterialProviderWrapper } from "../contexts/material_contexts/material.context";
import { PartidaProviderWrapper } from "../contexts/material_contexts/partida.context";
import { PresentacionContext, PresentacionProviderWrapper } from "../contexts/material_contexts/presentacion.context";
import { UdMProviderWrapper } from "../contexts/material_contexts/udm.context";

function MaterialPage() {
    return (
        <MaterialProviderWrapper>
            <PartidaProviderWrapper>
                <PresentacionProviderWrapper>
                    <UdMProviderWrapper>
                        <NavbarComponent />
                    </UdMProviderWrapper>
                </PresentacionProviderWrapper>
            </PartidaProviderWrapper>
        </MaterialProviderWrapper>
    )
}

export default MaterialPage