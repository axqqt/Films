const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const geminiKey = process.env.gemini_key;
const genAI = new GoogleGenerativeAI(geminiKey);

async function GeminiCall(req, res) {
  try {
    const data = req?.body?.data;
    if (!data) {
      return res.status(400).json({ alert: "Input not provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `What do you think about ${data}?`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    if (!response || !response.text) {
      return res.status(400).json({ alert: "No data retrieved" });
    }

    const text = response.text();

    if (text.length !== 0) {
      return res.status(200).json({ generatedText: text });
    } else {
      return res.status(400).json({ alert: "No data retrieved" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ alert: "Internal server error" });
  }
}

module.exports = { GeminiCall };
