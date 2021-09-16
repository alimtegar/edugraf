// Components
import Button from './Button';

// Types
import {default as ButtonProps} from '../types/Button';

type NavbarButton = {
    onClick: any
    icon: JSX.Element,
}

type Props = {
    title?: string,
    leftButton?: NavbarButton | undefined,
    rightButton?: NavbarButton | undefined,
    leftButtonSettings?: ButtonProps,
    rightButtonSettings?: ButtonProps,
};

const Navbar = ({ title, leftButton, rightButton, leftButtonSettings, rightButtonSettings, }: Props) => (
    <nav className="absolute w-full flex justify-between items-center text-gray-700 p-2">
        {leftButton !== undefined ? (
            <Button
                w={11}
                h={11}
                bgColor="white"
                bgColorOn="white"
                textColor="gray-400"
                textColorOn="blue-500"
                shadow="default"
                center
                onClick={leftButton.onClick}
                {...leftButtonSettings}
            >
                {leftButton.icon}
            </Button>
        ) : (<span className="w-12 h-12" />)}

        {title !== undefined ? (
            <h1 className="font-extrabold text-lg">
                {title}
            </h1>
        ) : null}

        {rightButton !== undefined ? (
            <Button
                w={11}
                h={11}
                bgColor="white"
                bgColorOn="white"
                textColor="gray-400"
                textColorOn="blue-500"
                shadow="default"
                center
                onClick={rightButton.onClick}
                {...rightButtonSettings}
            >
                {rightButton.icon}
            </Button>
        ) : (<span className="w-12 h-12" />)}
    </nav>
);

export default Navbar;