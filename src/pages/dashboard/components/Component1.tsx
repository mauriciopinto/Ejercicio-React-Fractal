// interface Component1Props {
//     value: string,
// }

import { useContext } from "react"
import { DashboardContext } from "../../../context/DashboardContext";

export const Component1 = () => {
    const value = useContext (DashboardContext);

    return (
        <div>
            Component 1 {value}
        </div>
    )
}