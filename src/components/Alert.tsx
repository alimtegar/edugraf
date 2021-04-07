import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const buttonClass = 'relative w-24 h-12 text-sm mx-1 focus:outline-none font-bold rounded-lgfont-bold rounded-lg';

const Alert = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: `${buttonClass} bg-green-500 active:bg-blue-50 text-white hover:text-white shadow-default`,
        cancelButton: `${buttonClass} bg-red-500 active:bg-red-600 text-white hover:text-white active:text-white shadow-default`,
    },
    buttonsStyling: false,
}));

export default Alert;