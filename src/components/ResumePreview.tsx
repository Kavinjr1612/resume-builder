import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types/resume';
import { ArrowLeft, Download, Edit2, Eye, CheckCircle, Star, AlertCircle, Check, FileText, Lightbulb, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import { trackResumeEvents } from '../utils/analytics';
import { 
  getTemplatesForUser, 
  getRecommendedTemplate, 
  determineUserLevel,
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
  const [includePhoto, setIncludePhoto] = useState(true);
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const currentTemplate = userTemplates.find(t => t.id === selectedTemplate) || recommendedTemplate;
  const TemplateComponent = currentTemplate.component;

  const handleZoomIn = () => setPreviewScale(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setPreviewScale(prev => Math.max(prev - 0.1, 0.3));
  const handleZoomReset = () => setPreviewScale(getPreviewScale());

  const getPreviewScale = () => {
    if (typeof window === 'undefined') return 0.8;
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) return 0.45;
    if (screenWidth < 1024) return 0.65;
    if (screenWidth < 1536) return 0.85;
    return 1;
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
      const fileName = `${(data.personalInfo?.name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
      await generatePDF('resume-for-pdf', data, fileName);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Failed to generate PDF. Server says: ${errorMessage}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const visibleTemplates = showAllTemplates ? userTemplates : userTemplates.filter(t => t.recommended);

  const getProfileDescription = () => {
    if (userLevel === 'fresher') return 'Templates emphasize education, projects, and potential';
    if (userLevel === 'intermediate') return 'Templates emphasize balanced experience and skill progression';
    return 'Templates emphasize leadership, major achievements, and executive impact';
  };

  const getProfileTitle = () => {
    if (userLevel === 'fresher') return 'Fresh Graduate';
    if (userLevel === 'intermediate') return 'Mid-Level Professional';
    return 'Experienced Executive';
  };

  return (
    <div className="h-screen bg-slate-50 font-sans flex flex-col font-sans overflow-hidden">
      
      {/* TOP HEADER (FULL WIDTH) */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0 z-20 shadow-sm relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-sm font-semibold text-slate-600 hover:text-slate-900 font-display flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-slate-900 font-display leading-tight">Resume Preview</h1>
                <p className="text-xs text-slate-500 font-medium">Your professional resume is ready!</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={onEdit} className="bg-gray-100 hover:bg-gray-200 text-slate-700 text-sm font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors">
              <Edit2 className="w-4 h-4" /> Edit Resume
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-8 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" /> {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>
        </div>
        
        {/* Sub-header Badges */}
        <div className="flex flex-wrap items-center gap-3 mt-4 max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" /> Resume Complete
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" /> ATS Optimized
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" /> {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)}-Optimized
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full">
            <FileText className="w-3.5 h-3.5" /> PDF Ready
          </span>
        </div>
      </div>

      {/* 3-COLUMN MAIN LAYOUT */}
      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* LEFT SIDEBAR (Templates) */}
        <div className="hidden md:block w-[280px] lg:w-[300px] xl:w-[320px] flex-shrink-0 bg-transparent p-4 overflow-y-auto space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5">
              <h2 className="text-base font-bold flex items-center gap-2 mb-1">
                <Lightbulb className="w-5 h-5" />
                Smart Template Selection
              </h2>
              <p className="text-xs text-slate-300 opacity-90 leading-relaxed">
                Templates optimized for {userLevel === 'fresher' ? 'fresh graduates' : 'professionals'}
              </p>
            </div>
            
            <div className="p-4 lg:p-5">
              {/* Detected Profile */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
                <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Detected Profile: {getProfileTitle()}
                </h3>
                <p className="text-xs text-blue-600/80 leading-relaxed">
                  {getProfileDescription()}
                </p>
              </div>

              {/* Template List */}
              <div className="space-y-3 mb-4">
                {visibleTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`w-full text-left p-3.5 rounded-lg flex justify-between items-center transition-all ${
                      selectedTemplate === template.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-50 text-slate-700 border border-gray-100 hover:bg-gray-100 hover:border-slate-200'
                    }`}
                  >
                    <div>
                      <div className={`text-sm font-bold ${selectedTemplate === template.id ? 'text-white' : 'text-slate-900 font-display'}`}>
                        {template.name}
                      </div>
                      <div className={`text-xs mt-0.5 flex items-center gap-1.5 ${selectedTemplate === template.id ? 'text-blue-200' : 'text-slate-500'}`}>
                        <FileText className="w-3.5 h-3.5" />
                        {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                      </div>
                    </div>
                    {template.recommended && (
                      <Star className={`w-4 h-4 ${selectedTemplate === template.id ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* Show All Toggle */}
              {!showAllTemplates && (
                <button 
                  onClick={() => setShowAllTemplates(true)}
                  className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-800 py-2 mb-4"
                >
                  Show All Templates
                </button>
              )}

              {/* Photo Toggle */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                <input
                  type="checkbox"
                  checked={includePhoto}
                  onChange={(e) => setIncludePhoto(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div>
                  <label className="text-sm font-bold text-gray-800 cursor-pointer">Include photo</label>
                  <p className="text-xs text-slate-500 mt-0.5">Available for this template</p>
                </div>
              </div>

              {/* Template Info Text */}
              <div className="bg-blue-50/50 p-4 rounded-lg text-xs leading-relaxed text-blue-800 border border-blue-100/50">
                <span className="font-bold">{currentTemplate.name}: </span>
                A perfectly structured design optimized for your career level and industry standards.
              </div>
            </div>
          </div>
        </div>

        {/* CENTER CANVAS AREA */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Zoom Controls (Floating Left) */}
          <div className="hidden lg:flex flex-col gap-3 sticky top-4 left-0 z-10 bg-white p-2 rounded-xl shadow-lg border border-slate-200 h-fit mr-4 flex-shrink-0">
            <button onClick={handleZoomIn} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" title="Zoom In">
              <ZoomIn className="w-5 h-5" />
            </button>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <button onClick={handleZoomReset} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" title="Fit to Screen">
              <Maximize className="w-5 h-5" />
            </button>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <button onClick={handleZoomOut} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" title="Zoom Out">
              <ZoomOut className="w-5 h-5" />
            </button>
            <div className="text-center mt-2 text-xs font-bold text-slate-500">
              {Math.round(previewScale * 100)}%
            </div>
          </div>

          <div className="w-full max-w-5xl">
            
            {/* White Container Header */}
            <div className="bg-indigo-50/50 rounded-t-xl border border-indigo-100 p-6 flex justify-between items-start mb-0 border-b-0">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-display mb-1">Your Professional Resume</h2>
                <p className="text-sm text-slate-600 font-medium">Browser preview - Download for perfect A4 formatting</p>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Preview Mode
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3 h-3" /> PDF Ready
                </span>
              </div>
            </div>

            {/* Preview Notice Banner */}
            <div className="bg-amber-50 border-x border-amber-100 p-4 border-t border-b flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-900 mb-1">Preview Notice</h3>
                <p className="text-xs text-amber-800 leading-relaxed mb-2">
                  This preview is <strong className="text-amber-900">scaled for browser viewing</strong>. Your downloaded PDF will maintain <strong className="text-amber-900">professional A4 formatting</strong> with proper margins, fonts, and spacing optimized for printing and ATS systems.
                </p>
                <div className="flex gap-4 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> A4 Standard</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Print Ready</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> ATS Compatible</span>
                </div>
              </div>
            </div>

            {/* The Actual Resume Canvas */}
            <div className="bg-gray-100/50 border-x border-slate-200 py-10 flex justify-center overflow-hidden">
              <div 
                id="resume-scaled-container"
                className="origin-top transition-transform duration-300 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                style={{ transform: `scale(${previewScale})`, marginBottom: `-${(1 - previewScale) * 1131}px` }}
              >
                <div 
                  className="bg-white relative overflow-hidden"
                  style={{ width: '800px', height: '1131px' }}
                >
                  <div id="resume-for-pdf" className="w-full h-full bg-white">
                    <TemplateComponent data={data} showPhoto={includePhoto} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Download Bar */}
            <div className="bg-white border border-slate-200 rounded-b-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm mb-10">
              <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> A4 Format (210×297mm)</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> High Resolution</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Professional Fonts</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> ATS Optimized</span>
              </div>
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT SIDEBAR (Floating Info Cards) */}
        <div className="hidden xl:block w-[280px] lg:w-[300px] xl:w-[320px] flex-shrink-0 bg-transparent p-4 overflow-y-auto space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* PDF Quality Guarantee Card */}
          <div className="bg-white border border-indigo-100 rounded-xl p-5 shadow-sm">
            <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-indigo-900 mb-3">PDF Quality Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              The preview is <strong className="text-indigo-900">scaled for browser viewing</strong>. Your downloaded PDF will be in <strong className="text-indigo-900">perfect A4 format</strong> with professional spacing, fonts, and layout.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> A4 Standard Format (210×297mm)
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-500" /> ATS-Compatible Structure
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Star className="w-4 h-4 text-purple-500" /> High-Resolution Output
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-bold p-3 rounded-lg flex items-start gap-2 shadow-sm">
              <Lightbulb className="w-4 h-4 flex-shrink-0 text-yellow-500" />
              <span>Pro Tip: Download and review your PDF for the true professional format</span>
            </div>
          </div>

          {/* Level Specific Tips */}
          <div className="bg-white border border-purple-100 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2 mb-4 bg-purple-50 p-2 rounded-lg inline-flex">
              <Star className="w-4 h-4 text-purple-600" /> {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                <span>{userLevel === 'fresher' ? 'Highlight academic projects and achievements' : 'Focus on quantifiable achievements and metrics'}</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                <span>{userLevel === 'fresher' ? 'Emphasize relevant coursework and skills' : 'Highlight leadership and cross-functional collaboration'}</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                <span>{userLevel === 'fresher' ? 'Include internships and volunteer work' : 'Ensure keywords match the job description (ATS friendly)'}</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                <span>Proofread carefully before submitting</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumePreview;