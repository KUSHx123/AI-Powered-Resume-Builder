import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useResume } from '@/contexts/ResumeContext';
import { useAI } from '@/hooks/useAI';
import { Experience } from '@/types/resume';
import { toast } from 'sonner';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Calendar,
  Sparkles,
  RefreshCw,
  Building
} from 'lucide-react';

export function ExperienceForm() {
  const { state, updateExperience } = useResume();
  const { generateContent, isLoading } = useAI();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    achievements: ['']
  });
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      achievements: ['']
    };
    setFormData(newExperience);
    setEditingId(newExperience.id);
  };

  const handleEditExperience = (experience: Experience) => {
    setFormData(experience);
    setEditingId(experience.id);
  };

  const handleSaveExperience = () => {
    if (!formData.company || !formData.position) {
      toast.error('Please fill in company name and position');
      return;
    }

    const filteredAchievements = formData.achievements.filter(a => a.trim() !== '');
    const updatedExperience = {
      ...formData,
      achievements: filteredAchievements
    };

    const existingIndex = state.data.experience.findIndex(exp => exp.id === formData.id);
    let updatedExperiences;

    if (existingIndex >= 0) {
      updatedExperiences = [...state.data.experience];
      updatedExperiences[existingIndex] = updatedExperience;
    } else {
      updatedExperiences = [...state.data.experience, updatedExperience];
    }

    updateExperience(updatedExperiences);
    setEditingId(null);
    setFormData({
      id: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      achievements: ['']
    });
    toast.success('Experience saved successfully!');
  };

  const handleDeleteExperience = (id: string) => {
    const updatedExperiences = state.data.experience.filter(exp => exp.id !== id);
    updateExperience(updatedExperiences);
    if (editingId === id) {
      setEditingId(null);
    }
    toast.success('Experience deleted successfully!');
  };

  const handleGenerateAI = async () => {
    if (!formData.position) {
      toast.error('Please enter a position first');
      return;
    }

    try {
      const response = await generateContent({
        type: 'bullet-points',
        context: `Generate professional bullet points for a ${formData.position} role`,
        jobTitle: formData.position
      });
      
      if (response.suggestions.length > 0) {
        setAiSuggestions(response.suggestions);
        toast.success('AI suggestions generated!');
      }
    } catch (error) {
      toast.error('Failed to generate AI suggestions');
    }
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const updateAchievement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((item, i) => i === index ? value : item)
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const useSuggestion = (suggestion: string) => {
    const emptyIndex = formData.achievements.findIndex(a => a.trim() === '');
    if (emptyIndex >= 0) {
      updateAchievement(emptyIndex, suggestion);
    } else {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, suggestion]
      }));
    }
    setAiSuggestions(prev => prev.filter(s => s !== suggestion));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Work Experience</span>
          </div>
          <Button
            onClick={handleAddExperience}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Experience</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Experience List */}
          <AnimatePresence>
            {state.data.experience.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <h3 className="font-semibold text-lg">{experience.company}</h3>
                      {experience.isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                      {experience.position}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                      </span>
                    </div>
                    {experience.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {experience.description}
                      </p>
                    )}
                    {experience.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {experience.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditExperience(experience)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteExperience(experience.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Edit Form */}
          <AnimatePresence>
            {editingId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 border-2 border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">
                    {formData.id === editingId && state.data.experience.find(e => e.id === editingId) ? 'Edit Experience' : 'Add Experience'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Company name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      placeholder="Job title"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="month"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="month"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      disabled={formData.isCurrent}
                      className="mt-1"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch
                        id="isCurrent"
                        checked={formData.isCurrent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isCurrent: checked }))}
                      />
                      <Label htmlFor="isCurrent" className="text-sm">
                        I currently work here
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your role and responsibilities"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Key Achievements</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateAI}
                        disabled={isLoading}
                        className="flex items-center space-x-2"
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        <span>AI Generate</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addAchievement}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {formData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={achievement}
                          onChange={(e) => updateAchievement(index, e.target.value)}
                          placeholder={`Achievement ${index + 1}`}
                          className="flex-1"
                        />
                        {formData.achievements.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAchievement(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions */}
                {aiSuggestions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">
                      AI Suggestions:
                    </h4>
                    <div className="space-y-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                            {suggestion}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => useSuggestion(suggestion)}
                            className="ml-3"
                          >
                            Use
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveExperience}>
                    <Check className="h-4 w-4 mr-2" />
                    Save Experience
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {state.data.experience.length === 0 && !editingId && (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                No work experience added yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Add your work experience to showcase your professional journey
              </p>
              <Button onClick={handleAddExperience} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Your First Experience</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}