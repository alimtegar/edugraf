import { useState, useEffect, } from 'react';
import { FaUpload, } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

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
        onDrop: ([acceptedPhotoFile]) => {
            setPhoto(URL.createObjectURL(acceptedPhotoFile))
            setPhotoFile(acceptedPhotoFile);
        },
    });

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        if (photo) {
            URL.revokeObjectURL(photo);
        }
    }, [photo]);

    return (
        <div className="mb-7 flex justify-center items-center">
            <div className="relative" {...getRootProps()}>
                <input name="photo" {...getInputProps()} />

                <Photo {...photo && { photo: photo }} size={28} />

                <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                    <Button
                        type="button"
                        w={11}
                        h={11}
                        borderR="full"
                        shadow="md"
                        center
                        onClick={open}
                    >
                        <FaUpload size="0.83rem" />
                    </Button>
                </span>
            </div>
        </div>
    )
};

export default PhotoDropzone;