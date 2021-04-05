import { createContext, useContext, } from "react";

// Types
import { default as CharacterContextState } from '../types/CharacterContext';

type Props = {
  children: JSX.Element
}

// Initial states
const initState: CharacterContextState = {
  symbols: ['+', '-', '×', '/', '=', '^', '<', ':', ';', '~', '*', '?', '!', '>', '(', ')', '[', ']', '{', '}', '|', '━', '&',],
  letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,],
};

// Context
const CharacterContext = createContext(initState);

// Provider
const CharacterContextProvider = ({ children }: Props) => {
  return (
    <CharacterContext.Provider value={initState}>
      {children}
    </CharacterContext.Provider>
  );
};

function useCharacterContext() {
  const characterContext = useContext(CharacterContext)

  if (characterContext === undefined) {
    throw new Error('useCharacterContext must be used within a CharacterContextProvider')
  }

  return characterContext
}

export {
  CharacterContextProvider,
  useCharacterContext,
};