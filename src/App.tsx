import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ResumeProvider } from '@/contexts/ResumeContext';
import { HeroSection } from '@/components/HeroSection';
import { Header } from '@/components/layout/Header';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { Onboarding } from '@/components/Onboarding';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ChatBot } from '@/components/ChatBot';
import { Toaster } from '@/components/ui/sonner';
import { useResume } from '@/contexts/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import './App.css';

function AppContent() {
  const { state } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(!state.onboardingComplete);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Set initial dark mode
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [state.isDarkMode]);

  const handleExportPDF = async () => {
    if (!state.data.personalInfo.firstName) {
      toast.error('Please fill in your personal information first');
      return;
    }

    setIsExporting(true);
    try {
      await generatePDF(state.data, state.selectedTemplate);
      toast.success('Resume exported successfully!');
    } catch (error) {
      toast.error('Failed to export resume. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleStartBuilding = () => {
    navigate('/builder');
  };

  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleOpenTemplates = () => {
    setShowTemplateSelector(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AnimatePresence mode="wait">
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <Onboarding onComplete={handleCompleteOnboarding} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showOnboarding && (
        <Routes>
          <Route 
            path="/" 
            element={<HeroSection onStartBuilding={handleStartBuilding} />} 
          />
          <Route 
            path="/builder" 
            element={
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Header
                    onExportPDF={handleExportPDF}
                    onTogglePreview={handleTogglePreview}
                    showPreview={showPreview}
                    onOpenTemplates={handleOpenTemplates}
                  />
                  
                  <main className="container mx-auto px-4 py-8">
                    <ResumeBuilder showPreview={showPreview} />
                  </main>
                </motion.div>
              </div>
            } 
          />
          <Route 
            path="/pricing" 
            element={
              <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-6 py-24">
                  <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
                    <p className="text-xl text-gray-600">Choose the perfect plan for your needs</p>
                  </div>
                  {/* Pricing content will be here */}
                  <div className="text-center">
                    <button 
                      onClick={() => navigate('/')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ← Back to Home
                    </button>
                  </div>
                </div>
              </div>
            } 
          />
        </Routes>
      )}

      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
      />

      <ChatBot />

      <Toaster position="top-right" />
      
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium">Generating PDF...</span>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;