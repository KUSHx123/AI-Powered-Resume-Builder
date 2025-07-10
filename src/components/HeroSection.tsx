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

interface HeroSectionProps {
  onStartBuilding: () => void;
}

export function HeroSection({ onStartBuilding }: HeroSectionProps) {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'features':
        scrollToSection('features-section');
        break;
      case 'templates':
        scrollToSection('templates-section');
        break;
      case 'pricing':
        // For now, scroll to pricing section. Later can be a separate page
        scrollToSection('pricing-section');
        break;
      case 'start':
        onStartBuilding();
        break;
    }
  };

  return (
    <div className="relative overflow-hidden" id="hero">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 min-h-screen">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        
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
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200"
            onClick={() => handleNavigation('features')}
          >
            Features
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200"
            onClick={() => handleNavigation('templates')}
          >
            Templates
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200"
            onClick={() => handleNavigation('pricing')}
          >
            Pricing
          </Button>
          <Button 
            className="bg-white text-blue-900 hover:bg-gray-100 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => handleNavigation('start')}
          >
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
                onClick={onStartBuilding}
              >
                Start building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/40 text-white hover:bg-white/20 hover:text-white hover:border-white/60 text-lg px-8 py-6 transition-all duration-200"
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

      {/* Features Section */}
      <section id="features-section" className="relative bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Powerful Features for Perfect Resumes
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to create, customize, and optimize your resume for any job application
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Content',
                description: 'Generate compelling bullet points, summaries, and skill suggestions tailored to your industry.',
                color: 'from-blue-500 to-purple-600'
              },
              {
                icon: FileText,
                title: 'Professional Templates',
                description: 'Choose from multiple ATS-optimized templates designed by career experts.',
                color: 'from-green-500 to-blue-600'
              },
              {
                icon: Download,
                title: 'Instant PDF Export',
                description: 'Download your resume as a high-quality PDF ready for job applications.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: Shield,
                title: 'ATS-Optimized',
                description: 'Ensure your resume passes through Applicant Tracking Systems successfully.',
                color: 'from-orange-500 to-red-600'
              },
              {
                icon: Zap,
                title: 'Real-time Preview',
                description: 'See your changes instantly with our live preview feature.',
                color: 'from-yellow-500 to-orange-600'
              },
              {
                icon: Users,
                title: 'Expert Guidance',
                description: 'Get personalized tips and suggestions from our AI career assistant.',
                color: 'from-teal-500 to-green-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates-section" className="relative bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Professional Templates
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Choose from our collection of professionally designed templates, each optimized for different industries and career levels
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Modern',
                description: 'Clean and contemporary design',
                color: 'from-blue-500 to-purple-600',
                popular: true
              },
              {
                name: 'Professional',
                description: 'Traditional corporate layout',
                color: 'from-gray-600 to-gray-800',
                popular: false
              },
              {
                name: 'Creative',
                description: 'Bold design for creative fields',
                color: 'from-pink-500 to-orange-500',
                popular: false
              },
              {
                name: 'Minimal',
                description: 'Clean, typography-focused',
                color: 'from-green-500 to-teal-600',
                popular: false
              }
            ].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {template.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-yellow-900">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
                  <div className="absolute inset-4 bg-white/90 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                      <div className="space-y-1 mt-4">
                        <div className="h-1 bg-gray-400 rounded"></div>
                        <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                        <div className="h-1 bg-gray-400 rounded w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleNavigation('start')}
            >
              Try All Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="relative bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Choose the plan that works best for you. All plans include our core features and AI assistance.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                period: 'forever',
                description: 'Perfect for getting started',
                features: [
                  '1 Resume',
                  'Basic Templates',
                  'PDF Export',
                  'Basic AI Assistance'
                ],
                popular: false,
                cta: 'Get Started'
              },
              {
                name: 'Pro',
                price: '$9',
                period: 'per month',
                description: 'Best for job seekers',
                features: [
                  'Unlimited Resumes',
                  'All Premium Templates',
                  'Advanced AI Features',
                  'Cover Letter Builder',
                  'Priority Support'
                ],
                popular: true,
                cta: 'Start Free Trial'
              },
              {
                name: 'Enterprise',
                price: '$29',
                period: 'per month',
                description: 'For teams and organizations',
                features: [
                  'Everything in Pro',
                  'Team Management',
                  'Custom Branding',
                  'Analytics Dashboard',
                  'Dedicated Support'
                ],
                popular: false,
                cta: 'Contact Sales'
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  onClick={() => handleNavigation('start')}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}