import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  Briefcase,
  GraduationCap,
  Code
} from 'lucide-react';

const features = [
  { icon: Sparkles, text: 'AI-Powered Content' },
  { icon: FileText, text: 'Professional Templates' },
  { icon: Download, text: 'Instant PDF Export' },
  { icon: Shield, text: 'ATS-Optimized' }
];

const stats = [
  { number: '50K+', label: 'Resumes Created' },
  { number: '95%', label: 'Success Rate' },
  { number: '4.9★', label: 'User Rating' },
  { number: '24/7', label: 'AI Support' }
];

const mockResumeData = {
  name: 'Sarah Johnson',
  title: 'Senior Software Engineer',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Experienced software engineer with 8+ years developing scalable web applications...',
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      duration: '2021 - Present',
      achievements: [
        'Led development of microservices architecture serving 1M+ users',
        'Reduced application load time by 40% through optimization',
        'Mentored 5 junior developers and established coding standards'
      ]
    }
  ],
  skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript']
};

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const demoSteps = [
    'Adding personal information...',
    'Generating AI-powered summary...',
    'Optimizing work experience...',
    'Suggesting relevant skills...',
    'Creating professional layout...',
    'Exporting to PDF...'
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (showDemo) {
      const text = mockResumeData.summary;
      let index = 0;
      const timer = setInterval(() => {
        setTypedText(text.slice(0, index));
        index++;
        if (index > text.length) {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [showDemo]);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setShowDemo(true);
    setCurrentStep(0);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ResumeBuilder Pro</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Features
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Templates
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Pricing
          </Button>
          <Button className="bg-white text-blue-900 hover:bg-gray-100">
            Start for free
          </Button>
        </motion.div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-6">
                <Sparkles className="h-3 w-3 mr-1" />
                NEW: AI-Powered Resume Generation
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              Your career is
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                your canvas.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-100 leading-relaxed max-w-lg"
            >
              Create stunning, ATS-optimized resumes with AI-powered content generation. 
              Land your dream job with professional templates and intelligent suggestions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                Start building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={handlePlayDemo}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-blue-100">
                  <feature.icon className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              {/* Demo Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">ResumeBuilder Pro</div>
              </div>

              {/* Demo Content */}
              <div className="p-6 space-y-6">
                <AnimatePresence mode="wait">
                  {!showDemo ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                      <p className="text-gray-300 mb-4">See ResumeBuilder Pro in action</p>
                      <Button 
                        onClick={handlePlayDemo}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Demo
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="demo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      {/* Progress Steps */}
                      <div className="space-y-2">
                        {demoSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                              opacity: index <= currentStep ? 1 : 0.3,
                              x: 0 
                            }}
                            className="flex items-center space-x-3"
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              index < currentStep 
                                ? 'bg-green-500' 
                                : index === currentStep 
                                ? 'bg-blue-500' 
                                : 'bg-gray-600'
                            }`}>
                              {index < currentStep ? (
                                <CheckCircle className="h-4 w-4 text-white" />
                              ) : (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <span className={`text-sm ${
                              index <= currentStep ? 'text-white' : 'text-gray-500'
                            }`}>
                              {step}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Mock Resume Preview */}
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">SJ</span>
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{mockResumeData.name}</h3>
                              <p className="text-blue-200 text-sm">{mockResumeData.title}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                              <span>📧 {mockResumeData.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                              <span>📍 {mockResumeData.location}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-white font-medium text-sm">Professional Summary</h4>
                            <p className="text-gray-300 text-xs leading-relaxed">
                              {typedText}
                              <span className="animate-pulse">|</span>
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-white font-medium text-sm">Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {mockResumeData.skills.map((skill, index) => (
                                <motion.span
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded"
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex items-center space-x-2 text-blue-200 text-sm">
          <span>Scroll to explore features</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="h-4 w-4 rotate-90" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}