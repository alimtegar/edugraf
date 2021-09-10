import InitialSlider, { Settings, CustomArrowProps } from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import classNames from 'classnames';

// Components
import Button from './Button';

// Types
import {default as ButtonProps} from '../types/Button';

// Types
type Props = {
    arrowSettings?: ButtonProps,
    settings: Settings,
    children: JSX.Element[],
};

const SliderNextArrow = ({ bgColor, bgColorOn, textColor, textColorOn, onClick, }: CustomArrowProps & ButtonProps) => (
    <div
        className={classNames('absolute z-40 top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2', {
            'hidden': !onClick,
        })}
        onClick={onClick}
    >
        <Button
            w={12}
            h={12}
            bgColor={bgColor}
            bgColorOn={bgColorOn}
            textColor={textColor}
            textColorOn={textColorOn}
            borderR="full"
            shadow="default"
            center
        >
            <FaChevronRight size="1rem" className="mt-0.5" />
        </Button>
    </div>
);

const SliderPrevArrow = ({ bgColor, bgColorOn, textColor, textColorOn, onClick, }: CustomArrowProps & ButtonProps) => (
    <div
        className={classNames('absolute z-40 top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2', {
            'hidden': !onClick,
        })}
        onClick={onClick}>
        <Button
            w={12}
            h={12}
            bgColor={bgColor}
            bgColorOn={bgColorOn}
            textColor={textColor}
            textColorOn={textColorOn}
            borderR="full"
            shadow="default"
            center
        >
            <FaChevronLeft size="1rem" className="mt-0.5" />
        </Button>
    </div>
);

const Slider = ({ arrowSettings, settings, children, }: Props) => (
    <InitialSlider
        {...settings}
        nextArrow={(<SliderNextArrow {...arrowSettings} />)}
        prevArrow={(<SliderPrevArrow {...arrowSettings} />)}
    >
        {children.map((childrenItem) => (childrenItem))}
    </InitialSlider>
);

export default Slider;