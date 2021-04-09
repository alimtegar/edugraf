import { State } from "react-burger-menu";

type SidebarContext = {
    isOpen: boolean,
    toggleSidebar: () => void,
    closeSidebar: () => void,
    handleStateChange: (state: State) => void,
};

export default SidebarContext;