import { State } from "react-burger-menu";

type SidebarContext = {
    isOpen: boolean,
    toggle: () => void,
    close: () => void,
    handleStateChange: (state: State) => void,
};

export default SidebarContext;