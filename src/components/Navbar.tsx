import { Link } from 'react-router-dom';

// Components
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
    <nav className="flex justify-between items-center bg-blue-200 text-blue-900 p-2">
        {leftButton !== undefined ? (
            <Button
                bgColor="transparent"
                bgColorOn="blue-100"
                textColor="blue-900"
                textColorOn="blue-900"
                w={11}
                h={11}
                center
                onClick={leftButton.onClick}
            >
                {leftButton.icon}
            </Button>
        ) : (<span className="w-11 h-11" />)}

        <Link to="/" className="font-handwriting font-semibold text-2xl">
            Sibisa
        </Link>

        {rightButton !== undefined ? (
            <Button
                bgColor="transparent"
                bgColorOn="blue-100"
                textColor="blue-900"
                textColorOn="blue-900"
                w={11}
                h={11}
                center
                onClick={rightButton.onClick}
            >
                {rightButton.icon}
            </Button>
        ) : (<span className="w-11 h-11" />)}
    </nav>
);

export default Navbar;