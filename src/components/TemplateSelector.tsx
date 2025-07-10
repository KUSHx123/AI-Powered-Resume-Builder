import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useResume } from '@/contexts/ResumeContext';
import { Check, Palette, Sparkles } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with subtle accents',
    preview: '/api/placeholder/300/400',
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#10B981'
    },
    features: ['ATS-Friendly', 'Clean Layout', 'Professional']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional layout perfect for corporate environments',
    preview: '/api/placeholder/300/400',
    colors: {
      primary: '#1F2937',
      secondary: '#6B7280',
      accent: '#3B82F6'
    },
    features: ['Traditional', 'Corporate', 'Minimal']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design with creative elements for artistic fields',
    preview: '/api/placeholder/300/400',
    colors: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      accent: '#8B5CF6'
    },
    features: ['Creative', 'Colorful', 'Artistic']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design focusing on content over decoration',
    preview: '/api/placeholder/300/400',
    colors: {
      primary: '#000000',
      secondary: '#6B7280',
      accent: '#3B82F6'
    },
    features: ['Minimal', 'Clean', 'Typography-focused']
  }
];

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateSelector({ isOpen, onClose }: TemplateSelectorProps) {
  const { state, setTemplate } = useResume();

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Choose a Template</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <AnimatePresence>
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  state.selectedTemplate === template.id 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'hover:scale-105'
                }`}>
                  <CardContent className="p-0">
                    {/* Template Preview */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded shadow-sm h-full p-3 text-xs">
                          {/* Mock resume content */}
                          <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                            <div className="h-4 bg-gray-900 dark:bg-white rounded mb-1" style={{ width: '60%' }} />
                            <div className="h-2 bg-gray-600 dark:bg-gray-400 rounded" style={{ width: '80%' }} />
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-400 dark:bg-gray-600 rounded" style={{ width: '100%' }} />
                            <div className="h-2 bg-gray-400 dark:bg-gray-600 rounded" style={{ width: '90%' }} />
                            <div className="h-2 bg-gray-400 dark:bg-gray-600 rounded" style={{ width: '70%' }} />
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className="h-2 bg-gray-600 dark:bg-gray-400 rounded" style={{ width: '50%' }} />
                            <div className="h-1 bg-gray-400 dark:bg-gray-600 rounded" style={{ width: '80%' }} />
                            <div className="h-1 bg-gray-400 dark:bg-gray-600 rounded" style={{ width: '70%' }} />
                          </div>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {state.selectedTemplate === template.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1"
                        >
                          <Check className="h-4 w-4" />
                        </motion.div>
                      )}

                      {/* Color Indicators */}
                      <div className="absolute bottom-3 left-3 flex space-x-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: template.colors.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: template.colors.secondary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: template.colors.accent }}
                        />
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {template.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.features.map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleSelectTemplate(template.id)}
                        className="w-full"
                        variant={state.selectedTemplate === template.id ? "default" : "outline"}
                      >
                        {state.selectedTemplate === template.id ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          'Select Template'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center p-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Sparkles className="h-4 w-4" />
            <span>More templates coming soon!</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}