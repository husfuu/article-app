import { useCallback, useEffect, useState } from "react"
import { getPostByStatus } from "../services/article";
import ArticleSec from "./components/molecules/blog_sec";
import { ArticlePreviewTypes } from "../services/data-types";
import Pagination from "./components/molecules/pagination";
import Header from "./components/organisms/header";

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1); // start in page 1
    const [postsPerPage, setPostsPerPage] = useState(4); // I set maximal every page has 4 article
    const [articles, setArticles] = useState([])
    const [total, setTotal] = useState(0)

    const getArticleList = useCallback(async (curPage: number, perPage: number) => {
        const axiosResponse = await getPostByStatus(curPage, perPage, "publish")
        const data = axiosResponse.data
        const totalData = axiosResponse.total
        setArticles(data)
        setTotal(totalData)
    }, [])

    useEffect(() => {
        getArticleList(currentPage, postsPerPage)
    }, [])

    const onPageClick = (page: number) => {
        setCurrentPage(page)
        getArticleList(page, postsPerPage)
    }

    return (
        <div>
            <div className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <Header />
                    <div className="grid gap-8 lg:grid-cols-1">
                        {articles ? articles.map((item: ArticlePreviewTypes, index: number) => (
                            <ArticleSec
                                key={index}
                                id={item.id}
                                title={item.title}
                                category={item.category}
                                content={item.content}
                            />
                        )) : null}
                    </div>

                    <Pagination
                        totalPosts={total}
                        postsPerPage={postsPerPage}
                        onPageClick={onPageClick}
                        currentPage={currentPage}
                    />

                </div>
            </div>
        </div>
    )
}

export default Blog