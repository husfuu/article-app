export interface ArticleTypes {
    id: number
    title: string
    category: string
    status: string
}

export interface ArticlePreviewTypes {
    id: number
    title: string
    category: string
    status: string
    content: string
}


export interface ArticleTypesForm {
    title: string
    category: string
    content: string
    status: string
}