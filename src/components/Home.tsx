import Navbar from './Navbar';

// Types
import HomeMenuItem from '../types/HomeMenuItem';
import HomeSubMenu from './HomeSubMenu';

const Home = () => {
    const menu: HomeMenuItem[] = [
        {
            title: 'Materi Belajar',
            subMenu: [
                {
                    title: 'Tabel Simbol',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src="/icons/blocks.svg" className="h-14" alt="icon" />),
                    to: '/characters/category/symbols',
                },
                {
                    title: 'Tabel Huruf',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src="/icons/blocks.svg" className="h-14" alt="icon" />),
                    to: '/characters/category/letters',
                },
                {
                    title: 'Tabel Angka',
                    description: 'Tabel angka dan cara penulisannya',
                    icon: (<img src="/icons/blocks.svg" className="h-14" alt="icon" />),
                    to: '/characters/category/numbers',
                },
            ],
        },
        {
            title: 'Tes Kemampuan',
            subMenu: [
                {
                    title: 'Tes Simbol',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src="/icons/pencil.svg" className="h-14" alt="icon" />),
                    to: '/stages/category/symbols',
                },
                {
                    title: 'Tes Huruf',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src="/icons/pencil.svg" className="h-14" alt="icon" />),
                    to: '/stages/category/letters',
                },
                {
                    title: 'Tes Angka',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src="/icons/pencil.svg" className="h-14" alt="icon" />),
                    to: '/stages/category/numbers',
                },
            ],
        },
    ];


    return (
        <div className="flex-grow bg-blue-50">
            <Navbar />
            <header className="flex justify-center items-center bg-blue-200 text-blue-900 pt-4 pb-8 rounded-b-3xl shadow">
                {/* Profile Photo */}
                <div className="bg-gray-200 w-24 h-24 mr-4 border-3 border-white rounded-full shadow-sm overflow-hidden">
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7fe72052-ca6c-4ebc-8635-eef07d8cfe4e/de31bp4-d8f68279-adc6-4e49-9fed-932bd25e5923.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvN2ZlNzIwNTItY2E2Yy00ZWJjLTg2MzUtZWVmMDdkOGNmZTRlXC9kZTMxYnA0LWQ4ZjY4Mjc5LWFkYzYtNGU0OS05ZmVkLTkzMmJkMjVlNTkyMy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LaF3A1f-xas3rb7HuOWH6dt7Bhm_hogbOd9LO3pz3oo" className="min-h-full fit-cover" alt="profile" />
                </div>

                {/* Profile Name */}
                <div>
                    <p className="text-sm font-semibold">Selamat datang,</p>
                    <h1 className="text-lg font-bold leading-snug">
                        John Doe
                    </h1>
                </div>
            </header>

            {/* <section className="grid gap-4 p-4">
                <div className="bg-blue-200 h-12 rounded-lg shadow">

                </div>
                <div className="bg-blue-200 h-12 rounded-lg shadow">

                </div>
                <div className="bg-blue-200 h-12 rounded-lg shadow">

                </div>
            </section> */}

            <section className="grid grid-cols-1 gap-4 px-4 py-4">
                {/* <div>
                    Senam
                </div> */}

                {menu.map((menuItem, i) => (
                    <div className="text-blue-900" key={i}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold leading-snug">
                                {menuItem.title}
                            </h2>
                        </div>
                        <HomeSubMenu subMenu={menuItem.subMenu} />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;