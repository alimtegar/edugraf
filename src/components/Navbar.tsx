
import {Link} from 'react-router-dom';
// import { FaChevronLeft } from 'react-icons/fa';
// import { ImHome } from 'react-icons/im';

// Components
import Button from './Button';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-blue-200 text-blue-900 h-14 p-1">
            <Button bgColor="transparent" textColor="blue-900" w={10} h={10} center>
                {/* <FaChevronLeft size="1rem" className="transform -translate-y-0.25" /> */}
            </Button>
            
            <Link to="/">
                <a className="font-handwriting font-semibold text-2xl transform -translate-y-0.5" href="/">Sibisa</a>
            </Link>

            <Button bgColor="transparent" textColor="blue-900" w={10} h={10} center>
                {/* <ImHome size="1rem" className="transform -translate-y-0.25" /> */}
            </Button>
        </nav>
    );
};

export default Navbar;