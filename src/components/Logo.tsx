type Props = {
    h?: number,
};

const Logo = ({ h = 6 }: Props) => (
    <div className="text-center text-white">
        <h1>
            <img src={require(`../assets/images/logo.svg`).default} className="inline-flex h-8" alt="Logo" />
        </h1>
        <h2 className="mt-3 font-semibold leading-none">Education for Disgraphia</h2>
    </div>
);

export default Logo;