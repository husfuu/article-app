import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { getPostById, setUpdatePost } from "../../services/article"
import StatusForm from "./statusForm"
import Header from "../components/organisms/header"

interface ArticleStateTypes {
    id: number
    title: string
    category: string
    content: string
    status: string
}


export default function EditArticle() {
    const { query, isReady } = useRouter()
    const [article, setArticle] = useState<ArticleStateTypes>({
        id: 0,
        title: "",
        category: "",
        content: "",
        status: ""
    })
    const router = useRouter();
    const getArticleById = useCallback(async (id: number) => {
        const data = await getPostById(id)
        setArticle(data)
    }, [])


    const onStatusChange = (data: string) => {
        setArticle({
            ...article,
            status: data
        })
    }

    const onSubmit = async () => {
        const data = {
            title: article.title,
            category: article.category,
            content: article.content,
            status: article.status
        }
        const response = await setUpdatePost(article.id, data)
        router.push("/")
    }

    useEffect(() => {
        if (isReady) {
            const articleId = Number(query.id); // Use Number to convert the string to a number
            getArticleById(articleId);
            // const articleId = query.id ?? 0; // Replace 0 with any default number value you want
            // getArticleById(articleId);
            // getArticleById(query.id)
        }
    }, [isReady])

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <Header />
                    <h4 className="mb-4 text-1xl lg:text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Edit Article
                    </h4>
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form action="" className="space-y-4">
                            <div>
                                <label className="sr-only" htmlFor="title">Title</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Title"
                                    type="text"
                                    id="title"
                                    value={article.title}
                                    onChange={(event) => setArticle({
                                        ...article,
                                        title: event.target.value
                                    })}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" htmlFor="category">Category</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Category"
                                        type="text"
                                        id="category"
                                        value={article.category}
                                        onChange={(event) => setArticle({
                                            ...article,
                                            category: event.target.value
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                                <StatusForm
                                    label="publish"
                                    value="publish"
                                    active={article.status === 'publish'}
                                    option="publish"
                                    id="1"
                                    onChange={(event) => onStatusChange(event.target.value)}
                                />
                                <StatusForm
                                    label="draft"
                                    value="draft"
                                    active={article.status === 'draft'}
                                    option="draft"
                                    id="2"
                                    onChange={(event) => onStatusChange(event.target.value)}
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="content">Content</label>

                                <textarea
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Content"
                                    rows={8}
                                    id="content"
                                    value={article.content}
                                    onChange={(event) => setArticle({
                                        ...article,
                                        content: event.target.value
                                    })}
                                ></textarea>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                    onClick={onSubmit}
                                >
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}