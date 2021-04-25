import { RouteComponentProps, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';

type MatchParams = {
    category?: string | undefined;
}

const Characters = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { category, } } = match;
    
    // Contexts
    const characterContext = useCharacterContext();

    const getLinkCharacter = (character: string | number) => {
        switch(category) {
            case 'symbols': return encodeURIComponent(encodeURIComponent(character).replace(/\./g, '%2E'));
            case 'letters': return typeof character === 'string' ? character.toLowerCase() : character;
            default: return character;
        };
    };

    return (
        <div className="flex-grow text-white">
            <Navbar
                leftButton={{
                    onClick: () => history.replace('/'),
                    icon: <FaChevronLeft size="0.83rem" />
                }}
            />

            <main>
                <section className="text-center pt-19 px-12 mb-10">
                    <p className="text-sm font-semibold">Pilih salah satu alfabet untuk mulai mempelajari detailnya.</p>
                </section>
                <section className="grid grid-cols-4 gap-2 px-8 mb-8">
                    {category && (characterContext.characters[category] as Array<string | number>).map((character) => (
                        <Link to={`/characters/category/${category}/${getLinkCharacter(character)}`} key={character}>
                            <CharacterFrame size="full" textSize="3xl" rounded="lg">
                                {character}
                            </CharacterFrame>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Characters;