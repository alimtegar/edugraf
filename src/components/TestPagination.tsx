type Props = {
    color?: string,
    active: number,
    count: number | undefined,
}

const TestPagination = ({ color = 'pink-500', active = 0, count }: Props) => {
    return (
        <div>
            <ol className={`flex grid grid-cols-${count ? count : 1} shadow-sm`}>
                {[...Array(count)].map((_, key) => count && key <= active - 1 ? (
                    <li className={`relative bg-${color} border-${color} h-0.75`} key={key}>
                        {/* <span className="absolute top-0.75 left-1/2 transform -translate-x-1/2 border-transparent border-12" style={{ borderTopColor: 'inherit', }}></span> */}
                        {key === active - 1 && (<span className={`absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-${color} w-3 h-3 rounded-full`} style={{ borderTopColor: 'inherit', }}></span>)}
                    </li>
                ) : (
                    <li className="bg-white h-0.75" key={key} />
                ))}
            </ol>
        </div>
    );
};

export default TestPagination;