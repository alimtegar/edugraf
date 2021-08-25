import axios from 'axios';

// Types
import StageCategory from './types/StageCategory';

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

export const getLevel = (xp: number) => xp < 300 ? 1 : Math.floor((Math.log((xp - 1) / 300) / Math.log(1.5))) + 2;
export const getXpLimit = (level: number) => Math.floor(1.5 ** (level - 1) * 300);
export const getXpPct = (xp: number) => xp / getXpLimit(getLevel(xp)) * 100

export const getStageCategoryColor = (stageCategory: StageCategory) => {
    switch (stageCategory) {
        case 'symbols': return 'gradient-to-tl from-red-500 to-red-400';
        case 'letters': return 'gradient-to-tl from-yellow-500 to-yellow-400';
        case 'numbers': return 'gradient-to-tl from-green-500 to-green-400';
        case 'on-paper': return 'gradient-to-tl from-blue-500 to-blue-400';
    }
};

export const translateStageCategory = (stageCategory: StageCategory) => {
    switch (stageCategory) {
        case 'symbols': return 'Simbol';
        case 'letters': return 'Huruf';
        case 'numbers': return 'Angka';
        case 'on-paper': return 'Alat Tulis';
    }
}