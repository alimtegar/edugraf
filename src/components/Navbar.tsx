import { Link } from 'react-router-dom';

// Components
import Logo from './Logo';
import Button from './Button';

type NavbarButton = {
    onClick: any
    icon: JSX.Element,
}

type Props = {
    leftButton?: NavbarButton | undefined
    rightButton?: NavbarButton | undefined
};

const Navbar = ({ leftButton, rightButton }: Props) => (
    <nav className="absolute w-full flex justify-between items-center text-white p-2">
        {leftButton !== undefined ? (
            <Button
                bgColor="transparent"
                bgColorOn="white-on"
                w={11}
                h={11}
                shadow="none"
                center
                onClick={leftButton.onClick}
            >
                {leftButton.icon}
            </Button>
        ) : (<span className="w-11 h-11" />)}

        <Link to="/">
            <Logo />
        </Link>

        {rightButton !== undefined ? (
            <Button
                bgColor="transparent"
                bgColorOn="white-on"
                w={11}
                h={11}
                shadow="none"
                center
                onClick={rightButton.onClick}
            >
                {rightButton.icon}
            </Button>
        ) : (<span className="w-11 h-11" />)}
    </nav>
);

export default Navbar;