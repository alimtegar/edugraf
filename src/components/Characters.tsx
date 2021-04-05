import { RouteComponentProps, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';

type MatchParams = {
    category?: string | undefined;
}

const Characters = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { category, } } = match;
    let characters: string = "";

    switch (category) {
        case 'symbols': characters = '+-×/=^<:;~*?!>()[]{}|━&'; break; //✓
        case 'letters': characters = 'abcdefghijklmnopqrstuvwxyz'; break;
        case 'numbers': characters = '1234567890'; break;
    }

    return (
        <div className="flex-grow bg-blue-200 text-blue-900">
            <Navbar
                leftButton={{
                    onClick: history.goBack,
                    icon: <FaChevronLeft size="0.83rem" />
                }}
            />

            <main>
                <section className="text-center pt-17 px-12 mb-8">
                    <p className="text-sm font-semibold">Pilih salah satu alfabet untuk mulai mempelajarinya.</p>
                </section>
                <section className="grid grid-cols-4 gap-2 px-8">
                    {characters && characters.split('').map((character, i) => (
                        <Link to={`/characters/category/letters/${character}`} key={i}>
                            <CharacterFrame size="full" textSize="3xl" rounded="lg">
                                {character.toUpperCase()}
                            </CharacterFrame>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Characters;