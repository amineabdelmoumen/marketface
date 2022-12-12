import apiClient from "./api";

export const saveCompany = async (data, token) => {
  return await apiClient.post("/company", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveCatalogue = async (data, token) => {
  return await apiClient.post("/catalogue", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveArticle = async (data, token) => {
  return await apiClient.post("/article", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteArticle = async (id, token) => {
  return await apiClient.delete(`/article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveReference = async (data, token) => {
  return await apiClient.post("/reference", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteReference = async (id, token) => {
  return await apiClient.delete(`/reference/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveCibles = async (data, token) => {
  return await apiClient.post("/cible", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveImages = async (data, token) => {
  return await apiClient.post("/upload", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const saveDocuments = async (data, token) => {
  return await apiClient.post("/document", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const saveDocs = async (data, token) => {
  return await apiClient.post("/upload/document", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProfile = async (token) => {
  return await apiClient.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTeam = async (token) => {
  return await apiClient.get("/team", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const AddMembre = async (data, token) => {
  console.log("addMembre");
  return await apiClient.post("/team", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sendMessage = async (data, token) => {
  return await apiClient.post("/messages/send", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMessages = async (token) => {
  return await apiClient.get("/conversations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getCatalogues = async (token) => {
  return await apiClient.get("/marketplace", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
