import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types/resume';
import { ArrowLeft, Download, Edit2, Eye, Layout, CheckCircle, Star, FileText, Briefcase, Award, AlignLeft } from 'lucide-react';
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

  const currentTemplate = userTemplates.find(t => t.id === selectedTemplate) || recommendedTemplate;
  const TemplateComponent = currentTemplate.component;

  // Calculate optimal scale for preview to fit container better
  const getPreviewScale = () => {
    if (typeof window === 'undefined') return 0.8;
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) return 0.45; // Mobile
    if (screenWidth < 1024) return 0.65; // Tablet
    if (screenWidth < 1280) return 0.8; // Small desktop
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm z-10 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Home</span>
              </button>
              <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Preview</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={onEdit}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-75 disabled:cursor-wait font-medium"
              >
                <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Template Selector Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm z-10 flex-shrink-0 py-3 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 min-w-max mx-auto max-w-7xl">
          <div className="flex items-center mr-2 text-sm text-gray-600">
            <Layout className="h-4 w-4 mr-1.5" />
            <span className="font-medium">Templates:</span>
          </div>
          
          <div className="flex gap-2">
            {/* Render Recommended First */}
            {userTemplates.filter(t => t.recommended).map(template => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTemplate === template.id
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-600 ring-offset-1'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                <Star className={`h-3.5 w-3.5 mr-1.5 ${selectedTemplate === template.id ? 'text-blue-200' : 'text-blue-500'}`} />
                {template.name}
              </button>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

            {/* Render Other Templates */}
            {userTemplates.filter(t => !t.recommended).map(template => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTemplate === template.id
                    ? 'bg-gray-800 text-white shadow-md ring-2 ring-gray-800 ring-offset-1'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Canvas Area */}
      <div className="flex-1 overflow-auto bg-gray-200/50 p-4 sm:p-8 flex justify-center items-start">
        <div 
          className="origin-top transition-transform duration-300 ease-out flex justify-center"
          style={{ transform: `scale(${previewScale})` }}
        >
          <div 
            className="bg-white shadow-2xl relative"
            style={{ width: '800px', minHeight: '1056px' }}
          >
            <div id="resume-for-pdf" className="w-full h-full bg-white">
              <TemplateComponent data={data} showPhoto={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;