import apiClient from "./api";

const csrf = async () => {
  await apiClient.get('/csrf')
}

export const login = async (email, password) => {
  await csrf()
  return await apiClient.post('/login', {
    email,
    password
  })
}

export const register = async (data) => {
  await csrf()
  return await apiClient.post('/register', data)
}

export const checkAuth = async (token) => {
  return await apiClient.get('/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
