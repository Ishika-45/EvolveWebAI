const axios = require("axios");

const analyzeStartupIdea = async (idea) => {
  try {
    const prompt = `
You are a startup mentor and product strategist.

Analyze this startup idea and return JSON.

Idea:
${idea}

Return this structure:

{
 "analysis":{
   "ideaScore": number (1-10),
   "strengths":[string],
   "weaknesses":[string],
   "opportunities":[string]
 },
 "evolvedIdea": "Improved startup idea",

 "blueprint":{
   "problem":"problem statement",
   "targetAudience":"who will use this",
   "coreFeatures":["feature1","feature2","feature3"],
   "uniqueSellingProposition":"USP",
   "monetizationStrategy":"how it earns money",
   "futureScope":"future potential"
 },

 "websiteStructure":{
   "pages":[
      {
        "name":"Home",
        "sections":[
          {
            "sectionName":"Hero",
            "title":"Hero title",
            "description":"Hero description"
          }
        ]
      }
   ]
 }
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a startup expert and product builder.",
          },
          {
            role: "user",
            content: prompt,
          },
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

    // Clean markdown code blocks
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (parseError) {
      console.error("AI returned invalid JSON:", content);
      throw new Error("Failed to parse AI response");
    }

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    throw new Error("AI analysis failed");
  }
};

module.exports = analyzeStartupIdea;