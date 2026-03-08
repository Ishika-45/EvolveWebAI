import api from "./api"

// Get all projects
export const getProjects = async () => {
  const res = await api.get("/projects")
  return res.data
}

// Get single project
export const getProject = async (id) => {
  const res = await api.get(`/projects/${id}`)
  return res.data
}

// Create project
export const createProject = async (data) => {
  const res = await api.post("/projects/create", data)
  return res.data
}