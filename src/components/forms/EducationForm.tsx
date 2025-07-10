import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/contexts/ResumeContext';
import { Education } from '@/types/resume';
import { toast } from 'sonner';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Calendar,
  School,
  BookOpen,
  Award
} from 'lucide-react';

export function EducationForm() {
  const { state, updateEducation } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Education>({
    id: '',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    honors: ''
  });

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    setFormData(newEducation);
    setEditingId(newEducation.id);
  };

  const handleEditEducation = (education: Education) => {
    setFormData(education);
    setEditingId(education.id);
  };

  const handleSaveEducation = () => {
    if (!formData.institution || !formData.degree || !formData.field) {
      toast.error('Please fill in required fields');
      return;
    }

    const existingIndex = state.data.education.findIndex(edu => edu.id === formData.id);
    let updatedEducation;

    if (existingIndex >= 0) {
      updatedEducation = [...state.data.education];
      updatedEducation[existingIndex] = formData;
    } else {
      updatedEducation = [...state.data.education, formData];
    }

    updateEducation(updatedEducation);
    setEditingId(null);
    setFormData({
      id: '',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    });
    toast.success('Education saved successfully!');
  };

  const handleDeleteEducation = (id: string) => {
    const updatedEducation = state.data.education.filter(edu => edu.id !== id);
    updateEducation(updatedEducation);
    if (editingId === id) {
      setEditingId(null);
    }
    toast.success('Education deleted successfully!');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Education</span>
          </div>
          <Button
            onClick={handleAddEducation}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Education</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Education List */}
          <AnimatePresence>
            {state.data.education.map((education, index) => (
              <motion.div
                key={education.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <School className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <h3 className="font-semibold text-lg">{education.institution}</h3>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {education.degree} in {education.field}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {education.startDate} - {education.endDate}
                      </span>
                    </div>
                    {education.gpa && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Award className="h-3 w-3" />
                        <span>GPA: {education.gpa}</span>
                      </div>
                    )}
                    {education.honors && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Honors:</span> {education.honors}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditEducation(education)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEducation(education.id)}
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
                    {formData.id === editingId && state.data.education.find(e => e.id === editingId) ? 'Edit Education' : 'Add Education'}
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
                  <div className="md:col-span-2">
                    <Label htmlFor="institution">Institution *</Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="University or school name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="degree">Degree *</Label>
                    <Input
                      id="degree"
                      value={formData.degree}
                      onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                      placeholder="e.g., Bachelor of Science"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="field">Field of Study *</Label>
                    <Input
                      id="field"
                      value={formData.field}
                      onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                      placeholder="e.g., Computer Science"
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
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA (Optional)</Label>
                    <Input
                      id="gpa"
                      value={formData.gpa}
                      onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                      placeholder="e.g., 3.8/4.0"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="honors">Honors/Awards (Optional)</Label>
                    <Input
                      id="honors"
                      value={formData.honors}
                      onChange={(e) => setFormData(prev => ({ ...prev, honors: e.target.value }))}
                      placeholder="e.g., Summa Cum Laude"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEducation}>
                    <Check className="h-4 w-4 mr-2" />
                    Save Education
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {state.data.education.length === 0 && !editingId && (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                No education added yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Add your educational background to showcase your qualifications
              </p>
              <Button onClick={handleAddEducation} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Your Education</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}