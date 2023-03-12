import { useState, } from 'react';
import { FaUpload, } from 'react-icons/fa';
import { useDropzone, } from 'react-dropzone';

// Utils
import { fileToBase64, } from '../Utils';

// Components
import Photo from './Photo';
import Button from './Button';

// Types
type Props = {
    initPhoto?: string,
    setPhotoFile: React.Dispatch<React.SetStateAction<File | undefined>>,
};

const PhotoDropzone = ({ initPhoto, setPhotoFile }: Props) => {
    // const initPhoto = '';
    const [photo, setPhoto] = useState(initPhoto);
    const { getRootProps, getInputProps, open } = useDropzone({
        accept: 'image/*',
        multiple: false,
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        // 
        onDrop: async ([acceptedPhotoFile]) => {
            setPhoto(await fileToBase64(acceptedPhotoFile) as string)
            setPhotoFile(acceptedPhotoFile);
        },
    });

    // useEffect(() => () => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     if (photo) {
    //         URL.revokeObjectURL(photo);
    //     }
    // }, [photo]);

    return (
        <div className="mb-7 flex justify-center items-center">
            <div className="relative" {...getRootProps()}>
                <input name="photo" {...getInputProps()} />

                <Photo {...photo && { photo: photo }} size={28} borderW={0} shadow="none" />

                <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                    <Button
                        type="button"
                        w={11}
                        h={11}
                        shadow="default"
                        center
                        onClick={open}
                    >
                        <FaUpload size="1rem" className="transform -translate-y-px" />
                    </Button>
                </span>
            </div>
        </div>
    )
};

export default PhotoDropzone;