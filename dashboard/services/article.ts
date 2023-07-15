import axios from "axios";
import { ArticleTypesForm } from "./data-types";
import callAPI from "../config/api";

export async function getPosts(page: number, perPage: number, status: string) {
    // const ROOT_API = process.env.NEXT_PUBLIC_API;
    // const API_VERSION = "api/v1"
    // const URL = "articles/1/4"
    const response = axios.get(`http://127.0.0.1:8080/api/v1/articles_status/${page}/${perPage}`);
    return (await response).data.data
}

export async function getPostByStatus(page: number, perPage: number, status: string) {
    let params
    if (status == "all") {
        params = ""
    } else {
        params = `?status=${status}`
    }

    const response = axios.get(`http://127.0.0.1:8080/api/v1/articles_status/${page}/${perPage}${params}`)
    const axiosResponse = (await response).data
    return axiosResponse
}

export async function getPostById(id: number) {
    const url = `http://127.0.0.1:8080/api/v1/articles/${id}`
    const response = axios.get(url)
    const axiosResponse = (await response).data
    return axiosResponse.data
}

export async function setCreatePost(data: ArticleTypesForm) {
    const url = "http://127.0.0.1:8080/api/v1/articles"

    callAPI({
        url,
        method: "POST",
        data
    })
}

export async function setUpdatePost(id: number, data: ArticleTypesForm) {
    const url = `http://127.0.0.1:8080/api/v1/articles/${id}`

    callAPI({
        url,
        method: "PUT",
        data
    })
}

export async function deletePost(id: number) {
    const url = `http://127.0.0.1:8080/api/v1/articles/${id}`
    callAPI({
        url,
        method: "DELETE",
    })
}