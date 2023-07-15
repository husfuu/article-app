import { useRouter } from "next/router"
import { useState } from "react"
import { setCreatePost } from "../services/article"
import Header from "./components/organisms/header"

const ArticleForm = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('')
    const router = useRouter()
    const onStatusChange = (data: string) => {
        setStatus(data)
    }

    const onSubmit = async () => {
        const data = {
            title,
            category,
            content,
            status,
        };
        if (!title || !category || !content) {
            // TODO: add toast to handle error validation
            console.log("isi dulu")
        } else {
            const response = await setCreatePost(data)
            router.push("/")
        }
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <Header />
                <h4 className="mb-4 text-1xl lg:text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Add Article
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
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
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
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                            <div>
                                <input
                                    className="peer sr-only"
                                    id="option1"
                                    type="radio"
                                    name="option"
                                    value="publish"
                                    onChange={(event) => onStatusChange(event.target.value)}
                                />

                                <label
                                    htmlFor="option1"
                                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                >
                                    <span className="text-sm"> Publish </span>
                                </label>
                            </div>
                            <div>
                                <input
                                    className="peer sr-only"
                                    id="option2"
                                    type="radio"
                                    name="option"
                                    value="draft"
                                    onChange={(event) => onStatusChange(event.target.value)}
                                />

                                <label
                                    htmlFor="option2"
                                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                >
                                    <span className="text-sm"> Draft </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="content">Content</label>
                            <textarea
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Content"
                                rows={8}
                                id="content"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                onClick={onSubmit}
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div >
    )
}

export default ArticleForm