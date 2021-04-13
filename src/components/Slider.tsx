import InitialSlider, { Settings, CustomArrowProps } from "react-slick";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Components
import Button from './Button';

// Types
type NextArrowProps = {
    slidesToShow: number | undefined,
};

type Props = {
    settings: Settings,
    children: JSX.Element[],
};

const SliderNextArrow = ({ onClick, currentSlide, slideCount, slidesToShow }: NextArrowProps & CustomArrowProps) => (
    <div
        className={`absolute z-50 top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 ${currentSlide && slidesToShow && (currentSlide + slidesToShow === slideCount) ? 'hidden' : ''}`}
        onClick={onClick}
    >
        <Button bgColor="secondary" bgColorOn="bg-gray-100" textColor="white" textColorOn="white" w={11} h={11} borderR="full" center>
            <FaChevronRight size="0.83rem" className="mt-0.5" />
        </Button>
    </div>
);

const SliderPrevArrow = ({ onClick, currentSlide }: CustomArrowProps) => (
    <div
        className={`absolute z-50 top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 ${currentSlide === 0 ? 'hidden' : ''}`}
        onClick={onClick}>
        <Button bgColor="secondary" bgColorOn="bg-gray-100" textColor="white" textColorOn="white" w={11} h={11} borderR="full" center>
            <FaChevronLeft size="0.83rem" className="mt-0.5" />
        </Button>
    </div>
);

const Slider = ({settings: initSettings, children}: Props) => {
    const slidesToShow = initSettings.slidesToShow;
    const settings: Settings = {
        slidesToShow: slidesToShow,
        nextArrow: <SliderNextArrow slidesToShow={slidesToShow} />,
        prevArrow: <SliderPrevArrow />,
        ...initSettings
    };

    return (
        <InitialSlider {...settings}>
            {children.map((childrenItem) => (childrenItem))}
        </InitialSlider>
    );
};

export default Slider;