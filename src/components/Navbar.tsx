import { Link } from 'react-router-dom';

type Props = {
    leftButton?: JSX.Element
    rightButton?: JSX.Element
};

const Navbar = ({ leftButton, rightButton }: Props) => (
    <nav className="flex justify-between items-center bg-blue-200 text-blue-900 h-14 p-1">
        {leftButton ? leftButton : (<span className="w-11" />)}

        <Link to="/" className="font-handwriting font-semibold text-2xl">
            Sibisa
        </Link>

        {rightButton ? rightButton : (<span className="w-11" />)}
    </nav>
);

export default Navbar;