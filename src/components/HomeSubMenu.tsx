import { Link } from 'react-router-dom';
import Slider, { Settings, CustomArrowProps } from "react-slick";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Components
import HomeSubMenuItem from "../types/HomeSubMenuItem";
import Button from './Button';

type Props = {
    subMenu: HomeSubMenuItem[],
};

type NextArrowProps = {
    slidesToShow: number,
};

const SliderNextArrow = ({ onClick, currentSlide, slideCount, slidesToShow }: NextArrowProps & CustomArrowProps) => (
    <div
        className={`absolute z-50 top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 ${currentSlide && (currentSlide + slidesToShow === slideCount) ? 'hidden' : ''}`}
        onClick={onClick}
    >
        <Button bgColor="white" bgColorOn="bg-gray-100" textColor="blue-900" textColorOn="blue-900" w={11} h={11} borderR="full" shadow="lg" center>
            <FaChevronRight size="0.83rem" className="mt-0.5" />
        </Button>
    </div>
);

const SliderPrevArrow = ({ onClick, currentSlide }: CustomArrowProps) => (
    <div
        className={`absolute z-50 top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 ${currentSlide === 0 ? 'hidden' : ''}`}
        onClick={onClick}>
        <Button bgColor="white" bgColorOn="bg-gray-100" textColor="blue-900" textColorOn="blue-900" w={11} h={11} borderR="full" shadow="lg" center>
            <FaChevronLeft size="0.83rem" className="mt-0.5" />
        </Button>
    </div>
);

const HomeSubMenu = ({ subMenu }: Props) => {
    const slidesToShow = 2;
    const sliderSettings: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        nextArrow: <SliderNextArrow slidesToShow={slidesToShow} />,
        prevArrow: <SliderPrevArrow />,
    };

    return (
        <div className="relative -m-1">
            <Slider {...sliderSettings}>
                {subMenu.map((subMenuItem, i) => (
                    <div className="p-1" key={i}>
                        <Link to={subMenuItem.to} key={i}>
                            <div className="text-blue-900 rounded-lg shadow overflow-hidden">
                                <div className="flex flex-col justify-center items-center bg-blue-200 text-center p-6">
                                    {subMenuItem.icon}
                                    <h3 className="text-sm font-bold mt-4">
                                        {subMenuItem.title}
                                    </h3>
                                </div>
                                {/* <div className="flex items-center bg-blue-100 text-sm font-semibold px-4 py-3">
                                    Selengkapnya
                                    <FaChevronRight size="0.66rem" className="ml-auto" />
                                </div> */}
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeSubMenu;