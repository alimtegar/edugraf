import { createContext, useContext, useState, } from "react";
import { State } from "react-burger-menu";

// Types
import { default as SidebarContextState } from '../types/SidebarContext';

type Props = {
    children: JSX.Element
}

// Initial states
const initState: SidebarContextState = {
    isOpen: false,
    toggleSidebar: () => { },
    closeSidebar: () => { },
    handleStateChange: () => { },
};

// Context
const SidebarContext = createContext(initState);

// Provider
const SidebarContextProvider = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);
    const handleStateChange = ({ isOpen }: State) => setIsOpen(isOpen);

    return (
        <SidebarContext.Provider value={{ ...initState, isOpen, toggleSidebar, closeSidebar, handleStateChange }}>
            {children}
        </SidebarContext.Provider>
    );
};

function useSidebarContext() {
    const sidebarContext = useContext(SidebarContext);

    if (sidebarContext === undefined) {
        throw new Error('useSidebarContext must be used within a SidebarContextProvider')
    }

    return sidebarContext
}

export {
    SidebarContextProvider,
    useSidebarContext,
};