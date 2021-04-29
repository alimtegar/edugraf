type Props = {
    h?: number,
};

const Logo = ({ h = 6 }: Props) => (
    <h1 className="font-handwriting font-semibold text-2xl">
        {/* Sibisa */}
        <img src={`/logo.svg`} alt="Sibisa" className={`w-auto h-${h}`} />
    </h1>
);

export default Logo;