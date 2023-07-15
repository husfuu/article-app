interface ArticleSecProps {
    id: number
    title: string
    category: string
    content: string
}

const ArticleSec = (props: ArticleSecProps) => {
    const { id, title, category, content } = props

    const url = `/preview/${id}`;

    return (
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    category: {category}
                </span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href={url}>{title}</a></h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{content}</p>
        </article>
    )
}


export default ArticleSec