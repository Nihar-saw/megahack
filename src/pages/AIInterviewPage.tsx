import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Bot, Send, User as UserIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock AI Interview Questions per track
const interviewQuestions: Record<string, string[]> = {
  'data-science': [
    "Welcome! To start, tell me about a time you handled a dataset with significant missing values. What was your strategy?",
    "That's insightful. Now, if your machine learning model performs well on training data but poorly on test data, what steps would you take to diagnose and fix the issue?",
    "Great. For our final question: How do you explain the results of a complex predictive model to non-technical stakeholders?"
  ],
  'web-development': [
    "Welcome to your final interview! Can you walk me through your process for optimizing the rendering performance of a React application?",
    "Interesting approach. Next, describe a challenging bug you faced related to asynchronous data fetching and how you resolved it.",
    "Finally, how do you ensure that the web applications you build are secure against common vulnerabilities like XSS or CSRF?"
  ],
  'ui-ux': [
    "Welcome! Let's begin. Describe a situation where user research completely changed your initial design assumptions. What did you learn?",
    "Good example. Moving on, what is your approach to maintaining visual hierarchy while accommodating a dense amount of information on a single screen?",
    "To wrap up: How do you hand off your high-fidelity designs to developers to ensure your vision is implemented accurately?"
  ],
  'default': [
    "Welcome! Tell me about a time you faced a significant professional challenge. How did you overcome it?",
    "How do you prioritize your work when dealing with multiple tight deadlines?",
    "Where do you see your professional skills adding the most value to our team?"
  ]
};

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isTyping?: boolean;
}

export const AIInterviewPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const courseId = searchParams.get('course') || 'default';
  
  const questions = interviewQuestions[courseId] || interviewQuestions.default;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 means interview hasn't started
  const [inputValue, setInputValue] = useState('');
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startInterview = () => {
    setIsInterviewing(true);
    setCurrentQuestionIndex(0);
    simulateAIResponse(questions[0]);
  };

  const simulateAIResponse = (text: string) => {
    // Add a temporary typing indicator message
    const typingMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: typingMsgId, sender: 'ai', text: '', isTyping: true }]);
    
    // Simulate thinking/typing delay based on message length
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === typingMsgId ? { ...msg, text: text, isTyping: false } : msg
      ));
    }, 1500 + Math.random() * 1000);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isFinished) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userText }]);

    // Determine next step
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // AI gives a brief acknowledgment, then asks next question
      const acknowledgments = ["Got it. ", "Thank you for sharing that. ", "I understand your approach. ", "Interesting perspective. "];
      const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
      simulateAIResponse(ack + questions[nextIndex]);
      
    } else {
      // Interview complete
      setIsFinished(true);
      simulateAIResponse("Thank you for your fantastic responses! The interview is now complete. I have everything I need to process your final evaluation score.");
      
      // Calculate and save mock score
      calculateAndSaveScore();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const calculateAndSaveScore = async () => {
    // Collect all user responses to grade
    const userResponses = messages.filter(m => m.sender === 'user').map(m => m.text).join(' ');
    
    // Simple heuristic: length + keywords
    const wordCount = userResponses.split(/\s+/).length;
    let base = Math.min(Math.round((wordCount / 100) * 100), 100);
    
    const keywords = ['analyze', 'strategy', 'implement', 'optimization', 'efficiency', 'solution', 'stakeholder', 'research', 'architecture', 'user', 'experience'];
    const bonus = keywords.filter(k => userResponses.toLowerCase().includes(k)).length * 5;
    
    const finalScore = Math.min(Math.max(base + bonus, 60), 100); // Floor of 60 for effort

    // Ensure backend supports this array
    const currentScores = user?.interviewScores?.[courseId] || [];
    const newScores = [...currentScores, finalScore];

    await updateProfile({
       interviewScores: {
         ...(user?.interviewScores || {}),
         [courseId]: newScores
       }
    });
  };

  return (
    <DashboardLayout hideNavigation={isInterviewing && !isFinished}>
      <div className="max-w-4xl mx-auto h-[85vh] flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <Bot className="w-8 h-8 text-white" />
               </div>
               <div>
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Technical Interview</h1>
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{courseId.replace('-', ' ')} Track</p>
               </div>
            </div>
            {isFinished && (
               <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl border border-emerald-100 font-bold text-sm">
                 <CheckCircle2 className="w-4 h-4" /> Interview Complete
               </div>
            )}
        </div>

        {/* Chat Interface */}
        <Card className="flex-1 flex flex-col overflow-hidden rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 bg-white">
          {!isInterviewing ? (
             <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
                   <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20" />
                   <Sparkles className="w-10 h-10 text-blue-600 relative z-10" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">Ready for your Final Interview?</h2>
                <p className="text-slate-500 font-medium max-w-md mb-10 leading-relaxed">
                  You will be asked 3 professional questions related to your track. Take your time, format your answers clearly, and demonstrate your industry readiness.
                </p>
                <Button 
                  onClick={startInterview}
                  className="px-10 py-5 bg-blue-600 text-white rounded-2xl text-lg font-black shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Start The Interview Now
                </Button>
             </div>
          ) : (
            <>
              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50 scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-sm ${msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'}`}>
                        {msg.sender === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      
                      <div className={`p-5 rounded-3xl ${
                        msg.sender === 'user' 
                          ? 'bg-slate-900 text-white rounded-tr-sm' 
                          : 'bg-white border border-slate-100 shadow-sm text-slate-800 rounded-tl-sm'
                      }`}>
                         {msg.isTyping ? (
                           <div className="flex items-center gap-1.5 h-6 px-2">
                             <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                             <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                             <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                           </div>
                         ) : (
                           <p className="text-[15px] leading-relaxed font-medium whitespace-pre-wrap">
                             {msg.text}
                           </p>
                         )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-slate-100">
                {isFinished ? (
                   <div className="flex flex-col items-center justify-center p-4">
                     <Button 
                       onClick={() => navigate('/dashboard')}
                       className="w-full max-w-md bg-slate-900 text-white py-4 rounded-xl font-black shadow-xl"
                     >
                       Return to Dashboard to View Results
                     </Button>
                   </div>
                ) : (
                  <div className="flex items-end gap-4 relative">
                    <textarea 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your professional response..."
                      className="flex-1 max-h-48 min-h-[60px] p-4 bg-slate-50 border border-slate-200 rounded-2xl rounded-br-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all resize-none text-slate-800 font-medium scrollbar-thin scrollbar-thumb-slate-300"
                      rows={1}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || messages[messages.length - 1]?.isTyping}
                      className="h-[60px] w-[60px] shrink-0 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-5 h-5 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
