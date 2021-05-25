import axios from 'axios';

export const base64toBlob = (dataURI: string, type: string) => {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: type, },);
};

export const recognize = async (srcImg: Blob): Promise<string> => {
    let formData = new FormData();

    formData.append('srcImg', srcImg);
    formData.append('filetypeSession', 'string');
    formData.append('content-type', 'application/octet-stream');

    try {
        const res = await axios.post(process.env.REACT_APP_PEN_TO_PRINT_API_URL + '/recognize/', formData, {
            headers: {
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                'x-rapidapi-key': process.env.REACT_APP_PEN_TO_PRINT_API_KEY,
                'x-rapidapi-host': process.env.REACT_APP_PEN_TO_PRINT_API_HOST,
                'useQueryString': 'true',
            },
        });

        return res.data.value ? res.data.value : '';
    } catch (err) {
        console.log(err);
        return '';
    }
};