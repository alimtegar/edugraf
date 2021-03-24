import { RouteComponentProps, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import Button from './Button';
import Frame from './Frame';

type MatchParams = {
    category?: string | undefined;
}

const Characters = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { category, } } = match;
    let characters: string = "";

    switch (category) {
        case 'symbols': characters = '+-×/✓=^()[]{}<>|&:;?!~*'; break;
        case 'letters': characters = 'abcdefghijklmnopqrstuvwxyz'; break;
        case 'numbers': characters = '1234567890'; break;
    }

    return (
        <div className="flex-grow bg-blue-200 text-blue-900">
            <Navbar leftButton={(
                <Button
                    bgColor="transparent"
                    bgColorOn="blue-300"
                    textColor="blue-900"
                    textColorOn="blue-900"
                    w={11}
                    h={11}
                    center
                    onClick={history.goBack}
                >
                    <FaChevronLeft size="0.83rem" />
                </Button>)}
            />
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