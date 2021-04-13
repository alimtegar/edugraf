import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const buttonClass = 'relative w-24 h-12 text-sm mx-1 focus:outline-none font-bold rounded-lg font-extrabold rounded-full';

const Alert = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: `${buttonClass} bg-blue-500 active:bg-blue-600 text-white hover:text-white`,
        cancelButton: `${buttonClass} bg-red-500 active:bg-red-600 text-white hover:text-white active:text-white`,
    },
    buttonsStyling: false,
}));

export default Alert;