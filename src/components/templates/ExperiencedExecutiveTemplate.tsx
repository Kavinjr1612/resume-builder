import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  showPhoto?: boolean;
}

const ExperiencedExecutiveTemplate: React.FC<Props> = ({ data, showPhoto }) => {
  const { personalInfo, summary, education, experience, skills, projects, technicalSkills, softSkills } = data;

  return (
    <div className="font-serif text-gray-900 bg-white p-12 max-w-[800px] mx-auto border border-gray-300 shadow-md relative" style={{ minHeight: '1056px' }}>
      
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 w-full h-3 bg-slate-800"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div className="flex-1 border-r-2 border-slate-200 pr-6 mr-6">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-wide mb-2">
            {personalInfo?.name || '[Your Full Name]'}
          </h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Executive Profile</p>
        </div>
        
        <div className="text-right text-xs space-y-1 text-slate-700 font-sans w-1/3">
          <div>{personalInfo?.email || '[Email Address]'}</div>
          <div>{personalInfo?.phone || '[Phone Number]'}</div>
          <div>{personalInfo?.location || '[Location]'}</div>
          {(personalInfo?.linkedin || !personalInfo?.name) && <div>{personalInfo?.linkedin || '[LinkedIn]'}</div>}
        </div>

        {showPhoto && (personalInfo?.photo || !personalInfo?.name) && (
          <div className="ml-6 flex-shrink-0">
            {personalInfo?.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-slate-200" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 shadow-inner flex items-center justify-center text-xs text-slate-400">
                [Photo]
              </div>
            )}
          </div>
        )}
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <p className="text-base leading-relaxed text-justify font-medium text-slate-800 drop-cap">
          <span className="float-left text-5xl font-black text-slate-800 mr-2 mt-1 leading-none border-b-4 border-slate-800 pb-1">
            {summary ? summary.charAt(0) : '['}
          </span>
          {summary ? summary.substring(1) : 'Write a commanding executive summary that encapsulates your leadership experience, strategic vision, and significant business impact. Focus on metrics, transformation, and high-level value. Keep it succinct but powerful.]'}
        </p>
      </div>

      {/* Core Competencies (Skills) */}
      <div className="mb-8 border-y border-slate-200 py-4">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center mb-3">Core Competencies</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-slate-800">
          {((technicalSkills && technicalSkills.length > 0) || (softSkills && softSkills.length > 0)) ? (
            <>
              {technicalSkills?.slice(0,5).map((skill, i) => <span key={`t-${i}`}>• {skill}</span>)}
              {softSkills?.slice(0,5).map((skill, i) => <span key={`s-${i}`}>• {skill}</span>)}
            </>
          ) : (
             <span className="opacity-60">• [Competency 1] • [Competency 2] • [Competency 3] • [Competency 4]</span>
          )}
        </div>
      </div>

      {/* Professional Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-800 mb-6 pb-2">Professional Experience</h2>
        {experience?.length > 0 ? (
          <div className="space-y-8">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-xl font-black text-slate-900">{exp.company || '[Company Name]'}</h3>
                  <span className="text-sm font-bold text-slate-600 font-sans tracking-wide">{exp.startDate || '[Start]'} — {exp.isCurrentJob ? 'Present' : (exp.endDate || '[End]')}</span>
                </div>
                <div className="text-base font-bold italic text-slate-700 mb-3">{exp.position || '[Executive Title]'}</div>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  {exp.description || '[Detail your strategic initiatives, operational improvements, revenue growth, team leadership, and major milestones achieved during your tenure.]'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60 space-y-8">
            <div>
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-xl font-black text-slate-900">[Company Name]</h3>
                <span className="text-sm font-bold text-slate-600 font-sans tracking-wide">[Start] — [End]</span>
              </div>
              <div className="text-base font-bold italic text-slate-700 mb-3">[Executive Title]</div>
              <p className="text-sm text-slate-700 leading-relaxed text-justify">
                [Detail your strategic initiatives, operational improvements, revenue growth, team leadership, and major milestones achieved during your tenure.]
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Education & Credentials */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-800 mb-4 pb-2">Education & Credentials</h2>
        {education?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {education.map(edu => (
              <div key={edu.id}>
                <h3 className="text-base font-bold text-slate-900">{edu.degree || '[Degree]'} in {edu.field || '[Field]'}</h3>
                <div className="text-sm font-medium italic text-slate-700">{edu.institution || '[Institution Name]'}</div>
                <div className="text-sm text-slate-500 font-sans">{edu.startDate || '[Start]'} — {edu.endDate || '[End]'}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 opacity-60">
            <div>
              <h3 className="text-base font-bold text-slate-900">[Degree] in [Field]</h3>
              <div className="text-sm font-medium italic text-slate-700">[Institution Name]</div>
              <div className="text-sm text-slate-500 font-sans">[Start] — [End]</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ExperiencedExecutiveTemplate;
