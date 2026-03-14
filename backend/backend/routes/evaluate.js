const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDYKxaeOVGRFLIEg-8ZknZ7VXdMudWa490"); 

// --- Developer Mock Fallback ---
const getMockResponse = (text) => {
  const wordCount = text?.trim().split(/\s+/).length || 0;
  
  const isInvalid = !text || text.length < 10 || /^(.)\1+$/.test(text.replace(/\s/g, ''));
  
  if (isInvalid) {
    return {
      career_readiness_score: 0,
      overall_rating_out_of_10: 0,
      level: "Beginner",
      skill_scores: {
        technical_knowledge: 0,
        problem_solving: 0,
        communication: 0,
        teamwork: 0,
        industry_awareness: 0,
        learning_ability: 0
      },
      strengths: [],
      improvement_areas: ["Communication", "Technical Depth"],
      feedback: "The response provided was insufficient for a professional evaluation.",
      recommendations: ["Provide a detailed response", "Use industry terminology"]
    };
  }

  const score = Math.min(Math.round(wordCount / 5) + 40, 85);
  return {
    career_readiness_score: score,
    overall_rating_out_of_10: Math.round(score / 10),
    level: "Developing",
    skill_scores: {
      technical_knowledge: Math.min(Math.round(wordCount / 10) + 45, 90),
      problem_solving: Math.min(Math.round(wordCount / 12) + 50, 85),
      communication: Math.min(Math.round(wordCount / 15) + 40, 80),
      teamwork: 60,
      industry_awareness: 50,
      learning_ability: 75
    },
    strengths: [
      "Good effort in participation",
      "Clear attempt at task requirements",
      "Foundational understanding"
    ],
    improvement_areas: [
      "Technical depth in explanations",
      "Use of industry-standard frameworks",
      "Contextual awareness of edge cases"
    ],
    feedback: "The candidate demonstrates a solid foundation but needs to focus on technical specifics and professional terminology to move to the next level.",
    recommendations: [
      "Study advanced documentation for your track",
      "Build a portfolio project targeting this specific skill",
      "Practice explaining technical concepts simply"
    ]
  };
};

router.post('/', async (req, res) => {
  const { courseId, day, task_scenario, answer_text } = req.body;

  if (!courseId || !task_scenario || !answer_text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hasValidKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.startsWith("AIza");
    
    if (!hasValidKey && !process.env.GEMINI_API_KEY) {
       console.log("ℹ️ No Gemini API Key found. Using Mock Fallback.");
       return res.json(getMockResponse(answer_text));
    }

    const prompt = `
    Role: Senior Technical Lead and Industry Expert for the ${courseId} career track.
    Task Scenario: ${task_scenario}
    Candidate's Assessment Response: ${answer_text}

    Your task is to analyze the candidate's response and generate a structured career readiness report.
    
    Responsibilities:
    1. Skill Evaluation: Analyze responses and score (0-100) in: Technical Knowledge, Problem Solving, Communication, Teamwork, Industry Awareness, Learning Ability.
    2. Strength Identification: Identify top 3 technical or professional strengths.
    3. Weakness Identification: Identify up to 3 areas for improvement.
    4. Readiness Score: Generate an overall score (0-100) and a comprehensive rating out of 10.
    5. Classify Level: Beginner, Developing, Industry Ready, Advanced Candidate.
    6. Personalized Feedback: Objective, constructive, and supportive explanation.
    7. Actionable Recommendations: Suggest specific skills, projects, and resources.

    Output format (STRICT JSON ONLY):
    {
      "career_readiness_score": number,
      "overall_rating_out_of_10": number,
      "level": "Beginner" | "Developing" | "Industry Ready" | "Advanced Candidate",
      "skill_scores": {
        "technical_knowledge": number,
        "problem_solving": number,
        "communication": number,
        "teamwork": number,
        "industry_awareness": number,
        "learning_ability": number
      },
      "strengths": [string, string, string],
      "improvement_areas": [string, string, string],
      "feedback": string,
      "recommendations": [string, string, string]
    }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    
    rawText = rawText.replace(/```json|```/g, '').trim();
    const parsedResponse = JSON.parse(rawText);
    
    res.json(parsedResponse);

  } catch (error) {
    console.warn('⚠️ Evaluation Fallback Triggered:', error.message);
    res.json(getMockResponse(answer_text));
  }
});

module.exports = router;
