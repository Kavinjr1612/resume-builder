import React, { useState } from 'react';
import { Calculator, FileText, Target, TrendingUp, Users, Briefcase, ExternalLink, Clock, Sparkles } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  comingSoon?: boolean;
}

const ToolsSection: React.FC = () => {
  const tools: Tool[] = [
    {
      id: 'salary-calculator',
      title: 'Salary Calculator',
      description: 'Calculate expected salary ranges for your position and location based on market data.',
      icon: <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />,
      category: 'Career Planning',
      comingSoon: true
    },
    {
      id: 'cover-letter-generator',
      title: 'AI Cover Letter Generator',
      description: 'Generate personalized cover letters that complement your resume perfectly.',
      icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
      category: 'Job Applications',
      comingSoon: true
    },
    {
      id: 'interview-prep',
      title: 'Interview Question Bank',
      description: 'Practice with 500+ common interview questions tailored to your field.',
      icon: <Target className="h-5 w-5 sm:h-6 sm:w-6" />,
      category: 'Interview Prep',
      comingSoon: true
    },
    {
      id: 'career-path',
      title: 'Career Path Planner',
      description: 'Visualize your career progression and set achievable professional goals.',
      icon: <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />,
      category: 'Career Planning',
      comingSoon: true
    },
    {
      id: 'networking-tracker',
      title: 'Professional Network Tracker',
      description: 'Organize and track your professional connections and follow-ups.',
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
      category: 'Networking',
      comingSoon: true
    },
    {
      id: 'job-tracker',
      title: 'Job Application Tracker',
      description: 'Keep track of all your job applications, interviews, and follow-ups in one place.',
      icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />,
      category: 'Job Search',
      comingSoon: true
    }
  ];

  const categories = ['All', 'Career Planning', 'Job Applications', 'Interview Prep', 'Networking', 'Job Search'];

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = activeCategory === 'All'
    ? tools
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Upcoming Career Tools & Resources
            </h2>
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4 px-4">
            Comprehensive suite of tools to accelerate your job search and career growth
          </p>
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-center leading-tight">Coming Soon</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border shadow-sm
                ${activeCategory === category 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              {/* Tool Icon and Info */}
              <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 sm:p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{tool.title}</h3>
                  <span className="text-xs sm:text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">{tool.description}</p>
              
              <div className="mt-auto pt-4">
                <button 
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 cursor-not-allowed relative overflow-hidden text-sm sm:text-base"
                  disabled
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Launching Soon</span>
                </button>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-center text-white mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Be the First to Know!</h3>
          <p className="text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Get notified when these powerful career tools launch. We are committed to providing 
            comprehensive, free resources to help you succeed in your career journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3 text-white">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base">100% Free Tools</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3 text-white">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base">Student-Focused</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3 text-white">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base">Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;