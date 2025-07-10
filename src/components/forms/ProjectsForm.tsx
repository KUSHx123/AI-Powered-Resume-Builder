import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/contexts/ResumeContext';
import { Project } from '@/types/resume';
import { toast } from 'sonner';
import { 
  FolderOpen, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Calendar,
  Globe,
  Github,
  ExternalLink
} from 'lucide-react';

export function ProjectsForm() {
  const { state, updateProjects } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    description: '',
    technologies: [],
    url: '',
    github: '',
    startDate: '',
    endDate: ''
  });
  const [techInput, setTechInput] = useState('');

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      startDate: '',
      endDate: ''
    };
    setFormData(newProject);
    setEditingId(newProject.id);
  };

  const handleEditProject = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
  };

  const handleSaveProject = () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in title and description');
      return;
    }

    const existingIndex = state.data.projects.findIndex(proj => proj.id === formData.id);
    let updatedProjects;

    if (existingIndex >= 0) {
      updatedProjects = [...state.data.projects];
      updatedProjects[existingIndex] = formData;
    } else {
      updatedProjects = [...state.data.projects, formData];
    }

    updateProjects(updatedProjects);
    setEditingId(null);
    setFormData({
      id: '',
      title: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      startDate: '',
      endDate: ''
    });
    setTechInput('');
    toast.success('Project saved successfully!');
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = state.data.projects.filter(proj => proj.id !== id);
    updateProjects(updatedProjects);
    if (editingId === id) {
      setEditingId(null);
    }
    toast.success('Project deleted successfully!');
  };

  const handleAddTechnology = () => {
    if (!techInput.trim()) return;
    
    const tech = techInput.trim();
    if (!formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech]
      }));
    }
    setTechInput('');
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Projects</span>
          </div>
          <Button
            onClick={handleAddProject}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Projects List */}
          <AnimatePresence>
            {state.data.projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {project.description}
                    </p>
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      {project.startDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {project.startDate} - {project.endDate || 'Present'}
                          </span>
                        </div>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <Globe className="h-3 w-3" />
                          <span>Live Demo</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <Github className="h-3 w-3" />
                          <span>Source Code</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
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
                    {formData.id === editingId && state.data.projects.find(p => p.id === editingId) ? 'Edit Project' : 'Add Project'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Project name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your project, its purpose, and key features"
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="technologies">Technologies Used</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="technologies"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="e.g., React, Node.js, MongoDB"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddTechnology}
                        disabled={!techInput.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {formData.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="flex items-center space-x-1">
                            <span>{tech}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTechnology(tech)}
                              className="h-3 w-3 p-0 hover:text-red-600"
                            >
                              <X className="h-2 w-2" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="url">Project URL</Label>
                      <Input
                        id="url"
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://your-project.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub Repository</Label>
                      <Input
                        id="github"
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                        placeholder="https://github.com/username/repo"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProject}>
                    <Check className="h-4 w-4 mr-2" />
                    Save Project
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {state.data.projects.length === 0 && !editingId && (
            <div className="text-center py-12">
              <FolderOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                No projects added yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Showcase your projects to demonstrate your skills and experience
              </p>
              <Button onClick={handleAddProject} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Your First Project</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}