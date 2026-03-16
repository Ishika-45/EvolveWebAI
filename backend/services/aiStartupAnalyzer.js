const axios = require("axios");

const analyzeStartupIdea = async (idea) => {

  try {

    const prompt = `
You are a startup mentor.

Analyze this startup idea.

Idea:
${idea}

Return JSON:

{
 "analysis":{
   "ideaScore": number,
   "strengths":[],
   "weaknesses":[],
   "opportunities":[]
 },
 "evolvedIdea":"",
 "blueprint":{
   "problem":"",
   "targetAudience":"",
   "coreFeatures":[],
   "uniqueSellingProposition":"",
   "monetizationStrategy":"",
   "futureScope":""
 },
 "websiteStructure":{
   "sections":[]
 }
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: "You are a startup expert." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.error("AI ERROR:", error.response?.data || error.message);
    throw new Error("AI analysis failed");

  }
};

module.exports = analyzeStartupIdea;