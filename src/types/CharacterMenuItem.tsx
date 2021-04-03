type CharacterMenuItem = {
    title: string,
    icon: any,
    // type: 'listen-pronounciation' | 'see-writing' | 'change-case'
    onClick: () => void,
    isUsingPing: boolean,
};

export default CharacterMenuItem