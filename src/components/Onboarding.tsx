import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/contexts/ResumeContext';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Palette, 
  ArrowRight, 
  ArrowLeft,
  Check 
} from 'lucide-react';

const onboardingSteps = [
  {
    title: 'Welcome to ResumeBuilder Pro',
    description: 'Create professional resumes with AI-powered content generation and beautiful templates.',
    icon: FileText,
    features: [
      'AI-powered content suggestions',
      'Professional templates',
      'Real-time preview',
      'PDF export'
    ]
  },
  {
    title: 'AI-Powered Content Generation',
    description: 'Let our AI help you write compelling bullet points, summaries, and skill suggestions.',
    icon: Sparkles,
    features: [
      'Industry-specific bullet points',
      'Professional summaries',
      'Skill recommendations',
      'Grammar and style optimization'
    ]
  },
  {
    title: 'Professional Templates',
    description: 'Choose from multiple professionally designed templates that adapt to your content.',
    icon: Palette,
    features: [
      'Modern layouts',
      'Customizable colors',
      'ATS-friendly formats',
      'Print-optimized designs'
    ]
  },
  {
    title: 'Export & Share',
    description: 'Export your resume as a high-quality PDF ready for job applications.',
    icon: Download,
    features: [
      'High-quality PDF export',
      'Print-ready formatting',
      'Auto-save functionality',
      'Multiple download options'
    ]
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { dispatch } = useResume();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    onComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-4xl w-full"
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-blue-600 scale-125'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </CardTitle>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentStepData.description}
            </p>
          </CardHeader>

          <CardContent className="pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-full">
                    <currentStepData.icon className="h-16 w-16 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {currentStepData.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-12">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {currentStep + 1} of {onboardingSteps.length}
                </span>
                <Button
                  variant="outline"
                  onClick={handleComplete}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Skip Tour
                </Button>
              </div>

              <Button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <span>
                  {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}