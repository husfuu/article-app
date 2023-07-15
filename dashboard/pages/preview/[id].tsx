import { useRouter } from "next/router"
import Navbar from "../components/molecules/navbar"
import { useCallback, useEffect, useState } from "react"
import { getPostById } from "../../services/article"

interface ArticleStateTypes {
    id: number
    title: string
    category: string
    content: string
    status: string
}

const Preview = () => {
    const { query, isReady } = useRouter()
    const [article, setArticle] = useState<ArticleStateTypes>({
        id: 0,
        title: "",
        category: "",
        content: "",
        status: ""
    })

    const getArticleById = useCallback(async (id: number) => {
        const data = await getPostById(id)
        setArticle(data)
    }, [])

    useEffect(() => {
        if (isReady) {
            const articleId = Number(query.id); // Use Number to convert the string to a number
            getArticleById(articleId);
        }
    }, [isReady])

    return (
        <div>
            <Navbar />
            <div className="bg-white dark:bg-gray-900">
                <div className="px-4 mx-auto max-w-screen-md lg:py-16 lg:px-12">
                    <div className="py-8">
                        <h2 className="text-center text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            {article.title}
                        </h2>
                        <h4 className="text-sm font-bold text-gray-900">
                            {article.category}
                        </h4>
                    </div>
                    <div className="mt-7 grid gap-8 lg:grid-cols-1">
                        {article.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview