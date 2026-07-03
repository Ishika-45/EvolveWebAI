const { makeAICall, DEFAULT_MODEL } = require("../config/ai");

const generateText = async (prompt, options = {}) => {
  return await makeAICall(
    [
      {
        role: "system",
        content: options.system || "You are an expert AI assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    options
  );
};

const generateJson = async (prompt) => {
  const result = await generateText(prompt, {
    temperature: 0.7,
  });

  try {
    return JSON.parse(
      result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    );
  } catch {
    return null;
  }
};

module.exports = {
  generateText,
  generateJson,
  DEFAULT_MODEL,
};