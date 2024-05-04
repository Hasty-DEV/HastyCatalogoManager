import { LayoutType } from "../../../data/@types/layout/layout.type";
import { GridContainer } from "../../styles/layout/layout.style";

const Layout = (props: LayoutType)=> {
    return (
        <GridContainer>
            {props.children}
        </GridContainer>
    )
}

export default Layout;