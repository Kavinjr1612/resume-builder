import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  showPhoto?: boolean;
}

const ExperiencedMinimalTemplate: React.FC<Props> = ({ data, showPhoto }) => {
  const { personalInfo, summary, education, experience, skills, projects, technicalSkills, softSkills } = data;

  return (
    <div className="font-sans text-gray-800 bg-white p-12 max-w-[800px] mx-auto border border-gray-100 shadow-sm overflow-hidden" style={{ height: '1131px' }}>
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-light text-gray-900 tracking-widest uppercase mb-4">
          {personalInfo?.name || '[Your Name]'}
        </h1>
        <div className="text-xs tracking-widest text-gray-400 uppercase flex flex-wrap justify-center gap-x-4 gap-y-2">
          <span>{personalInfo?.email || '[Email]'}</span>
          <span>{personalInfo?.phone || '[Phone]'}</span>
          <span>{personalInfo?.location || '[Location]'}</span>
          {(personalInfo?.linkedin || !personalInfo?.name) && <span>{personalInfo?.linkedin || '[LinkedIn]'}</span>}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-10 text-center px-10">
        <p className="text-sm leading-relaxed text-gray-500 font-light">
          {summary || '[A minimalist summary focusing on high-level achievements, years of experience, and your core value proposition. Avoid fluff and focus on impactful, concrete statements.]'}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Experience</h2>
        {experience?.length > 0 ? (
          <div className="space-y-8">
            {experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-xs text-gray-400 font-medium tracking-wide mt-1">
                  {exp.startDate || '[Start]'} — {exp.isCurrentJob ? 'Present' : (exp.endDate || '[End]')}
                </div>
                <div className="col-span-9">
                  <h3 className="text-base font-semibold text-gray-900">{exp.position || '[Position Title]'}</h3>
                  <div className="text-sm text-gray-500 mb-2">{exp.company || '[Company Name]'}</div>
                  <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                    {exp.description || '[Concise description of key achievements and responsibilities.]'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 opacity-60">
            <div className="col-span-3 text-xs text-gray-400 font-medium tracking-wide mt-1">
              [Start] — [End]
            </div>
            <div className="col-span-9">
              <h3 className="text-base font-semibold text-gray-900">[Position Title]</h3>
              <div className="text-sm text-gray-500 mb-2">[Company Name]</div>
              <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                [Concise description of key achievements and responsibilities.]
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Education</h2>
        {education?.length > 0 ? (
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-xs text-gray-400 font-medium tracking-wide mt-1">
                  {edu.startDate || '[Start]'} — {edu.endDate || '[End]'}
                </div>
                <div className="col-span-9">
                  <h3 className="text-sm font-semibold text-gray-900">{edu.degree || '[Degree]'} — {edu.field || '[Field]'}</h3>
                  <div className="text-sm text-gray-500">{edu.institution || '[Institution]'}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 opacity-60">
            <div className="col-span-3 text-xs text-gray-400 font-medium tracking-wide mt-1">
              [Start] — [End]
            </div>
            <div className="col-span-9">
              <h3 className="text-sm font-semibold text-gray-900">[Degree] — [Field]</h3>
              <div className="text-sm text-gray-500">[Institution]</div>
            </div>
          </div>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Skills</h2>
        <div className="grid grid-cols-12 gap-4 text-sm font-light text-gray-600">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex flex-wrap gap-x-6 gap-y-2">
            {((technicalSkills && technicalSkills.length > 0) || (softSkills && softSkills.length > 0)) ? (
              <>
                {technicalSkills?.map((skill, i) => <span key={`t-${i}`}>{skill}</span>)}
                {softSkills?.map((skill, i) => <span key={`s-${i}`}>{skill}</span>)}
              </>
            ) : (
               <span className="opacity-60">[Skill 1]   [Skill 2]   [Skill 3]   [Skill 4]</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ExperiencedMinimalTemplate;
