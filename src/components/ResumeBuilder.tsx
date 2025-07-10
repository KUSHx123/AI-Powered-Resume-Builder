import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { SummaryForm } from '@/components/forms/SummaryForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { ResumePreview } from '@/components/ResumePreview';
import { useResume } from '@/contexts/ResumeContext';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen,
  CheckCircle
} from 'lucide-react';

const resumeSections = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: User,
    description: 'Your contact details and basic information',
    component: PersonalInfoForm
  },
  {
    id: 'summary',
    title: 'Professional Summary',
    icon: FileText,
    description: 'A brief overview of your career and goals',
    component: SummaryForm
  },
  {
    id: 'experience',
    title: 'Work Experience',
    icon: Briefcase,
    description: 'Your professional work history',
    component: ExperienceForm
  },
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    description: 'Your academic background',
    component: EducationForm
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: Code,
    description: 'Your technical and soft skills',
    component: SkillsForm
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderOpen,
    description: 'Your notable projects and achievements',
    component: ProjectsForm
  }
];

interface ResumeBuilderProps {
  showPreview: boolean;
}

export function ResumeBuilder({ showPreview }: ResumeBuilderProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const { state } = useResume();

  const calculateProgress = () => {
    const { personalInfo, summary, experience, education, skills, projects } = state.data;
    let completed = 0;
    let total = 6;

    if (personalInfo.firstName && personalInfo.lastName && personalInfo.email) completed++;
    if (summary.length > 0) completed++;
    if (experience.length > 0) completed++;
    if (education.length > 0) completed++;
    if (skills.length > 0) completed++;
    if (projects.length > 0) completed++;

    return (completed / total) * 100;
  };

  const isSectionCompleted = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return state.data.personalInfo.firstName && state.data.personalInfo.lastName && state.data.personalInfo.email;
      case 'summary':
        return state.data.summary.length > 0;
      case 'experience':
        return state.data.experience.length > 0;
      case 'education':
        return state.data.education.length > 0;
      case 'skills':
        return state.data.skills.length > 0;
      case 'projects':
        return state.data.projects.length > 0;
      default:
        return false;
    }
  };

  const progress = calculateProgress();

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto">
        <ResumePreview />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Build Your Resume
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Complete each section to create a professional resume
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Section Navigation */}
        <div className="lg:col-span-3">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {resumeSections.map((section) => {
                const isCompleted = isSectionCompleted(section.id);
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      isCompleted 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : isActive
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <section.icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          isActive 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {section.title}
                        </span>
                        {isCompleted && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Done
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-9">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {resumeSections.map((section) => {
              if (section.id === activeSection) {
                const Component = section.component;
                return <Component key={section.id} />;
              }
              return null;
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}