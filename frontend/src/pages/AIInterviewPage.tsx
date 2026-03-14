import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Bot, Send, User as UserIcon, CheckCircle2, Video, VideoOff, Mic, MicOff, Sparkles, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';



interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isTyping?: boolean;
}

export const AIInterviewPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, updateProfile, issueCertificate } = useAuth();
  const courseId = searchParams.get('course') || 'default';
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // Video & Audio State
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Webcam Initialization
  useEffect(() => {
    if (isInterviewing && !isFinished) {
      const initWebcam = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } catch (err) {
          console.error("Error accessing webcam: ", err);
          setIsVideoEnabled(false);
        }
      };
      initWebcam();
    }

    return () => {
      // Cleanup stream on unmount or end
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isInterviewing, isFinished]);

  // Toggle Video/Audio functions
  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const startInterview = () => {
    setIsInterviewing(true);
    // Initial greeting from AI
    const greetings = [
      "Welcome! I'm your AI interviewer for today. Let's start by discussing your background. How did you get started in this field?",
      "Hello! Great to have you here. To begin, tell me about a project you've worked on that you're particularly proud of.",
      "Welcome to this technical session. I'm excited to hear about your experiences. To kick things off, what do you consider your greatest technical strength?"
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    simulateAIResponse(greeting);
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
    const updatedMessages: Message[] = [...messages, { id: Date.now().toString(), sender: 'user', text: userText }];
    setMessages(updatedMessages);

    // AI thinking state
    const typingMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingMsgId, sender: 'ai', text: '', isTyping: true }]);

    try {
      const res = await axios.post('http://localhost:5001/api/interview/chat', {
        courseId,
        messages: updatedMessages,
        userPrompt: userText
      });

      const { text, isFinished: interviewDone } = res.data;

      // Update AI message
      setMessages(prev => prev.map(msg => 
        msg.id === typingMsgId ? { ...msg, text: text, isTyping: false } : msg
      ));

      if (interviewDone) {
        setIsFinished(true);
        calculateAndSaveScore([...updatedMessages, { id: typingMsgId, sender: 'ai', text: text }]);
      }
    } catch (err) {
      console.error("AI Interview chat failed:", err);
      // Fallback behavior if API fails
      setMessages(prev => prev.map(msg => 
        msg.id === typingMsgId ? { ...msg, text: "I'm sorry, I'm having trouble processing that right now. Could you repeat that?", isTyping: false } : msg
      ));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const [evaluationFeedback, setEvaluationFeedback] = useState<{ 
    score: number, 
    logic: number, 
    effectivity: number, 
    time: number,
    aiRating?: number,
    strength: string, 
    weakness: string, 
    suggestion: string,
    explanation?: string
  } | null>(null);

  const calculateAndSaveScore = async (finalMessages?: Message[]) => {
    const messagesToGrade = finalMessages || messages;
    // Collect all user responses to grade
    const userResponses = messagesToGrade
      .filter(m => m.sender === 'user')
      .map((m, i) => `Response ${i + 1}: ${m.text}`)
      .join('\n\n');
    
    try {
      // Call centralized LLM evaluator
      const res = await axios.post('http://localhost:5001/api/evaluate', {
        courseId,
        type: 'interview',
        task_scenario: "Overall technical interview for " + courseId,
        answer_text: userResponses
      });

      const { score, logic, effectivity, time, strength, weakness, suggestion, explanation, aiRating } = res.data;
      const finalScore = score || 70;
      setEvaluationFeedback({ 
        score: finalScore, 
        logic: logic || 0, 
        effectivity: effectivity || 0, 
        time: time || 0, 
        aiRating,
        strength, 
        weakness, 
        suggestion,
        explanation
      });

      // Ensure backend supports this array
      const currentScores = user?.interviewScores?.[courseId] || [];
      const newScores = [...currentScores, finalScore];

      await updateProfile({
         interviewScores: {
           ...(user?.interviewScores || {}),
           [courseId]: newScores
         }
      });
    } catch (err) {
      console.error("Interview evaluation failed:", err);
    }
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
          {!isInterviewing ? (
            <Card className="flex-1 flex flex-col items-center justify-center p-12 text-center rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 bg-white">
               <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20" />
                  <Video className="w-10 h-10 text-blue-600 relative z-10" />
               </div>
               <h2 className="text-2xl font-black text-slate-900 mb-4">Ready for your Live Interview?</h2>
               <p className="text-slate-500 font-medium max-w-md mb-10 leading-relaxed">
                 You will be asked 3 professional questions related to your track. Ensure your camera and microphone are ready to demonstrate your industry readiness.
               </p>
               <Button 
                 onClick={startInterview}
                 className="px-10 py-5 bg-blue-600 text-white rounded-2xl text-lg font-black shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
               >
                 Allow Camera & Start
               </Button>
            </Card>
          ) : (
            <>
              {/* Left Column: Video Feeds */}
              <div className="w-full lg:w-5/12 flex flex-col gap-6">
                {/* AI Avatar Video (Simulated) */}
                <Card className="flex-1 bg-slate-900 rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center border-4 border-slate-800 min-h-[300px]">
                   {isFinished ? (
                      <div className="text-center p-6">
                         <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                         <p className="text-white font-black text-xl">Interview Completed</p>
                      </div>
                   ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        
                        {/* Simulated AI "Thinking" Visualization */}
                        <div className="relative z-0 w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-slate-900 to-black">
                           <div className="w-32 h-32 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative">
                              <div className={`absolute inset-0 border-4 border-blue-500 rounded-full transition-all duration-1000 ${messages.length > 0 && messages[messages.length - 1].isTyping ? 'animate-ping opacity-50' : 'opacity-10 scale-90'}`} />
                              <Bot className="w-16 h-16 text-blue-400" />
                           </div>
                           <p className="mt-8 text-blue-300 font-black tracking-widest uppercase text-xs">
                             {messages.length > 0 && messages[messages.length - 1].isTyping ? 'Analyzing & Typing...' : 'Active Listening'}
                           </p>
                        </div>

                        <div className="absolute bottom-6 left-6 z-20">
                          <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                            <Bot className="w-4 h-4 text-blue-400" />
                            <span className="text-white font-bold text-sm">AI Recruiter</span>
                          </div>
                        </div>
                      </>
                   )}
                </Card>

                {/* User Webcam Feed */}
                <Card className="h-64 bg-black rounded-[2rem] overflow-hidden relative shadow-lg border-2 border-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  
                  {isVideoEnabled ? (
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover transform scale-x-[-1]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
                      <VideoOff className="w-10 h-10 text-slate-500 mb-2" />
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Camera Disabled</p>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                       <UserIcon className="w-3 h-3 text-emerald-400" />
                       <span className="text-white font-bold text-xs">You</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                     <button 
                       onClick={toggleAudio}
                       className={`p-2 rounded-xl backdrop-blur-md border ${isAudioEnabled ? 'bg-black/50 border-white/10 text-white' : 'bg-red-500/80 border-red-500 text-white'}`}
                     >
                       {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                     </button>
                     <button 
                       onClick={toggleVideo}
                       className={`p-2 rounded-xl backdrop-blur-md border ${isVideoEnabled ? 'bg-black/50 border-white/10 text-white' : 'bg-red-500/80 border-red-500 text-white'}`}
                     >
                       {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                     </button>
                  </div>
                </Card>
              </div>

              {/* Right Column: Chat Interface */}
              <Card className="flex-1 flex flex-col bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden h-full">
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
                   <div className="flex flex-col items-center justify-center p-4 space-y-6 w-full">
                     {evaluationFeedback && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="w-full bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl"
                       >
                         <div className="flex items-center gap-3 mb-6">
                           <Sparkles className="w-6 h-6 text-blue-400" />
                           <h4 className="text-white font-black text-xl">Interview Performance</h4>
                           <div className="ml-auto flex flex-col items-end gap-1">
                              <span className="px-4 py-1 bg-blue-600 text-white rounded-2xl font-black text-sm">
                                 Score: {evaluationFeedback.score}%
                              </span>
                              {evaluationFeedback.aiRating && (
                                <span className="px-3 py-1 bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 rounded-lg font-black text-[10px] uppercase tracking-wider">
                                  AI Assistance: {evaluationFeedback.aiRating}/10
                                </span>
                              )}
                           </div>
                        </div>

                         {/* Metrics Grid */}
                         <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                               <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Logic</div>
                               <div className="text-xl font-black text-blue-400">{evaluationFeedback.logic}/10</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                               <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Effectivity</div>
                               <div className="text-xl font-black text-emerald-400">{evaluationFeedback.effectivity}/10</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                               <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Time</div>
                               <div className="text-xl font-black text-amber-400">{evaluationFeedback.time}/10</div>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                               <strong className="text-emerald-400 block mb-1 uppercase tracking-widest text-[10px]">Technical Strengths</strong>
                               <p className="text-emerald-100">{evaluationFeedback.strength}</p>
                            </div>
                            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl">
                               <strong className="text-rose-400 block mb-1 uppercase tracking-widest text-[10px]">Areas for Growth</strong>
                               <p className="text-rose-100">{evaluationFeedback.weakness}</p>
                            </div>
                            <div className="md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-2xl">
                               <strong className="text-blue-400 block mb-1 uppercase tracking-widest text-[10px]">Career Suggestion</strong>
                               <p className="text-slate-300">{evaluationFeedback.suggestion}</p>
                            </div>
                            {evaluationFeedback.explanation && (
                              <div className="md:col-span-2 bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-[1.5rem] mt-2">
                                <strong className="text-indigo-400 block mb-2 uppercase tracking-widest text-[10px]">Model Explanation & Strategy</strong>
                                <p className="text-indigo-100 text-[13px] leading-relaxed">{evaluationFeedback.explanation}</p>
                              </div>
                            )}
                         </div>
                       </motion.div>
                     )}
                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
                      <Button 
                        onClick={() => navigate('/dashboard')}
                        className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-xl font-black shadow-md hover:bg-slate-200 transition-all"
                      >
                        Return to Dashboard
                      </Button>
                      {!user?.certificates?.some(c => c.courseId === courseId) && (
                        <Button
                          onClick={async () => {
                            if (evaluationFeedback) {
                              await issueCertificate(courseId, evaluationFeedback.score, "Certified Professional");
                              navigate('/certificates');
                            }
                          }}
                          className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-black shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                        >
                          <Award className="w-5 h-5" /> Claim Certificate
                        </Button>
                      )}
                      {user?.certificates?.some(c => c.courseId === courseId) && (
                        <Button
                          onClick={() => navigate('/certificates')}
                          className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-black shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                        >
                          <Award className="w-5 h-5" /> View Certificate
                        </Button>
                      )}
                    </div>
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
              </Card>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
