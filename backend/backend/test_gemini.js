const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDYKxaeOVGRFLIEg-8ZknZ7VXdMudWa490";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello, are you active?");
    console.log("RESPONSE:", result.response.text());
    console.log("STATUS: SUCCESS");
  } catch (err) {
    console.error("STATUS: FAILED");
    console.error("ERROR:", err.message);
  }
}

test();
