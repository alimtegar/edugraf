type Props = {
    active: number,
    count: number | undefined,
}

const TestPagination = ({ active, count = 1 }: Props) => {
    return (
        <div>
            <ol className={`flex grid grid-cols-${count}`}>
                {[...Array(count)].map((_, key) => key <= active ? (
                    <li className="relative bg-red-500 border-red-500 h-0.75" key={key}>
                        {/* <span className="absolute top-0.75 left-1/2 transform -translate-x-1/2 border-transparent border-12" style={{ borderTopColor: 'inherit', }}></span> */}
                        {key === active && (<span className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-red-500 w-3 h-3 rounded-full" style={{ borderTopColor: 'inherit', }}></span>)}
                    </li>
                ) : (
                    <li className="bg-white h-0.75" key={key} />
                ))}
            </ol>
        </div>
    );
};

export default TestPagination;