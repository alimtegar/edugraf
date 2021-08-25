import InitialSlider, { Settings, CustomArrowProps } from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import classNames from 'classnames';

// Components
import Button from './Button';

// Types
type Props = {
    settings: Settings,
    children: JSX.Element[],
};

const SliderNextArrow = ({ onClick, }: CustomArrowProps) => (
    <div
        className={classNames('absolute z-50 top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2', {
            'hidden': !onClick,
        })}
        onClick={onClick}
    >
        <Button w={12} h={12} borderR="full" shadow="default" center>
            <FaChevronRight size="1rem" className="mt-0.5" />
        </Button>
    </div>
);

const SliderPrevArrow = ({ onClick, }: CustomArrowProps) => (
    <div
        className={classNames('absolute z-50 top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2', {
            'hidden': !onClick,
        })}
        onClick={onClick}>
        <Button w={12} h={12} borderR="full" shadow="default" center>
            <FaChevronLeft size="1rem" className="mt-0.5" />
        </Button>
    </div>
);

const Slider = ({ settings, children, }: Props) => (
    <InitialSlider
        {...settings}
        nextArrow={(<SliderNextArrow />)}
        prevArrow={(<SliderPrevArrow />)}
    >
        {children.map((childrenItem) => (childrenItem))}
    </InitialSlider>
);

export default Slider;