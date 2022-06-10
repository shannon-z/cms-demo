import request from './request'

export const registerApi = pramas => request.post('/register', pramas)

export const loginApi = params => request.post('/login', params)

