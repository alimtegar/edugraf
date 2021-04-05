import Characters from './Characters';

type CharacterContext = {
    characters: Characters,
    listenPronounciation: (character: string | undefined, setIsListeningPronounciation: React.Dispatch<React.SetStateAction<boolean>>) => void,
};

export default CharacterContext; 