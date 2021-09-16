import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const buttonClass = 'relative w-24 h-12 text-sm mx-1 focus:outline-none font-bold rounded-lg font-extrabold rounded-full';

const Alert = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: `${buttonClass} bg-gradient-to-tl from-blue-500 to-blue-400 active:from-blue-600 active:to-blue-500 hover:from-blue-600 hover:to-blue-500 text-white`,
        cancelButton: `${buttonClass} bg-gradient-to-tl from-red-500 to-red-400 active:from-red-600 active:to-red-500 hover:from-red-600 hover:to-red-500 text-white`,
        closeButton: `w-11 h-11`, // Doesn't work
    },
    buttonsStyling: false,
}));

export default Alert;