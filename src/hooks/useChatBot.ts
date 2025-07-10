import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { ResumeData } from '@/types/resume';

interface ChatBotResponse {
  message: string;
  suggestions?: string[];
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export function useChatBot() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string, resumeData: ResumeData): Promise<ChatBotResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const resumeContext = generateResumeContext(resumeData);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI resume assistant helping users improve their resumes and advance their careers. You have access to the user's current resume data and should provide specific, actionable advice.

            Current Resume Context:
            ${resumeContext}
            
            Provide helpful, specific advice and always include 2-4 follow-up suggestions that the user might want to explore next. Keep responses conversational but professional.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 400,
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content || '';
      
      // Generate contextual suggestions based on the response
      const suggestions = generateSuggestions(message, resumeData);

      return {
        message: content,
        suggestions
      };
    } catch (err: any) {
      console.error('OpenAI API Error:', err);
      setError(err.message || 'Failed to get response. Please try again.');
      
      // Fallback to mock response
      return getFallbackChatResponse(message, resumeData);
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

function generateResumeContext(resumeData: ResumeData): string {
  const context = [];
  
  if (resumeData.personalInfo.firstName) {
    context.push(`Name: ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`);
  }
  
  if (resumeData.experience.length > 0) {
    context.push(`Current/Recent Role: ${resumeData.experience[0].position} at ${resumeData.experience[0].company}`);
    context.push(`Total Experience Entries: ${resumeData.experience.length}`);
  }
  
  if (resumeData.education.length > 0) {
    context.push(`Education: ${resumeData.education[0].degree} in ${resumeData.education[0].field}`);
  }
  
  if (resumeData.skills.length > 0) {
    context.push(`Skills Count: ${resumeData.skills.length} (${resumeData.skills.slice(0, 5).map(s => s.name).join(', ')}...)`);
  }
  
  if (resumeData.projects.length > 0) {
    context.push(`Projects: ${resumeData.projects.length} listed`);
  }
  
  if (resumeData.summary) {
    context.push(`Has Professional Summary: Yes (${resumeData.summary.length} characters)`);
  }
  
  return context.join('\n');
}

function generateSuggestions(message: string, resumeData: ResumeData): string[] {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('summary')) {
    return [
      'Make it more specific to my industry',
      'Add quantifiable achievements',
      'Include my key skills',
      'Review examples of great summaries'
    ];
  }
  
  if (lowerMessage.includes('bullet') || lowerMessage.includes('experience')) {
    return [
      'Use stronger action verbs',
      'Add specific metrics and numbers',
      'Focus on achievements, not duties',
      'Tailor to specific job roles'
    ];
  }
  
  if (lowerMessage.includes('skill')) {
    return [
      'Show me trending skills in my industry',
      'Suggest technical skills to learn',
      'Help me organize my skills better',
      'What soft skills should I highlight?'
    ];
  }
  
  if (lowerMessage.includes('career') || lowerMessage.includes('advice')) {
    return [
      'How can I advance in my current role?',
      'What skills should I develop next?',
      'Help me identify career opportunities',
      'Review my career progression'
    ];
  }
  
  return [
    'Review my entire resume',
    'Help me prepare for interviews',
    'Suggest improvements for ATS optimization',
    'Give me industry-specific advice'
  ];
}

function getFallbackChatResponse(message: string, resumeData: ResumeData): ChatBotResponse {
  const responses = [
    "I'd be happy to help with your resume! While I'm currently using demo responses, I can still provide guidance on improving your professional summary, work experience, and skills.",
    "Great question! I can assist with resume writing best practices, even though I'm in demo mode. What specific section would you like to focus on?",
    "I'm here to help optimize your resume! Although I'm using sample responses right now, I can guide you through improving each section of your resume."
  ];
  
  return {
    message: responses[Math.floor(Math.random() * responses.length)],
    suggestions: [
      'Help me improve my summary',
      'Review my work experience',
      'Suggest better skills',
      'Give me general resume tips'
    ]
  };
}