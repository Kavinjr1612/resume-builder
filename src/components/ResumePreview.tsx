import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types/resume';
import { ArrowLeft, Download, Edit2, Eye, Layout, CheckCircle, Star } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left/Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
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

      {/* Right Sidebar - Template Selection */}
      <div className="w-full lg:w-80 xl:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex-shrink-0 h-auto lg:h-screen overflow-y-auto">
        <div className="p-6">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Layout className="h-5 w-5 mr-2 text-blue-600" />
              Templates
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Based on your data, we identified you as a <strong className="text-blue-600 capitalize">{userLevel}</strong> level candidate.
            </p>
          </div>

          <div className="space-y-6">
            {/* Recommended Templates First */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1.5" />
                Recommended for You
              </h3>
              <div className="space-y-4">
                {userTemplates.filter(t => t.recommended).map(template => (
                  <div 
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`cursor-pointer rounded-xl border-2 transition-all p-2 ${
                      selectedTemplate === template.id 
                        ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-600/10' 
                        : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="relative aspect-[1/1.2] w-full rounded-lg overflow-hidden border border-gray-200 mb-2 bg-white">
                      <img src={template.preview} alt={template.name} className="w-full h-full object-cover opacity-80" />
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow-md">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <p className={`text-center font-medium text-sm ${selectedTemplate === template.id ? 'text-blue-700' : 'text-gray-700'}`}>
                      {template.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Templates */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Other Templates
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {userTemplates.filter(t => !t.recommended).map(template => (
                  <div 
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`cursor-pointer rounded-lg border-2 transition-all p-1.5 ${
                      selectedTemplate === template.id 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="aspect-[1/1.2] w-full rounded border border-gray-200 mb-1 overflow-hidden bg-white">
                      <img src={template.preview} alt={template.name} className="w-full h-full object-cover opacity-70" />
                    </div>
                    <p className="text-center text-xs font-medium text-gray-600 truncate px-1">
                      {template.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;