import { useState, useCallback } from 'react';
import { AIRequest, AIResponse } from '@/types/resume';

// Mock AI responses for demonstration
// In production, this would connect to OpenAI API
const mockAIResponses = {
  'bullet-points': {
    'software engineer': [
      'Developed scalable web applications serving 10,000+ users',
      'Implemented RESTful APIs using Node.js and Express framework',
      'Optimized database queries resulting in 40% performance improvement',
      'Collaborated with cross-functional teams using Agile methodologies',
      'Mentored junior developers and conducted code reviews',
    ],
    'product manager': [
      'Led product strategy and roadmap for flagship mobile application',
      'Coordinated with engineering teams to deliver features on schedule',
      'Analyzed user feedback and metrics to drive product improvements',
      'Managed stakeholder communications and project timelines',
      'Increased user engagement by 25% through data-driven decisions',
    ],
    'marketing manager': [
      'Developed and executed multi-channel marketing campaigns',
      'Managed social media presence across 5+ platforms',
      'Increased brand awareness by 35% through strategic partnerships',
      'Analyzed campaign performance and optimized for better ROI',
      'Led team of 3 marketing specialists and coordinated projects',
    ],
  },
  summary: {
    'software engineer': 'Passionate software engineer with 5+ years of experience building scalable web applications and leading development teams. Expertise in React, Node.js, and cloud technologies with a focus on delivering high-quality solutions.',
    'product manager': 'Results-driven product manager with expertise in translating business requirements into technical solutions. Proven track record of launching successful products and driving user growth through data-driven decision making.',
    'marketing manager': 'Creative marketing professional with extensive experience in digital marketing, brand management, and campaign optimization. Skilled at developing comprehensive strategies that drive engagement and revenue growth.',
  },
  skills: {
    'software engineer': ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'Agile'],
    'product manager': ['Product Strategy', 'User Research', 'Data Analysis', 'Agile', 'Jira', 'Figma', 'SQL'],
    'marketing manager': ['Digital Marketing', 'SEO/SEM', 'Social Media', 'Google Analytics', 'Content Strategy', 'Adobe Creative Suite'],
  },
};

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(async (request: AIRequest): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const contextKey = request.jobTitle?.toLowerCase() || 'software engineer';
      
      let suggestions: string[] = [];

      switch (request.type) {
        case 'bullet-points':
          suggestions = mockAIResponses['bullet-points'][contextKey as keyof typeof mockAIResponses['bullet-points']] || 
                       mockAIResponses['bullet-points']['software engineer'];
          break;
        case 'summary':
          suggestions = [mockAIResponses.summary[contextKey as keyof typeof mockAIResponses.summary] || 
                        mockAIResponses.summary['software engineer']];
          break;
        case 'skills':
          suggestions = mockAIResponses.skills[contextKey as keyof typeof mockAIResponses.skills] || 
                       mockAIResponses.skills['software engineer'];
          break;
      }

      return {
        suggestions: suggestions.slice(0, 5),
        generated: true,
      };
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      return {
        suggestions: [],
        generated: false,
      };
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