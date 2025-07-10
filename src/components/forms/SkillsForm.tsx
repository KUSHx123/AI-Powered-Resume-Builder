import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useResume } from '@/contexts/ResumeContext';
import { useAI } from '@/hooks/useAI';
import { Skill } from '@/types/resume';
import { toast } from 'sonner';
import { 
  Code, 
  Plus, 
  X, 
  Sparkles,
  RefreshCw,
  Zap,
  Users,
  Globe
} from 'lucide-react';

const skillCategories = [
  { value: 'technical', label: 'Technical', icon: Code },
  { value: 'soft', label: 'Soft Skills', icon: Users },
  { value: 'language', label: 'Language', icon: Globe }
] as const;

const proficiencyLevels = [
  { value: 'beginner', label: 'Beginner', color: 'bg-red-500' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
  { value: 'advanced', label: 'Advanced', color: 'bg-blue-500' },
  { value: 'expert', label: 'Expert', color: 'bg-green-500' }
] as const;

export function SkillsForm() {
  const { state, updateSkills } = useResume();
  const { generateContent, isLoading } = useAI();
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'technical' as const,
    proficiency: 'intermediate' as const
  });
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      category: newSkill.category,
      proficiency: newSkill.proficiency
    };

    // Check if skill already exists
    const existingSkill = state.data.skills.find(s => 
      s.name.toLowerCase() === skill.name.toLowerCase()
    );

    if (existingSkill) {
      toast.error('This skill already exists');
      return;
    }

    const updatedSkills = [...state.data.skills, skill];
    updateSkills(updatedSkills);
    setNewSkill({
      name: '',
      category: 'technical',
      proficiency: 'intermediate'
    });
    toast.success('Skill added successfully!');
  };

  const handleDeleteSkill = (id: string) => {
    const updatedSkills = state.data.skills.filter(skill => skill.id !== id);
    updateSkills(updatedSkills);
    toast.success('Skill removed successfully!');
  };

  const handleGenerateAI = async () => {
    const jobTitle = state.data.experience[0]?.position || 'Software Engineer';
    
    try {
      const response = await generateContent({
        type: 'skills',
        context: `Generate relevant skills for a ${jobTitle}`,
        jobTitle
      });
      
      if (response.suggestions.length > 0) {
        setAiSuggestions(response.suggestions);
        toast.success('AI suggestions generated!');
      }
    } catch (error) {
      toast.error('Failed to generate AI suggestions');
    }
  };

  const addSuggestion = (suggestion: string) => {
    setNewSkill(prev => ({
      ...prev,
      name: suggestion
    }));
    setAiSuggestions(prev => prev.filter(s => s !== suggestion));
  };

  const getProficiencyColor = (proficiency: string) => {
    const level = proficiencyLevels.find(l => l.value === proficiency);
    return level?.color || 'bg-gray-500';
  };

  const groupedSkills = {
    technical: state.data.skills.filter(skill => skill.category === 'technical'),
    soft: state.data.skills.filter(skill => skill.category === 'soft'),
    language: state.data.skills.filter(skill => skill.category === 'language')
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>Skills</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add New Skill */}
          <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Skill</h3>
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
                <span>AI Suggest</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., React, JavaScript, Communication"
                  className="mt-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newSkill.category}
                  onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value as any }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-4 w-4" />
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="proficiency">Proficiency</Label>
                <Select
                  value={newSkill.proficiency}
                  onValueChange={(value) => setNewSkill(prev => ({ ...prev, proficiency: value as any }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${level.color}`} />
                          <span>{level.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleAddSkill} className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">
                AI Skill Suggestions:
              </h4>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                    onClick={() => addSuggestion(suggestion)}
                  >
                    {suggestion}
                    <Plus className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          {/* Skills Display */}
          <div className="space-y-6">
            {skillCategories.map(category => {
              const skills = groupedSkills[category.value];
              if (skills.length === 0) return null;

              return (
                <div key={category.value}>
                  <div className="flex items-center space-x-2 mb-3">
                    <category.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {category.label}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {skills.length}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {skills.map((skill) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="group relative"
                        >
                          <Badge
                            variant="outline"
                            className="flex items-center space-x-2 pr-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span>{skill.name}</span>
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${getProficiencyColor(skill.proficiency)}`} />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {state.data.skills.length === 0 && (
            <div className="text-center py-12">
              <Code className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                No skills added yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Showcase your technical and soft skills to make your resume stand out
              </p>
              <Button onClick={handleGenerateAI} className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Get AI Suggestions</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}