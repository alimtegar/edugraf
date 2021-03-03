import { FaHome, FaBars } from 'react-icons/fa';
import {ImHome} from 'react-icons/im';

// Components
import Button from './Button';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-blue-200 text-blue-900 h-14 p-1.5">
            <Button bgColor="transparent" textColor="blue-900" w={10} h={10} center>
                {/* <ImHome size="1.25rem" /> */}
            </Button>
            <a className="font-handwriting font-semibold text-2xl transform -translate-y-0.5" href="/">Sibisa</a>
            {/* <span></span> */}
            <Button bgColor="transparent" textColor="blue-900" w={10} h={10} center>
                {/* <FaBars size="1.25rem" /> */}
            </Button>
        </nav>
    );
};

export default Navbar;