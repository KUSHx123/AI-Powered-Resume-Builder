import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { AIRequest, AIResponse } from '@/types/resume';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(async (request: AIRequest): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      let prompt = '';
      
      switch (request.type) {
        case 'bullet-points':
          prompt = `Generate 5 professional bullet points for a ${request.jobTitle || 'professional'} role. Each bullet point should:
          - Start with a strong action verb
          - Include specific, quantifiable achievements when possible
          - Be concise and impactful
          - Focus on results and accomplishments
          
          Context: ${request.context}
          
          Return only the bullet points, one per line, without numbers or dashes.`;
          break;
          
        case 'summary':
          prompt = `Write a professional summary for a ${request.jobTitle || 'professional'} that is 2-3 sentences long. The summary should:
          - Highlight key strengths and experience
          - Include relevant skills and expertise
          - Mention career goals or value proposition
          - Be compelling and concise
          
          Context: ${request.context}
          
          Return only the summary paragraph.`;
          break;
          
        case 'skills':
          prompt = `Suggest 8-10 relevant skills for a ${request.jobTitle || 'professional'} role. Include a mix of:
          - Technical skills
          - Soft skills
          - Industry-specific competencies
          
          Context: ${request.context}
          
          Return only the skill names, one per line, without categories or descriptions.`;
          break;
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional resume writing assistant. Provide clear, concise, and impactful content that helps job seekers stand out."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content || '';
      const suggestions = content.split('\n').filter(line => line.trim().length > 0);

      return {
        suggestions,
        generated: true,
      };
    } catch (err: any) {
      console.error('OpenAI API Error:', err);
      setError(err.message || 'Failed to generate content. Please try again.');
      
      // Fallback to mock responses if API fails
      return getFallbackResponse(request);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generateContent,
    isLoading,
    error,
  };
}

// Fallback mock responses in case API fails
function getFallbackResponse(request: AIRequest): AIResponse {
  const mockResponses = {
    'bullet-points': [
      'Developed scalable web applications serving 10,000+ users',
      'Implemented RESTful APIs using modern frameworks',
      'Optimized database queries resulting in 40% performance improvement',
      'Collaborated with cross-functional teams using Agile methodologies',
      'Mentored junior developers and conducted code reviews',
    ],
    summary: 'Passionate professional with extensive experience in delivering high-quality solutions. Expertise in modern technologies with a focus on scalable applications and team leadership.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'Agile'],
  };

  return {
    suggestions: mockResponses[request.type] || [],
    generated: false,
  };
}