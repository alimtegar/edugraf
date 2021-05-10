import { NavLink } from 'react-router-dom';
import { useSidebarContext } from '../contexts/SidebarContext';

// Types
import { default as SidebarMenuItemProps } from '../types/SidebarMenuItem';

const SidebarMenuItem = ({ title, icon, to }: SidebarMenuItemProps) => {
    const sidebarContext = useSidebarContext();

    return (
        <NavLink
            className="menu-item flex items-center xactive:bg-primary-on text-gray-400 text-sm font-bold p-4 focus:outline-none"
            activeClassName="bg-primary-on text-primary-dark"
            to={to}
            exact
            onClick={sidebarContext.closeSidebar}
        >
            <span className="mr-4">{icon}</span>
            <span className="leading-none">{title}</span>
        </NavLink>
    );
};
export default SidebarMenuItem;