import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ResumeData } from '@/types/resume';

interface ResumeState {
  data: ResumeData;
  selectedTemplate: string;
  isLoading: boolean;
  isDarkMode: boolean;
  onboardingComplete: boolean;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData['personalInfo']> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'UPDATE_EXPERIENCE'; payload: ResumeData['experience'] }
  | { type: 'UPDATE_EDUCATION'; payload: ResumeData['education'] }
  | { type: 'UPDATE_SKILLS'; payload: ResumeData['skills'] }
  | { type: 'UPDATE_PROJECTS'; payload: ResumeData['projects'] }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'LOAD_DATA'; payload: ResumeData }
  | { type: 'RESET_DATA' };

const initialData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

const initialState: ResumeState = {
  data: initialData,
  selectedTemplate: 'modern',
  isLoading: false,
  isDarkMode: false,
  onboardingComplete: false,
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload },
        },
      };
    case 'UPDATE_SUMMARY':
      return {
        ...state,
        data: { ...state.data, summary: action.payload },
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        data: { ...state.data, experience: action.payload },
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        data: { ...state.data, education: action.payload },
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        data: { ...state.data, skills: action.payload },
      };
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        data: { ...state.data, projects: action.payload },
      };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true };
    case 'LOAD_DATA':
      return { ...state, data: action.payload };
    case 'RESET_DATA':
      return { ...state, data: initialData };
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (experience: ResumeData['experience']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateProjects: (projects: ResumeData['projects']) => void;
  setTemplate: (templateId: string) => void;
  toggleDarkMode: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetResumeData: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Auto-save functionality
  useEffect(() => {
    const saveData = () => {
      localStorage.setItem('resumeData', JSON.stringify(state.data));
      localStorage.setItem('resumeSettings', JSON.stringify({
        selectedTemplate: state.selectedTemplate,
        isDarkMode: state.isDarkMode,
        onboardingComplete: state.onboardingComplete,
      }));
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [state]);

  // Load data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    const savedSettings = localStorage.getItem('resumeSettings');

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: data });
      } catch (error) {
        console.error('Failed to load saved resume data:', error);
      }
    }

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.selectedTemplate) {
          dispatch({ type: 'SET_TEMPLATE', payload: settings.selectedTemplate });
        }
        if (settings.isDarkMode) {
          dispatch({ type: 'TOGGLE_DARK_MODE' });
        }
        if (settings.onboardingComplete) {
          dispatch({ type: 'COMPLETE_ONBOARDING' });
        }
      } catch (error) {
        console.error('Failed to load saved settings:', error);
      }
    }
  }, []);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info });
  };

  const updateSummary = (summary: string) => {
    dispatch({ type: 'UPDATE_SUMMARY', payload: summary });
  };

  const updateExperience = (experience: ResumeData['experience']) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: experience });
  };

  const updateEducation = (education: ResumeData['education']) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: education });
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    dispatch({ type: 'UPDATE_SKILLS', payload: skills });
  };

  const updateProjects = (projects: ResumeData['projects']) => {
    dispatch({ type: 'UPDATE_PROJECTS', payload: projects });
  };

  const setTemplate = (templateId: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    document.documentElement.classList.toggle('dark');
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('resumeData', JSON.stringify(state.data));
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(saved) });
    }
  };

  const resetResumeData = () => {
    dispatch({ type: 'RESET_DATA' });
    // Also clear from localStorage
    localStorage.removeItem('resumeData');
  };

  return (
    <ResumeContext.Provider
      value={{
        state,
        dispatch,
        updatePersonalInfo,
        updateSummary,
        updateExperience,
        updateEducation,
        updateSkills,
        updateProjects,
        setTemplate,
        toggleDarkMode,
        saveToLocalStorage,
        loadFromLocalStorage,
        resetResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}