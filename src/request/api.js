import request from './request'

export const registerApi = pramas => request.post('/register', pramas)

export const loginApi = params => request.post('/login', params)

export const getArticleListApi = params => request.get('/article', {params})

export const ArticleSearchApi = (id) => request.get(`/article/${id}`)

export const ArticleAddApi = (params) => request.post('/article/add', params)

export const ArticleUpdateApi = (params) => request.put('/article/update', params)

export const ArticleDelApi = (params) => request.post('/article/remove', params)