import { RouteComponentProps, Link } from 'react-router-dom';

// Components
import Frame from './Frame';

type MatchParams = {
    category?: string | undefined;
}

const Characters = ({ match }: RouteComponentProps<MatchParams>) => {
    const { params: { category, } } = match;
    let characters: string = "";

    switch(category) {
        case 'symbols': characters = '+-*/=^()[]{}<>|&:;?!'; break;
        case 'letters': characters = 'abcdefghijklmnopqrstuvwxyz'; break;
        case 'numbers': characters = '1234567890'; break;
    }

    return (
        <div className="flex-grow bg-blue-200 text-blue-900">
            <div className="text-center py-4 px-6 pb-6">
                <p className="text-sm font-semibold">Pilih salah satu alfabet untuk mulai mempelajarinya.</p>
            </div>
            <div className="grid grid-cols-4 gap-2 p-4">
                {characters && characters.split('').map((character, i) => (
                    <Link to={`/characters/category/letters/${character}`} key={i}>
                        <Frame size="full" textSize="4xl" rounded="lg">
                            {character.toUpperCase()}
                        </Frame>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Characters;