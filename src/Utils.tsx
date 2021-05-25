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

export const validateAnswer = (question: string, answer: string) => {
    let is_correct = question === answer

    if (['c', 'C', 'p', 'P', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',].indexOf(question) > -1) {
        is_correct = question.toLowerCase() === answer.toLowerCase()
    } else if (
        ((['o', 'O', '0',].indexOf(question) > -1) && (['o', 'O', '0',].indexOf(answer) > -1)) ||
        ((['l', 'I', '1',].indexOf(question) > -1) && (['l', 'I', '1',].indexOf(answer) > -1)) ||
        ((['g', 'q', '9',].indexOf(question) > -1) && (['g', 'q', '9',].indexOf(answer) > -1)) ||
        answer.includes(question)
    ) {
        is_correct = true
    }

    return is_correct
}