const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDYKxaeOVGRFLIEg-8ZknZ7VXdMudWa490"); 

router.post('/', async (req, res) => {
  try {
    const { courseId, day, task_scenario, answer_text } = req.body;

    if (!courseId || !task_scenario || !answer_text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const roleParams = {
      'data-science': "Analytical depth, statistical correctness, and data-driven logic.",
      'web-development': "Semantic code structure, responsive design principles, and modern API/Logic handling.",
      'ui-ux': "User-centric thinking, visual hierarchy, accessibility, and usability standards."
    };

    const selected_params = roleParams[courseId] || "General Professional Competence";

    const prompt = `
    **Role**: You are an elite Industry Expert and Senior Technical Interviewer for a 7-day career simulation platform. Your goal is to evaluate a candidate for the ${courseId} track.

    **Evaluation Task**:
    Track: ${courseId}
    Day: ${day}
    Task Scenario: ${task_scenario}
    Candidate's Text Response: ${answer_text}
    Role-Specific Criteria: ${selected_params}
    
    **Strict Grading & Anti-Cheat Policy**:
    - **Garbage Filter**: If the input is gibberish (e.g., 'asdfg', 'abc', random letters), entirely unrelated to the task, empty, or highly unprofessional, you MUST assign a score of 0.
    - **Feedback Tone**: For poor or low-effort responses, provide a blunt reality check: "You need to work a lot on your skills. This is a professional platform; please provide a serious and technical response." For good responses, be encouraging but critical of missing details.

    **Output Format**:
    Return ONLY a valid JSON object with the following structure (do NOT wrap it in markdown block quotes like \`\`\`json):
    {
      "score": [Integer 0-100], 
      "strength": "Brief sentence about what they did right.",
      "weakness": "Brief sentence about what is missing or wrong.",
      "suggestion": "Professional advice or a reality check for low-effort inputs."
    }

    **Tone**: Professional, critical, and industry-oriented. No conversational fillers.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    
    // Clean up potential markdown formatting
    if (rawText.includes('\`\`\`json')) {
        rawText = rawText.split('\`\`\`json')[1].split('\`\`\`')[0].trim();
    } else if (rawText.includes('\`\`\`')) {
        rawText = rawText.split('\`\`\`')[1].split('\`\`\`')[0].trim();
    }

    const parsedResponse = JSON.parse(rawText);
    
    // Safety check fallback
    if (typeof parsedResponse.score !== 'number') {
        parsedResponse.score = 60; // Fallback score
    }

    res.json(parsedResponse);
  } catch (error) {
    console.error('LLM Evaluation Error:', error);
    res.status(500).json({ error: 'Failed to evaluate response', details: error.message });
  }
});

module.exports = router;
