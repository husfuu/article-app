interface PaginationProps {
    totalPosts: number;
    postsPerPage: number;
    onPageClick: (page: number) => void;
    currentPage: number;
}

const Pagination = (props: PaginationProps) => {
    const { totalPosts, postsPerPage, onPageClick, currentPage } = props
    let pages = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="text-center mt-5" >
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    <li>
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => onPageClick(currentPage - 1)}
                            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Before
                        </button>
                    </li>
                    {pages.map((page: number, index: number) => (
                        <li key={index}>
                            <button
                                type="button"
                                onClick={() => onPageClick(page)}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >{page}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            disabled={currentPage >= pages.length}
                            onClick={() => onPageClick(currentPage + 1)}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination