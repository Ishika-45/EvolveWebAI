import api from "./api"

export const generateBlueprint = async (projectId) => {
  const res = await api.post(`/ai/generate-blueprint/${projectId}`)
  return res.data
}