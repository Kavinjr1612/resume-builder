import React, { useState, useEffect } from 'react';
import { Plus, Minus, ArrowLeft, Eye, Upload, X, Zap } from 'lucide-react';
import { ResumeData, Education, Experience, Project } from '../types/resume';
import { trackResumeEvents } from '../utils/analytics';

interface ResumeFormProps {
  data: ResumeData;
  onUpdateData: (data: ResumeData) => void;
  onBack: () => void;
  onPreview: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onUpdateData, onBack, onPreview }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [skillsDisplayMode, setSkillsDisplayMode] = useState<'combined' | 'separate'>('combined');

  useEffect(() => {
    trackResumeEvents.startBuilding();
  }, []);

  // Sample data for autofill
  const sampleData: ResumeData = {
    personalInfo: {
      name: 'Kavinesh S R',
      email: 'karaja1612@gmail.com',
      phone: '+91 98765 43210',
      location: 'Tamil Nadu, India',
      linkedin: 'linkedin.com/in/kavineshsr',
      github: 'github.com/kavineshsr',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
    },
    summary: 'CS graduate skilled in Python, JavaScript, and React. Experienced in agile development and building full-stack web applications. Seeking a software development role.',
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2020-08',
        endDate: '2024-05',
        gpa: '3.8/4.0',
        achievements: 'Dean\'s List, Relevant: Data Structures, Algorithms, Databases'
      }
    ],
    experience: [
      {
        id: '1',
        company: 'TechStart Inc.',
        position: 'Software Development Intern',
        startDate: '2023-06',
        endDate: '2023-08',
        description: '• Built web apps using React and Node.js\n• Collaborated with 5 developers on client projects\n• Improved user experience by 25%',
        isCurrentJob: false
      },
      {
        id: '2',
        company: 'University IT Department',
        position: 'Student Web Developer',
        startDate: '2022-09',
        endDate: '2023-05',
        description: '• Maintained university websites with HTML, CSS, JS\n• Trained 3 new developers on best practices',
        isCurrentJob: false
      }
    ],
    projects: [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce app with auth, product catalog, cart, and Stripe payments.',
        technologies: 'React, Node.js, MongoDB, Stripe',
        link: ''
      },
      {
        id: '2',
        name: 'Task Management App',
        description: 'Real-time collaborative task manager with drag-and-drop and team features.',
        technologies: 'Vue.js, Express, Socket.io, PostgreSQL',
        link: ''
      }
    ],
    skills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'Git', 'MongoDB',
      'Communication', 'Teamwork', 'Problem Solving'
    ],
    technicalSkills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'Git', 'MongoDB', 'TypeScript'
    ],
    softSkills: [
      'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management'
    ]
  };

  const handleAutofill = () => {
    onUpdateData(sampleData);
    // Show a brief success message
    const button = document.querySelector('[data-autofill-btn]') as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = '✓ Filled!';
      button.style.backgroundColor = '#10b981';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    onUpdateData({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
    
    if (field === 'name' && value) {
      trackResumeEvents.completePersonalInfo();
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target?.result as string;
        onUpdateData({
          ...data,
          personalInfo: { ...data.personalInfo, photo: photoData }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    onUpdateData({
      ...data,
      personalInfo: { ...data.personalInfo, photo: undefined }
    });
  };

  const addEducation = () => {
    if (data.education.length >= 2) {
      alert("Maximum 2 education entries allowed to fit on one page.");
      return;
    }
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: ''
    };
    onUpdateData({
      ...data,
      education: [...data.education, newEducation]
    });
    trackResumeEvents.addEducation();
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updatedEducation = data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdateData({ ...data, education: updatedEducation });
  };

  const removeEducation = (id: string) => {
    onUpdateData({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const addExperience = () => {
    if (data.experience.length >= 3) {
      alert("Maximum 3 experience entries allowed to fit on one page.");
      return;
    }
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentJob: false
    };
    onUpdateData({
      ...data,
      experience: [...data.experience, newExperience]
    });
    trackResumeEvents.addExperience();
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    const updatedExperience = data.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdateData({ ...data, experience: updatedExperience });
  };

  const removeExperience = (id: string) => {
    onUpdateData({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addProject = () => {
    if (data.projects.length >= 3) {
      alert("Maximum 3 project entries allowed to fit on one page.");
      return;
    }
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    onUpdateData({
      ...data,
      projects: [...data.projects, newProject]
    });
    trackResumeEvents.addProject();
  };

  const updateProject = (id: string, field: string, value: string) => {
    const updatedProjects = data.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onUpdateData({ ...data, projects: updatedProjects });
  };

  const removeProject = (id: string) => {
    onUpdateData({
      ...data,
      projects: data.projects.filter(proj => proj.id !== id)
    });
  };

  const handlePreview = () => {
    trackResumeEvents.previewResume();
    onPreview();
  };

  // Updated summary handler
  const updateSummary = (value: string) => {
    onUpdateData({
      ...data,
      summary: value
    });
  };

  // Technical Skills Management
  const addTechnicalSkill = () => {
    if ((data.technicalSkills || []).length >= 8) {
      alert("Maximum 8 technical skills allowed to fit on one page.");
      return;
    }
    if (newTechnicalSkill.trim() && !data.technicalSkills?.includes(newTechnicalSkill.trim())) {
      onUpdateData({
        ...data,
        technicalSkills: [...(data.technicalSkills || []), newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (skillToRemove: string) => {
    onUpdateData({
      ...data,
      technicalSkills: (data.technicalSkills || []).filter(skill => skill !== skillToRemove)
    });
  };

  const handleTechnicalSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnicalSkill();
    }
  };

  // Soft Skills Management
  const addSoftSkill = () => {
    if ((data.softSkills || []).length >= 6) {
      alert("Maximum 6 soft skills allowed to fit on one page.");
      return;
    }
    if (newSoftSkill.trim() && !data.softSkills?.includes(newSoftSkill.trim())) {
      onUpdateData({
        ...data,
        softSkills: [...(data.softSkills || []), newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (skillToRemove: string) => {
    onUpdateData({
      ...data,
      softSkills: (data.softSkills || []).filter(skill => skill !== skillToRemove)
    });
  };

  const handleSoftSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSoftSkill();
    }
  };

  // Skill suggestions
  const technicalSkillSuggestions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git',
    'Java', 'C++', 'MongoDB', 'AWS', 'Docker', 'TypeScript', 'Angular',
    'Vue.js', 'PHP', 'MySQL', 'PostgreSQL', 'Firebase', 'GraphQL'
  ];

  const softSkillSuggestions = [
    'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Project Management',
    'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity', 'Attention to Detail',
    'Public Speaking', 'Negotiation', 'Customer Service', 'Analytical Thinking', 'Collaboration'
  ];

  const addSuggestedTechnicalSkill = (skill: string) => {
    if ((data.technicalSkills || []).length >= 8) {
      alert("Maximum 8 technical skills allowed to fit on one page.");
      return;
    }
    if (!(data.technicalSkills || []).includes(skill)) {
      onUpdateData({
        ...data,
        technicalSkills: [...(data.technicalSkills || []), skill]
      });
    }
  };

  const addSuggestedSoftSkill = (skill: string) => {
    if ((data.softSkills || []).length >= 6) {
      alert("Maximum 6 soft skills allowed to fit on one page.");
      return;
    }
    if (!(data.softSkills || []).includes(skill)) {
      onUpdateData({
        ...data,
        softSkills: [...(data.softSkills || []), skill]
      });
    }
  };

  // Update the combined skills for backward compatibility
  useEffect(() => {
    const combinedSkills = [
      ...(data.technicalSkills || []),
      ...(data.softSkills || [])
    ];
    if (JSON.stringify(combinedSkills) !== JSON.stringify(data.skills)) {
      onUpdateData({
        ...data,
        skills: combinedSkills
      });
    }
  }, [data.technicalSkills, data.softSkills]);

  const tabs = [
    { id: 'personal', label: 'Personal', shortLabel: 'Info' },
    { id: 'education', label: 'Education', shortLabel: 'Edu' },
    { id: 'experience', label: 'Experience', shortLabel: 'Exp' },
    { id: 'projects', label: 'Projects', shortLabel: 'Proj' },
    { id: 'summary', label: 'Summary & Skills', shortLabel: 'Skills' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </button>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Free Resume Builder</h1>
            </div>
            <div className="flex space-x-3">
                <button
                  onClick={handleAutofill}
                  data-autofill-btn
                  className="bg-teal-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 text-sm sm:text-base shadow-sm"
                >
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Autofill Example</span>
                  <span className="sm:hidden">Autofill</span>
                </button>
                <button
                  onClick={handlePreview}
                  className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm sm:text-base shadow-sm"
                >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {activeTab === 'personal' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Personal Information</h2>
                <div className="text-xs sm:text-sm text-green-600 font-medium">✓ 100% Free - No Signup Required</div>
              </div>

              {/* Photo Upload Section */}
              <div className="border border-blue-200 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-medium text-blue-900 mb-2 sm:mb-3">Professional Photo (Optional)</h3>
                <p className="text-blue-700 text-xs sm:text-sm mb-3 sm:mb-4">
                  Add a professional photo to make your resume stand out. Supported by Minimal, Executive, Academic, and Technical templates.
                </p>
                
                {data.personalInfo.photo ? (
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={data.personalInfo.photo}
                        alt="Profile"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-blue-300"
                      />
                      <button
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-2 w-2 sm:h-3 sm:w-3" />
                      </button>
                    </div>
                    <div>
                      <p className="text-green-700 font-medium text-sm sm:text-base">Photo uploaded successfully!</p>
                      <p className="text-green-600 text-xs sm:text-sm">You can change it by uploading a new photo.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <label className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center space-x-2 text-sm sm:text-base">
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <div className="text-gray-600 text-xs sm:text-sm">
                      <p>Recommended: Professional headshot</p>
                      <p>Format: JPG, PNG • Max size: 5MB</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Kavinesh S R"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="karaja1612@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="https://linkedin.com/in/kavinesh-s-r"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={data.personalInfo.github}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="https://github.com/kavinesh-s-r"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Education</h2>
                <button
                  onClick={addEducation}
                  className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Add Education</span>
                </button>
              </div>

              {data.education.map((edu, index) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Education {index + 1}</h3>
                    {data.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution *
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="University of Example"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree *
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study *
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="3.8/4.0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Achievements & Activities
                      </label>
                      <textarea
                        value={edu.achievements}
                        onChange={(e) => updateEducation(edu.id, 'achievements', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        rows={3}
                        maxLength={150}
                        placeholder="Dean's List, Relevant coursework, Awards, etc."
                      />
                      <div className="text-right mt-1">
                        <span className="text-xs text-gray-500">{edu.achievements.length}/150 characters</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Work Experience</h2>
                <button
                  onClick={addExperience}
                  className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              {data.experience.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <p className="text-base sm:text-lg mb-2">No experience yet? No problem!</p>
                  <p className="text-sm sm:text-base">Include internships, part-time jobs, freelance work, or volunteer experience.</p>
                  <p className="text-xs sm:text-sm mt-2">Add your first experience to get started.</p>
                </div>
              ) : (
                data.experience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company/Organization *
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          placeholder="Tech Corp Inc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Position/Role *
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          placeholder="Software Development Intern"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <div className="space-y-2">
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            disabled={exp.isCurrentJob}
                          />
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={exp.isCurrentJob}
                              onChange={(e) => updateExperience(exp.id, 'isCurrentJob', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs sm:text-sm text-gray-600">Currently working here</span>
                          </label>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Description & Achievements *
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          rows={4}
                          maxLength={200}
                          placeholder="• Developed web applications using React and Node.js&#10;• Collaborated with team of 5 developers on various projects&#10;• Implemented responsive designs and improved user experience"
                        />
                        <div className="text-right mt-1">
                          <span className="text-xs text-gray-500">{exp.description.length}/200 characters</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Projects</h2>
                <button
                  onClick={addProject}
                  className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {data.projects.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <p className="text-base sm:text-lg mb-2">Showcase Your Projects!</p>
                  <p className="text-sm sm:text-base">Include academic projects, personal projects, hackathon entries, or open source contributions.</p>
                  <p className="text-xs sm:text-sm mt-2">Projects are crucial for freshers to demonstrate practical skills.</p>
                </div>
              ) : (
                data.projects.map((project, index) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">Project {index + 1}</h3>
                      <button
                        onClick={() => removeProject(project.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          placeholder="E-commerce Website"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Technologies Used
                        </label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Description *
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          rows={3}
                          maxLength={120}
                          placeholder="Built a full-stack e-commerce platform with user authentication, product catalog, and payment integration..."
                        />
                        <div className="text-right mt-1">
                          <span className="text-xs text-gray-500">{project.description.length}/120 characters</span>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Link (GitHub, Demo, etc.)
                        </label>
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Professional Summary & Skills</h2>
                <div className="text-sm text-blue-600 font-medium">✓ Essential for ATS Systems</div>
              </div>

              {/* Professional Summary Section */}
              <div className="border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-blue-900">Professional Summary</h3>
                </div>
                <p className="text-blue-700 text-sm mb-4">
                  Write a compelling 2-3 sentence summary that highlights your key qualifications, career objectives, and what makes you unique as a candidate.
                </p>
                <textarea
                  value={data.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  rows={4}
                  maxLength={250}
                  placeholder="Example: Recent Computer Science graduate with strong programming skills in Python and JavaScript. Passionate about developing innovative web applications and experienced in agile development methodologies. Seeking to leverage technical expertise and problem-solving abilities in a software development role."
                />
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-blue-600">
                    💡 Tip: Include your degree, key skills, and career goals
                  </p>
                  <span className="text-xs text-gray-500">
                    {data.summary.length}/250 characters
                  </span>
                </div>
              </div>

              {/* Skills Display Mode Toggle */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Display Options</h3>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="skillsDisplay"
                      value="combined"
                      checked={skillsDisplayMode === 'combined'}
                      onChange={(e) => setSkillsDisplayMode(e.target.value as 'combined' | 'separate')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Combined Skills Section</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="skillsDisplay"
                      value="separate"
                      checked={skillsDisplayMode === 'separate'}
                      onChange={(e) => setSkillsDisplayMode(e.target.value as 'combined' | 'separate')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Separate Technical & Soft Skills</span>
                  </label>
                </div>
              </div>

              {/* Technical Skills Section */}
              <div className="border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-green-900">Technical Skills</h3>
                </div>
                <p className="text-green-700 text-sm mb-4">
                  Add your technical skills like programming languages, frameworks, tools, and software.
                </p>
                
                {/* Add New Technical Skill */}
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newTechnicalSkill}
                    onChange={(e) => setNewTechnicalSkill(e.target.value)}
                    onKeyPress={handleTechnicalSkillKeyPress}
                    className="flex-1 p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    placeholder="Type a technical skill (e.g., JavaScript, Python, etc.)"
                  />
                  <button
                    onClick={addTechnicalSkill}
                    disabled={!newTechnicalSkill.trim() || (data.technicalSkills || []).includes(newTechnicalSkill.trim())}
                    className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Current Technical Skills */}
                {(data.technicalSkills || []).length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-green-800 mb-2">Technical Skills ({(data.technicalSkills || []).length}):</h4>
                    <div className="flex flex-wrap gap-2">
                      {(data.technicalSkills || []).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 group hover:bg-green-200 transition-colors"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => removeTechnicalSkill(skill)}
                            className="text-green-600 hover:text-green-800 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Skill Suggestions */}
                <div className="border-t border-green-200 pt-4">
                  <h4 className="text-sm font-medium text-green-800 mb-2">Popular Technical Skills (Click to Add):</h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkillSuggestions
                      .filter(skill => !(data.technicalSkills || []).includes(skill))
                      .slice(0, 10)
                      .map((skill) => (
                        <button
                          key={skill}
                          onClick={() => addSuggestedTechnicalSkill(skill)}
                          className="bg-white text-green-700 border border-green-300 px-3 py-1 rounded-full text-sm hover:bg-green-100 transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Soft Skills Section */}
              <div className="border border-purple-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-purple-900">Soft Skills</h3>
                </div>
                <p className="text-purple-700 text-sm mb-4">
                  Add your soft skills like communication, leadership, teamwork, and personal qualities.
                </p>
                
                {/* Add New Soft Skill */}
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newSoftSkill}
                    onChange={(e) => setNewSoftSkill(e.target.value)}
                    onKeyPress={handleSoftSkillKeyPress}
                    className="flex-1 p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    placeholder="Type a soft skill (e.g., Communication, Leadership, etc.)"
                  />
                  <button
                    onClick={addSoftSkill}
                    disabled={!newSoftSkill.trim() || (data.softSkills || []).includes(newSoftSkill.trim())}
                    className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Current Soft Skills */}
                {(data.softSkills || []).length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-purple-800 mb-2">Soft Skills ({(data.softSkills || []).length}):</h4>
                    <div className="flex flex-wrap gap-2">
                      {(data.softSkills || []).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 group hover:bg-purple-200 transition-colors"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSoftSkill(skill)}
                            className="text-purple-600 hover:text-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soft Skill Suggestions */}
                <div className="border-t border-purple-200 pt-4">
                  <h4 className="text-sm font-medium text-purple-800 mb-2">Popular Soft Skills (Click to Add):</h4>
                  <div className="flex flex-wrap gap-2">
                    {softSkillSuggestions
                      .filter(skill => !(data.softSkills || []).includes(skill))
                      .slice(0, 10)
                      .map((skill) => (
                        <button
                          key={skill}
                          onClick={() => addSuggestedSoftSkill(skill)}
                          className="bg-white text-purple-700 border border-purple-300 px-3 py-1 rounded-full text-sm hover:bg-purple-100 transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">✨ Pro Tips for Summary & Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Summary Best Practices:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Keep it concise (2-3 sentences)</li>
                      <li>• Mention your degree/field</li>
                      <li>• Highlight key achievements</li>
                      <li>• Include career objectives</li>
                      <li>• Use action words</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Skills Best Practices:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Include 8-15 relevant skills total</li>
                      <li>• Balance technical and soft skills</li>
                      <li>• Use industry keywords</li>
                      <li>• Match job requirements</li>
                      <li>• Be honest about skill levels</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;