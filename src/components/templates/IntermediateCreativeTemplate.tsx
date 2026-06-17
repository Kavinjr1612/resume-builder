import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  showPhoto?: boolean;
}

const IntermediateCreativeTemplate: React.FC<Props> = ({ data, showPhoto }) => {
  const { personalInfo, summary, education, experience, skills, projects, technicalSkills, softSkills } = data;

  return (
    <div className="font-sans text-gray-800 bg-white max-w-[800px] mx-auto flex shadow-sm border border-gray-200" style={{ minHeight: '1056px' }}>
      {/* Left Sidebar */}
      <div className="w-1/3 bg-teal-800 text-white p-8 flex flex-col">
        {showPhoto && (personalInfo?.photo || !personalInfo?.name) && (
          <div className="mb-6 flex justify-center">
            {personalInfo?.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-teal-600" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-teal-700 border-4 border-teal-600 flex items-center justify-center text-sm text-teal-300">
                [Photo]
              </div>
            )}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-teal-600 pb-2">Contact</h2>
          <div className="space-y-3 text-sm text-teal-100">
            <div>{personalInfo?.email || '[Email Address]'}</div>
            <div>{personalInfo?.phone || '[Phone Number]'}</div>
            <div>{personalInfo?.location || '[Location]'}</div>
            {(personalInfo?.linkedin || !personalInfo?.name) && <div>{personalInfo?.linkedin || '[LinkedIn]'}</div>}
            {(personalInfo?.github || !personalInfo?.name) && <div>{personalInfo?.github || '[GitHub]'}</div>}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-teal-600 pb-2">Skills</h2>
          {technicalSkills && technicalSkills.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-teal-200 mb-2 uppercase">Technical</h3>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill, i) => <span key={i} className="text-xs bg-teal-700 px-2 py-1 rounded">{skill}</span>)}
              </div>
            </div>
          )}
          {softSkills && softSkills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-teal-200 mb-2 uppercase">Professional</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, i) => <span key={i} className="text-xs bg-teal-700 px-2 py-1 rounded">{skill}</span>)}
              </div>
            </div>
          )}
          {(!technicalSkills?.length && !softSkills?.length) && (
            <div className="opacity-60">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-teal-700 px-2 py-1 rounded">[Skill 1]</span>
                <span className="text-xs bg-teal-700 px-2 py-1 rounded">[Skill 2]</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-teal-600 pb-2">Education</h2>
          {education?.length > 0 ? (
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="text-sm">
                  <div className="font-bold text-teal-100">{edu.degree || '[Degree]'}</div>
                  <div className="text-teal-200">{edu.institution || '[Institution]'}</div>
                  <div className="text-xs text-teal-400 mt-1">{edu.startDate || '[Start]'} - {edu.endDate || '[End]'}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm opacity-60">
              <div className="font-bold text-teal-100">[Degree]</div>
              <div className="text-teal-200">[Institution]</div>
              <div className="text-xs text-teal-400 mt-1">[Start] - [End]</div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            {personalInfo?.name || '[Your Full Name]'}
          </h1>
          <h2 className="text-xl text-teal-700 font-medium tracking-wide">Professional Profile</h2>
        </div>

        <div className="mb-8">
          <p className="text-sm leading-relaxed text-gray-600 text-justify">
            {summary || '[Write a compelling professional summary highlighting your core expertise, intermediate experience, and what unique value you bring to your next role.]'}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 flex items-center">
            <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-3 text-sm">Briefcase</span>
            Work Experience
          </h2>
          {experience?.length > 0 ? (
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{exp.position || '[Position]'}</h3>
                    <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                      {exp.startDate || '[Start]'} - {exp.isCurrentJob ? 'Present' : (exp.endDate || '[End]')}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{exp.company || '[Company]'}</div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description || '[Description of responsibilities]'}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="opacity-60">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold text-gray-800">[Position]</h3>
                <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">[Start] - [End]</span>
              </div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">[Company]</div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">[Description of responsibilities and achievements]</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 flex items-center">
            <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-3 text-sm">Code</span>
            Key Projects
          </h2>
          {projects?.length > 0 ? (
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="text-base font-bold text-gray-800">{proj.name || '[Project Name]'}</h3>
                  <div className="text-xs text-teal-600 mb-1">{proj.technologies || '[Tech Stack]'}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{proj.description || '[Project Description]'}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="opacity-60">
              <h3 className="text-base font-bold text-gray-800">[Project Name]</h3>
              <div className="text-xs text-teal-600 mb-1">[Tech Stack]</div>
              <p className="text-sm text-gray-600 leading-relaxed">[Project Description]</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default IntermediateCreativeTemplate;
