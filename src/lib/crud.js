import apiClient from "./api";

export const saveCompany = async(data, token) => {
  return await apiClient.post('/company', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const saveCatalogue = async (data, token) => {
  return await apiClient.post('/catalogue', data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const saveArticles = async (data, token) => {
  return await apiClient.post('/articles', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data;charset=utf-8;boundary='+Math.random().toString()
    }
  })
}

export const saveMarques = async (data, token) => {
  return await apiClient.post('/marques', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data;charset=utf-8;boundary='+Math.random().toString()
    }
  })
}

export const saveCibles = async (data, token) => {
  return await apiClient.post('/cibles', data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}