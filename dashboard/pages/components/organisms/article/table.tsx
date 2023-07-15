import { useCallback, useEffect, useState } from "react";
import { deletePost, getPostByStatus } from "../../../../services/article";
import { ArticleTypes } from "../../../../services/data-types";
import StatusTabButton from "./statusTab";
import { useRouter } from "next/router";

const Table = () => {
    const [articleList, setArticleList] = useState([]);
    const [tab, setTab] = useState('all')
    const router = useRouter()

    const getArticleList = useCallback(async (value: string) => {
        const axiosResponse = await getPostByStatus(1, 10, value); // hard code for pagination | later fix it
        const data = axiosResponse.data
        setArticleList(data)
    }, []);

    useEffect(() => {
        getArticleList('all');
    }, []);

    const onTabClick = (value: string) => {
        setTab(value)
        getArticleList(value)
    }

    const handleDelete = (value: number) => {
        deletePost(value)
        window.location.reload();
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="px-4 mx-auto max-w-screen-xl lg:px-6" >
                <div className="mx-auto max-w-screen text-center">
                    <div>
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                            <StatusTabButton
                                onClick={() => onTabClick("all")}
                                status='All'
                                active={tab === "all"}
                            />
                            <StatusTabButton
                                onClick={() => onTabClick("publish")}
                                status='Publish'
                                active={tab === "publish"}
                            />
                            <StatusTabButton
                                onClick={() => onTabClick("draft")}
                                status='Draft'
                                active={tab === "draft"}
                            />
                            <StatusTabButton
                                onClick={() => onTabClick("trash")}
                                status='Trash'
                                active={tab === "trash"}
                            />
                        </ul>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {articleList ? articleList.map((item: ArticleTypes, index: number) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.category}
                                        </td>
                                        <td className="py-6 px-4">
                                            <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{item.status}</span>
                                        </td>
                                        <td className="py-6 px-4">
                                            <div className="flex">
                                                <a href={`/edit/${item.id}`}>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </div>
                                                </a>
                                                <button onClick={() => handleDelete(item.id)}>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Table;