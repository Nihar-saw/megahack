const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDYKxaeOVGRFLIEg-8ZknZ7VXdMudWa490");

// --- Mock Interactivity Fallback ---
const getMockInterviewResponse = (messages, userPrompt) => {
  const messageCount = messages.filter(m => m.sender === 'user').length;
  
  if (messageCount >= 2) {
    return {
      text: "Thank you for those detailed answers. I've gathered enough information to assess your technical readiness. The interview is now complete!",
      isFinished: true
    };
  }

  const followUps = [
    "That's a solid point. Could you elaborate on how you'd handle edge cases in that scenario?",
    "Interesting. How would you communicate those technical decisions to a non-technical project manager?",
    "I see. What's your preferred tool or framework for that task, and why?"
  ];

  return {
    text: followUps[messageCount] || "Can you tell me more about your experience in this area?",
    isFinished: false
  };
};

router.post('/chat', async (req, res) => {
  const { courseId, messages, userPrompt } = req.body;

  if (!courseId || !userPrompt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hasValidKey = process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.startsWith("AIzaSyDYKxae");
    
    if (!hasValidKey) {
       console.log("ℹ️ No valid Gemini API Key found. Using Mock Interview Fallback.");
       return res.json(getMockInterviewResponse(messages, userPrompt));
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct Context
    const conversationHistory = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
    
    const prompt = `
    Role: Professional Technical Interviewer for ${courseId} track.
    Context: You are conducting a mock technical interview.
    
    Recent Conversation:
    ${conversationHistory}
    
    Candidate's Latest Response:
    ${userPrompt}
    
    Objective: 
    1. Acknowledge their response briefly.
    2. Ask exactly ONE follow-up question or transition to a new technical topic related to ${courseId}.
    3. If you have asked ~3-4 significant questions, conclude the interview politely.
    
    Rules:
    - Keep it professional and conversational.
    - If concluding, set "isFinished" to true in the JSON.
    
    Output: Return ONLY JSON: {
      "text": "Your response here...",
      "isFinished": boolean
    }
    `;

    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    rawText = rawText.replace(/```json|```/g, '').trim();
    const parsedResponse = JSON.parse(rawText);
    
    res.json(parsedResponse);

  } catch (error) {
    console.warn('⚠️ Interview Chat Fallback Triggered:', error.message);
    res.json(getMockInterviewResponse(messages, userPrompt));
  }
});

module.exports = router;
