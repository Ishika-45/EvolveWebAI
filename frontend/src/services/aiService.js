import api from "./api"

export const analyzeIdea = async (projectId, idea) => {
  const res = await api.post("/ai/analyze-idea", {
    projectId,
    idea,
  })

  return res.data.data
}

export const evolveIdea = async (projectId, idea) => {
  const res = await api.post("/ai/evolve-idea", {
    projectId,
    idea,
  })

  return res.data.data
}

export const generateBlueprint = async (projectId, idea) => {
  const res = await api.post("/ai/generate-blueprint", {
    projectId,
    idea,
  })

  return res.data.data
}