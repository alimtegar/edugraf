import StageCategory from './StageCategory';

type HomeSubMenuItem = {
    title: string,
    category: StageCategory,
    description: string,
    icon: JSX.Element,
    to: string,
};

export default HomeSubMenuItem;