// Components
import Button from './Button';

type NavbarButton = {
    onClick: any
    icon: JSX.Element,
}

type Props = {
    title: string,
    leftButton?: NavbarButton | undefined
    rightButton?: NavbarButton | undefined
};

const Navbar = ({ title, leftButton, rightButton }: Props) => (
    <nav className="absolute w-full flex justify-between items-center text-gray-700 p-2">
        {leftButton !== undefined ? (
            <Button
                w={12}
                h={12}
                bgColor="white"
                bgColorOn="white"
                textColor="gray-400"
                textColorOn="blue-500"
                shadow="default"
                center
                onClick={leftButton.onClick}
            >
                {leftButton.icon}
            </Button>
        ) : (<span className="w-12 h-12" />)}

        <h1 className="font-extrabold text-lg">
            {title}
        </h1>

        {rightButton !== undefined ? (
            <Button
                w={12}
                h={12}
                bgColor="white"
                bgColorOn="white"
                textColor="gray-400"
                textColorOn="blue-500"
                shadow="default"
                center
                onClick={rightButton.onClick}
            >
                {rightButton.icon}
            </Button>
        ) : (<span className="w-12 h-12" />)}
    </nav>
);

export default Navbar;