import apiClient from "./api";

export const saveCompany = async(data, token) => {
  return await apiClient.post('/company', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
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
      'Authorization': `Bearer ${token}`
    }
  })
}

export const deleteArticle = async (id, token) => {
  return await apiClient.delete(`/article/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
}

export const saveReferences = async (data, token) => {
  return await apiClient.post('/reference', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
}

export const deleteReference = async (id, token) => {
  return await apiClient.delete(`/reference/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
}

export const saveCibles = async (data, token) => {
  return await apiClient.post('/cible', data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const saveImages = async (data, token) => {
  return await apiClient.post('/upload', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const saveDocs = async (data, token) => {
  return await apiClient.post('/document', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getProfile = async (token) => {
  return await apiClient.get('/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
}