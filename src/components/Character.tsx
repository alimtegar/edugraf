// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Types
import CharacterMenuItem from '../types/CharacterMenuItem';

// Components
import Frame from './Frame';
import CharacterMenuItemComponent from './CharacterMenuItem';
import Button from './Button';

const Character = () => {
    const menu: CharacterMenuItem[] = [
        {
            title: 'Penulisan',
            description: 'Tampilkan',
            icon: (<img src="/icons/pencil.svg" className="h-14" alt="Penulisan" />)
        },
        {
            title: 'Pengucapan',
            description: 'Dengarkan',
            icon: (<img src="/icons/sound.svg" className="h-14" alt="Pengucapan" />)
        },
    ];

    return (
        <main className="flex flex-grow flex-col bg-blue-200">
            <div className="h-0.75"></div>
            <section className="flex flex-col justify-center items-center w-full px-12 py-12">
                <Frame size={28}>A</Frame>
                <p className="text-blue-900 text-sm text-center font-semibold mt-6">Ketahui cara penulisan dan pengucupan dari huruf <strong className="font-bold">A</strong> di bawah ini.</p>
            </section>
            {/* <section className="flex flex-col justify-end w-full px-3 pb-3"> */}
            {/* <div className="grid grid-cols-1 gap-3 flex flex-grow mb-3">
                    <div className="bg-white p-9 rounded-lg">
                        Cara pengucapan
                    </div>
                    <div className="bg-white p-9 rounded-lg">
                        Cara pengucapan
                    </div>
                </div> */}



            <div className="text-blue-900 mt-auto px-3 pb-3">
                {/* <div className="flex justify-between items-center mb-3"> */}
                {/* <h2 className="font-bold leading-snug"> */}
                {/* Menu */}
                {/* </h2> */}
                {/* <span className="text-sm font-semibold"> */}
                {/* <strong className="font-bold">{menuItem.subMenu.length}</strong> Item */}
                {/* </span> */}
                {/* </div> */}
                {/* <div className="mb-3">
                    <Button
                        bgColor="white"
                        textColor="blue-900"
                        w="full"
                        h={12}
                        borderR="full"
                        center
                    >
                        Huruf Kecil
                    </Button>
                </div> */}

                <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {menu.map((menuItem, i) => (
                        <CharacterMenuItemComponent {...menuItem} key={i} />
                    ))}
                </div>



                <div>
                    {/* <span className="mr-3">
                        <Button
                            bgColor="transparent"
                            textColor="blue-900"
                            w={12}
                            h={12}
                            borderR="full"
                            center
                        >
                            Z
                        </Button>
                    </span> */}
                    <Button
                        w="full"
                        h={12}
                        borderR="full"
                    >
                        Latihan Menulis
                    </Button>
                </div>
                {/* <div className="grid grid-cols-2 gap-3">
                    <Button
                        bgColor="white"
                        textColor="blue-900"
                        w="full"
                        h={12}
                        borderR="full"
                    >
                        Prev
                    </Button>
                    <Button
                        bgColor="white"
                        textColor="blue-900"
                        w="full"
                        h={12}
                        borderR="full"
                    >
                        Next
                    </Button>
                </div> */}
            </div>


            {/* <div className="grid grid-cols-2 gap-3">
                    <Button
                        bgColor="white"
                        textColor="blue-900"
                        w="full"
                        h={12}
                        borderR="full"
                    >
                        <div className="flex justify-between items-center px-6">
                            <FaChevronLeft size="1rem" />
                            Z
                        </div>
                    </Button>
                    <Button
                        bgColor="white"
                        textColor="blue-900"
                        w="full"
                        h={12}
                        borderR="full"
                    >
                        <div className="flex justify-between items-center px-6">
                            B
                            <FaChevronRight size="1rem" />
                        </div>
                    </Button>
                </div> */}
            {/* </section> */}
        </main>
    );
};



export default Character;