interface StatusProps {
    status: string;
    onClick: () => void;
    active: boolean
}

const StatusTabButton = (props: StatusProps) => {
    const { status, onClick, active } = props
    let className
    if (active === true) {
        className = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
    } else {
        className = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
    }


    return (
        <div>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2">
                    <button
                        onClick={onClick}
                        type="button"
                        className={className}>
                        {status}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default StatusTabButton;