import { createContext, useContext, } from "react";

// Types
import { default as CharacterContextState } from '../types/CharacterContext';

type Props = {
  children: JSX.Element
}

// Initial states
const initState: CharacterContextState = {
  characters: {
    symbols: ['+', '-', '×', '÷', '=', '^', '<', ':', ';', '~', '*', '?', '!', '>', '(', ')', '[', ']', '{', '}', '|', '━', '&',],
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',],
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,],
  },
  listenPronounciation: () => { },
};

// Context
const CharacterContext = createContext(initState);

// Provider
const CharacterContextProvider = ({ children }: Props) => {
  const listenPronounciation = (character: string | undefined, setIsListeningPronounciation: React.Dispatch<React.SetStateAction<boolean>>) => {
    const synth = window.speechSynthesis;
    const synthUtter = new SpeechSynthesisUtterance(character);

    synthUtter.lang = 'id-ID';
    synthUtter.onstart = () => setIsListeningPronounciation(true);
    synthUtter.onend = () => setIsListeningPronounciation(false);

    synth.speak(synthUtter);
  }

  return (
    <CharacterContext.Provider value={{ ...initState, listenPronounciation }}>
      {children}
    </CharacterContext.Provider>
  );
};

function useCharacterContext() {
  const characterContext = useContext(CharacterContext);

  if (characterContext === undefined) {
    throw new Error('useCharacterContext must be used within a CharacterContextProvider')
  }

  return characterContext
}

export {
  CharacterContextProvider,
  useCharacterContext,
};