import { slide as Menu } from 'react-burger-menu';
import { FaTimes, FaHome, FaUserEdit, FaAsterisk, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';
import { useSidebarContext } from '../contexts/SidebarContext';

// Components
import Button from './Button';
import SidebarMenuItem from './SidebarMenuItem';
import Alert from './Alert';

// Types
import { default as SidebarMenuItemProps } from '../types/SidebarMenuItem';


const Sidebar = () => {
    // Contexts
    const authContext = useAuthContext();
    const sidebarContext = useSidebarContext();

    const menu: SidebarMenuItemProps[] = authContext.token.token ? [
        {
            title: 'Dasbor',
            icon: (<FaHome size="1rem" />),
            to: '/',
        },
        {
            title: 'Sunting Profil',
            icon: (<FaUserEdit size="1rem" />),
            to: '/edit-profile',
        },
        {
            title: 'Ubah Kata Sandi',
            icon: (<FaAsterisk size="1rem" />),
            to: '/change-password',
        },
    ] : [
        {
            title: 'Masuk',
            icon: (<FaSignInAlt size="1rem" />),
            to: '/login',
        },
        {
            title: 'Daftar',
            icon: (<FaUserPlus size="1rem" />),
            to: '/register',
        },
    ];

    return (
        <Menu
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            className="bg-white shadow-default"
            isOpen={sidebarContext.isOpen}
            onStateChange={sidebarContext.handleStateChange}
        >
            <div className="focus:outline-none">
                <div className="flex justify-end items-center w-full h-15 p-2">
                    <Button
                        bgColor="transparent"
                        bgColorOn="primary-on"
                        textColor="gray-400"
                        textColorOn="primary-dark"
                        w={11}
                        h={11}
                        shadow="none"
                        center
                        onClick={sidebarContext.toggleSidebar}
                    >
                        <FaTimes size="1rem" />
                    </Button>
                </div>
            </div>
            
            {menu.map((menuItem) => (
                <SidebarMenuItem {...menuItem} key={menuItem.to} />
            ))}

            <div className="focus:outline-none w-full p-8 absolute bottom-0">
                {authContext.token.token && (
                    <Button
                        bgColor="red-500"
                        bgColorOn="red-600"
                        textColor="white"
                        textColorOn="white"
                        onClick={() => {
                            sidebarContext.closeSidebar();
                            setTimeout(() => {
                                Alert.fire({
                                    title: (<span className="text-lg text-gray-900 font-bold leading-snug">Apakah anda yakin?</span>),
                                    html: (<p className="text-sm text-gray-500 font-semibold">Anda akan keluar dari akun <strong className="font-bold">{authContext.user.name}</strong>.</p>),
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ya',
                                    cancelButtonText: 'Tidak',
                                }).then(({ isConfirmed }) => {
                                    if (isConfirmed) {
                                        authContext.removeAuth();
                                        authContext.setAuthLoading(false);
                                    }
                                });
                            }, 500);
                        }}
                    >
                        Keluar
                    </Button>
                )}
                <p className="text-gray-600 text-sm text-center font-semibold mt-4">© Sibisa {new Date().getFullYear()}</p>
            </div>

        </Menu>
    );
};

export default Sidebar;