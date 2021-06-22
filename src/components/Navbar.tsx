import { Link } from 'react-router-dom';

// Components
import Logo from './Logo';
import Button from './Button';

type NavbarButton = {
    onClick: any
    icon: JSX.Element,
}

type Props = {
    title: string,
    leftButton?: NavbarButton | undefined
    rightButton?: NavbarButton | undefined
};

const Navbar = ({ title, leftButton, rightButton }: Props) => (
    <nav className="absolute w-full flex justify-between items-center text-gray-700 p-2">
        {leftButton !== undefined ? (
            <Button
                bgColor="white"
                bgColorOn="gray-50"
                textColor="gray-700"
                textColorOn="gray-700"
                w={11}
                h={11}
                shadow="default"
                center
                onClick={leftButton.onClick}
            >
                {leftButton.icon}
            </Button>
        ) : (<span className="w-11 h-11" />)}

        <h1 className="font-bold text-lg">
            {title}
        </h1>

        {rightButton !== undefined ? (
            <Button
                bgColor="white"
                bgColorOn="gray-50"
                textColor="gray-700"
                textColorOn="gray-700"
                w={11}
                h={11}
                shadow="default"
                center
                onClick={rightButton.onClick}
            >
                {rightButton.icon}
            </Button>
        ) : (<span className="w-11 h-11" />)}
    </nav>
);

export default Navbar;