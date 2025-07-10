import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export function PersonalInfoForm() {
  const { state, updatePersonalInfo } = useResume();
  const [formData, setFormData] = useState(state.data.personalInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      updatePersonalInfo(formData);
      toast.success('Personal information saved successfully!');
    }
  };

  const inputFields = [
    { key: 'firstName', label: 'First Name', icon: User, required: true },
    { key: 'lastName', label: 'Last Name', icon: User, required: true },
    { key: 'email', label: 'Email Address', icon: Mail, required: true, type: 'email' },
    { key: 'phone', label: 'Phone Number', icon: Phone, required: true, type: 'tel' },
    { key: 'location', label: 'Location', icon: MapPin, required: true },
    { key: 'website', label: 'Website', icon: Globe, required: false, type: 'url' },
    { key: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, required: false, type: 'url' },
    { key: 'github', label: 'GitHub Profile', icon: Github, required: false, type: 'url' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Personal Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {inputFields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={field.key === 'location' ? 'md:col-span-2' : ''}
            >
              <Label htmlFor={field.key} className="flex items-center space-x-2">
                <field.icon className="h-4 w-4" />
                <span>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </Label>
              <Input
                id={field.key}
                type={field.type || 'text'}
                value={formData[field.key as keyof typeof formData] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                className={`mt-1 ${errors[field.key] ? 'border-red-500' : ''}`}
              />
              {errors[field.key] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex justify-end"
        >
          <Button onClick={handleSave} className="w-full md:w-auto">
            Save Personal Information
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}