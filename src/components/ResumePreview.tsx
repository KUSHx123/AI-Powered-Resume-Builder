import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/contexts/ResumeContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Calendar,
  ExternalLink
} from 'lucide-react';

export function ResumePreview() {
  const { state } = useResume();
  const { data } = state;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 shadow-2xl mx-auto max-w-4xl"
      style={{ 
        minHeight: '11in',
        fontSize: '12px',
        lineHeight: '1.4',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div className="p-8">
        {/* Header */}
        <header className="text-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {data.personalInfo.email && (
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <a href={data.personalInfo.website} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {data.personalInfo.website}
                </a>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center space-x-1">
                <Linkedin className="h-4 w-4" />
                <a href={data.personalInfo.linkedin} className="hover:text-blue-600 dark:hover:text-blue-400">
                  LinkedIn
                </a>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center space-x-1">
                <Github className="h-4 w-4" />
                <a href={data.personalInfo.github} className="hover:text-blue-600 dark:hover:text-blue-400">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                        {exp.position}
                      </h3>
                      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-green-200 dark:border-green-800 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    {edu.gpa && (
                      <span>GPA: {edu.gpa}</span>
                    )}
                    {edu.honors && (
                      <span className="font-medium">{edu.honors}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['technical', 'soft', 'language'].map(category => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 capitalize">
                      {category === 'technical' ? 'Technical Skills' : 
                       category === 'soft' ? 'Soft Skills' : 'Languages'}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="border-l-2 border-purple-200 dark:border-purple-800 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {project.description}
                      </p>
                    </div>
                    {project.startDate && (
                      <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                    {project.url && (
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Globe className="h-3 w-3" />
                        <span>Live Demo</span>
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
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}