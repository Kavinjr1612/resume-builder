import { ResumeData } from '../types/resume';
import BoxedTemplate from '../components/templates/BoxedTemplate';
import FresherModernTemplate from '../components/templates/FresherModernTemplate';
import FresherClassicTemplate from '../components/templates/FresherClassicTemplate';
import IntermediateCreativeTemplate from '../components/templates/IntermediateCreativeTemplate';
import IntermediateProfessionalTemplate from '../components/templates/IntermediateProfessionalTemplate';
import ExperiencedExecutiveTemplate from '../components/templates/ExperiencedExecutiveTemplate';
import ExperiencedMinimalTemplate from '../components/templates/ExperiencedMinimalTemplate';

export interface AdaptiveTemplate {
  id: string;
  name: string;
  preview: string; // URL for a thumbnail image
  component: React.ComponentType<{ data: ResumeData; showPhoto?: boolean }>;
  category: 'fresher' | 'intermediate' | 'experienced' | 'boxed';
  recommended?: boolean;
}

// Function to determine if user is a fresher, intermediate, or experienced
export const determineUserLevel = (data: ResumeData): 'fresher' | 'intermediate' | 'experienced' => {
  const experienceCount = data.experience?.filter(exp => exp.company && exp.position).length || 0;
  
  // Basic heuristic based on number of jobs
  if (experienceCount === 0 || experienceCount === 1) {
    return 'fresher';
  } else if (experienceCount === 2) {
    return 'intermediate';
  } else {
    return 'experienced';
  }
};

// Return all available templates
export const getAllTemplates = (): AdaptiveTemplate[] => {
  return [
    {
      id: 'fresher-modern',
      name: 'Fresher Modern',
      preview: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=500&fit=crop', // generic thumbnail
      component: FresherModernTemplate,
      category: 'fresher'
    },
    {
      id: 'fresher-classic',
      name: 'Fresher Classic',
      preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop',
      component: FresherClassicTemplate,
      category: 'fresher'
    },
    {
      id: 'intermediate-creative',
      name: 'Intermediate Creative',
      preview: 'https://images.unsplash.com/photo-1507238692062-5a04ce4bef02?w=400&h=500&fit=crop',
      component: IntermediateCreativeTemplate,
      category: 'intermediate'
    },
    {
      id: 'intermediate-professional',
      name: 'Intermediate Professional',
      preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=500&fit=crop',
      component: IntermediateProfessionalTemplate,
      category: 'intermediate'
    },
    {
      id: 'experienced-executive',
      name: 'Experienced Executive',
      preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=500&fit=crop',
      component: ExperiencedExecutiveTemplate,
      category: 'experienced'
    },
    {
      id: 'experienced-minimal',
      name: 'Experienced Minimal',
      preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop',
      component: ExperiencedMinimalTemplate,
      category: 'experienced'
    },
    {
      id: 'boxed-template',
      name: 'Boxed Standard',
      preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop',
      component: BoxedTemplate,
      category: 'boxed'
    }
  ];
};

export const getTemplatesForUser = (data: ResumeData): AdaptiveTemplate[] => {
  const level = determineUserLevel(data);
  const templates = getAllTemplates();
  
  // Set recommended flag on templates matching the user's level
  return templates.map(template => ({
    ...template,
    recommended: template.category === level || template.category === 'boxed'
  }));
};

export const getRecommendedTemplate = (data: ResumeData): AdaptiveTemplate => {
  const level = determineUserLevel(data);
  const templates = getAllTemplates();
  // Find first template matching the level, fallback to boxed
  return templates.find(t => t.category === level) || templates.find(t => t.id === 'boxed-template')!;
};