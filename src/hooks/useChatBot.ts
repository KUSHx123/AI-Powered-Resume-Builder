import { useState, useCallback } from 'react';
import { ResumeData } from '@/types/resume';

interface ChatBotRequest {
  message: string;
  resumeData: ResumeData;
}

interface ChatBotResponse {
  message: string;
  suggestions?: string[];
}

// Mock responses for demonstration
const mockResponses = {
  summary: {
    responses: [
      "I'd be happy to help improve your professional summary! A great summary should be 2-3 sentences that highlight your key strengths, experience level, and career goals. Based on your current experience, here's what I suggest:",
      "Your professional summary is the first thing recruiters see, so let's make it compelling! Here are some improvements I recommend:",
      "Let's craft a summary that showcases your unique value proposition. Based on your background, here's my suggestion:"
    ],
    suggestions: [
      "Make it more specific to my industry",
      "Add quantifiable achievements",
      "Include my key skills",
      "Make it more compelling"
    ]
  },
  bullets: {
    responses: [
      "Great question! Effective bullet points should start with strong action verbs and include quantifiable results when possible. Here are some suggestions for your experience:",
      "Let me help you write more impactful bullet points. The best ones follow the STAR method (Situation, Task, Action, Result). Here's what I recommend:",
      "Strong bullet points can make your resume stand out! They should be specific, measurable, and relevant to the job you're targeting. Here are some ideas:"
    ],
    suggestions: [
      "Use stronger action verbs",
      "Add specific metrics and numbers",
      "Focus on achievements, not just duties",
      "Tailor to specific job roles"
    ]
  },
  skills: {
    responses: [
      "Based on your experience and industry trends, here are some skills that would strengthen your resume:",
      "I can suggest relevant skills based on your background! Here are some that are currently in high demand for your field:",
      "Let's identify skills that will make you more competitive. Based on your experience, consider adding these:"
    ],
    suggestions: [
      "Show me trending skills in my industry",
      "Suggest technical skills to learn",
      "Help me organize my skills better",
      "What soft skills should I highlight?"
    ]
  },
  career: {
    responses: [
      "I'd be happy to provide career advice! Based on your resume, here are some recommendations for your professional growth:",
      "Looking at your background, here's some strategic career advice to help you advance:",
      "Your career trajectory looks promising! Here are some suggestions to accelerate your professional development:"
    ],
    suggestions: [
      "How can I advance in my current role?",
      "What skills should I develop next?",
      "Help me identify career opportunities",
      "Review my career progression"
    ]
  },
  general: {
    responses: [
      "I'm here to help with all aspects of your resume and career development! What specific area would you like to focus on?",
      "Great question! I can assist with resume writing, career advice, skill development, and job search strategies. What interests you most?",
      "I'm your AI career assistant! I can help improve your resume content, suggest skills, provide career guidance, and much more. How can I help you today?"
    ],
    suggestions: [
      "Review my entire resume",
      "Help me prepare for interviews",
      "Suggest improvements for ATS optimization",
      "Give me industry-specific advice"
    ]
  }
};

const getResponseCategory = (message: string): keyof typeof mockResponses => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('summary') || lowerMessage.includes('objective')) {
    return 'summary';
  }
  if (lowerMessage.includes('bullet') || lowerMessage.includes('experience') || lowerMessage.includes('achievement')) {
    return 'bullets';
  }
  if (lowerMessage.includes('skill') || lowerMessage.includes('technical') || lowerMessage.includes('competenc')) {
    return 'skills';
  }
  if (lowerMessage.includes('career') || lowerMessage.includes('advice') || lowerMessage.includes('growth') || lowerMessage.includes('development')) {
    return 'career';
  }
  
  return 'general';
};

const generateContextualResponse = (message: string, resumeData: ResumeData): ChatBotResponse => {
  const category = getResponseCategory(message);
  const categoryData = mockResponses[category];
  
  const randomResponse = categoryData.responses[Math.floor(Math.random() * categoryData.responses.length)];
  
  // Add contextual information based on resume data
  let contextualMessage = randomResponse;
  
  if (category === 'summary' && resumeData.experience.length > 0) {
    const latestJob = resumeData.experience[0];
    contextualMessage += ` Since you're working as a ${latestJob.position}, consider emphasizing your expertise in that area.`;
  }
  
  if (category === 'skills' && resumeData.skills.length > 0) {
    contextualMessage += ` I notice you already have ${resumeData.skills.length} skills listed. Let's build on those!`;
  }
  
  if (category === 'bullets' && resumeData.experience.length > 0) {
    contextualMessage += ` For your role at ${resumeData.experience[0]?.company}, focus on specific accomplishments and measurable results.`;
  }
  
  return {
    message: contextualMessage,
    suggestions: categoryData.suggestions
  };
};

export function useChatBot() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string, resumeData: ResumeData): Promise<ChatBotResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

      // Generate contextual response
      const response = generateContextualResponse(message, resumeData);
      
      return response;
    } catch (err) {
      setError('Failed to get response. Please try again.');
      return {
        message: 'Sorry, I encountered an error. Please try again.',
        suggestions: ['Try rephrasing your question', 'Check your connection', 'Contact support']
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    isLoading,
    error,
  };
}