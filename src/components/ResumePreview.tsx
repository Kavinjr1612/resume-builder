import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types/resume';
import { 
  ArrowLeft, Download, Edit2, Eye, Star, CheckCircle, 
  ShieldCheck, Target, FileText, AlertCircle, GraduationCap, 
  Briefcase, CheckSquare, Image as ImageIcon
} from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import { trackResumeEvents } from '../utils/analytics';
import { 
  getTemplatesForUser, 
  getRecommendedTemplate, 
  determineUserLevel,
  AdaptiveTemplate
} from '../utils/templateSelector';

interface ResumePreviewProps {
  data: ResumeData;
  onBack: () => void;
  onEdit: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onBack, onEdit }) => {
  const userLevel = determineUserLevel(data);
  const userTemplates = getTemplatesForUser(data);
  const recommendedTemplate = getRecommendedTemplate(data);
  
  const [selectedTemplate, setSelectedTemplate] = useState<string>(recommendedTemplate.id);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [showPhoto, setShowPhoto] = useState(true);
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const currentTemplate = userTemplates.find(t => t.id === selectedTemplate) || recommendedTemplate;
  const TemplateComponent = currentTemplate.component;

  // Format level text for display
  const levelDisplay = userLevel === 'fresher' ? 'Fresh Graduate' : userLevel === 'intermediate' ? 'Mid-Level Professional' : 'Senior Executive';

  // Calculate optimal scale for preview to fit container better
  const getPreviewScale = () => {
    if (typeof window === 'undefined') return 0.8;
    const screenWidth = window.innerWidth;
    // Sidebar takes ~320px. Remaining is screenWidth - 320.
    const availableWidth = screenWidth - 350; 
    
    if (screenWidth < 1024) return 0.6; // Tablet/Mobile
    if (availableWidth < 900) return 0.7; // Small desktop
    if (availableWidth < 1200) return 0.8; 
    return 0.9; // Large desktop
  };

  useEffect(() => {
    setPreviewScale(getPreviewScale());
    const handleResize = () => setPreviewScale(getPreviewScale());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    trackResumeEvents.changeTemplate(templateId);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    trackResumeEvents.downloadPDF();
    
    try {
      const fileName = `${(data.personalInfo?.name || 'My').replace(/\s+/g, '_')}_Resume.pdf`;
      await generatePDF('resume-for-pdf', fileName);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const templatesToDisplay = showAllTemplates ? userTemplates : userTemplates.filter(t => t.recommended);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Top Header Area */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Home
            </button>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded text-white">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Resume Preview</h1>
                <p className="text-sm text-gray-500">Your professional resume is ready!</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={onEdit} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              <Eye className="h-4 w-4" /> Edit Resume
            </button>
            <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-75">
              <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} /> 
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-3 mt-5">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
            <CheckCircle className="h-3.5 w-3.5" /> Resume Complete
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" /> ATS Optimized
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold">
            <Target className="h-3.5 w-3.5" /> {userLevel === 'fresher' ? 'Fresher' : userLevel === 'intermediate' ? 'Intermediate' : 'Expert'}-Optimized
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
            <FileText className="h-3.5 w-3.5" /> PDF Ready
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row p-4 lg:p-6 gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Sidebar Header */}
            <div className="bg-teal-700 text-white p-5">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-1">
                <Layout className="h-5 w-5" /> Smart Template Selection
              </h2>
              <p className="text-sm text-teal-100">Templates optimized for {userLevel === 'fresher' ? 'fresh graduates' : 'experienced professionals'}</p>
            </div>

            <div className="p-4 space-y-4">
              {/* Detected Profile Alert */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <h3 className="text-sm font-bold text-blue-800 flex items-center gap-1.5 mb-1">
                  <Target className="h-4 w-4" /> Detected Profile: {levelDisplay}
                </h3>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Templates emphasize {userLevel === 'fresher' ? 'education, projects, and potential' : 'work history, achievements, and leadership'}.
                </p>
              </div>

              {/* Template List */}
              <div className="space-y-2">
                {templatesToDisplay.map(template => {
                  const isSelected = selectedTemplate === template.id;
                  return (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex justify-between items-center ${
                        isSelected 
                          ? 'bg-teal-700 text-white shadow-md' 
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-sm mb-0.5">{template.name}</h4>
                        <div className={`text-xs flex items-center gap-1 ${isSelected ? 'text-teal-200' : 'text-gray-500'}`}>
                          <GraduationCap className="h-3 w-3" /> {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                        </div>
                      </div>
                      {isSelected && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                    </button>
                  );
                })}
              </div>

              {/* Show All Toggle */}
              {!showAllTemplates && userTemplates.length > templatesToDisplay.length && (
                <button 
                  onClick={() => setShowAllTemplates(true)}
                  className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 py-2 border-t border-gray-100"
                >
                  Show All Templates
                </button>
              )}

              {/* Include Photo Checkbox */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-start gap-3 mt-2">
                <input 
                  type="checkbox" 
                  id="include-photo" 
                  checked={showPhoto}
                  onChange={(e) => setShowPhoto(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <label htmlFor="include-photo" className="text-sm font-bold text-gray-800 flex items-center gap-1.5 cursor-pointer">
                    <ImageIcon className="h-4 w-4 text-gray-500" /> Include photo
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">Available for supported templates</p>
                </div>
              </div>

            </div>
          </div>
          
          {/* Info Card underneath */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 className="text-sm font-bold text-blue-900 mb-1">{currentTemplate.name}:</h4>
            <p className="text-xs text-blue-800 leading-relaxed">
              Contemporary design perfect for {levelDisplay.toLowerCase()} aiming for maximum impact.
            </p>
          </div>

        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          
          {/* Inner Header */}
          <div className="border-b border-gray-200 p-5 bg-gray-50/50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Professional Resume</h2>
              <p className="text-sm text-gray-500">Browser preview - Download for perfect A4 formatting</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> Preview Mode
              </span>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" /> PDF Ready
              </span>
            </div>
          </div>

          {/* Yellow Preview Notice */}
          <div className="bg-amber-50 border-b border-amber-200 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-900 mb-1">Preview Notice</h3>
                <p className="text-sm text-amber-800 leading-relaxed mb-2">
                  This preview is <strong>scaled for browser viewing</strong>. Your downloaded PDF will maintain <strong>professional A4 formatting</strong> with proper margins, fonts, and spacing optimized for printing and ATS systems.
                </p>
                <div className="flex gap-4 text-xs font-medium text-amber-700">
                  <span className="flex items-center gap-1"><CheckSquare className="h-3.5 w-3.5" /> A4 Standard</span>
                  <span className="flex items-center gap-1"><CheckSquare className="h-3.5 w-3.5" /> Print Ready</span>
                  <span className="flex items-center gap-1"><CheckSquare className="h-3.5 w-3.5" /> ATS Compatible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="flex-1 overflow-auto bg-gray-100 flex justify-center py-8">
            <div 
              className="origin-top transition-transform duration-300 ease-out"
              style={{ transform: `scale(${previewScale})`, height: `${1056 * previewScale}px`, marginBottom: '40px' }}
            >
              <div 
                className="bg-white shadow-xl relative"
                style={{ width: '800px', minHeight: '1056px' }}
              >
                <div id="resume-for-pdf" className="w-full h-full bg-white">
                  <TemplateComponent data={data} showPhoto={showPhoto} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ResumePreview;