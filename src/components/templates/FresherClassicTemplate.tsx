import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  showPhoto?: boolean;
}

const FresherClassicTemplate: React.FC<Props> = ({ data, showPhoto }) => {
  const { personalInfo, summary, education, experience, skills, projects, technicalSkills, softSkills } = data;

  return (
    <div className="font-serif text-gray-900 bg-white p-10 max-w-[800px] mx-auto border border-gray-200 shadow-sm" style={{ minHeight: '1056px' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-6 mb-6 relative">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-3">
          {personalInfo?.name || '[Your Full Name]'}
        </h1>
        <div className="text-sm flex flex-wrap justify-center gap-3">
          <span>{personalInfo?.email || '[Email Address]'}</span>
          <span>•</span>
          <span>{personalInfo?.phone || '[Phone Number]'}</span>
          <span>•</span>
          <span>{personalInfo?.location || '[Location]'}</span>
        </div>
        <div className="text-sm flex flex-wrap justify-center gap-3 mt-1">
          {(personalInfo?.linkedin || !personalInfo?.name) && (
            <span>{personalInfo?.linkedin || '[LinkedIn URL]'}</span>
          )}
          {(personalInfo?.linkedin && personalInfo?.github) && <span>•</span>}
          {(personalInfo?.github || !personalInfo?.name) && (
            <span>{personalInfo?.github || '[GitHub URL]'}</span>
          )}
        </div>
        
        {showPhoto && (personalInfo?.photo || !personalInfo?.name) && (
          <div className="absolute top-0 right-0">
            {personalInfo?.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-20 h-24 object-cover border border-gray-400" />
            ) : (
              <div className="w-20 h-24 bg-gray-100 border border-gray-400 flex items-center justify-center text-xs text-gray-500">
                [Photo]
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Objective</h2>
        <p className="text-sm leading-relaxed text-justify">
          {summary || '[State your career objective clearly. Focus on how your academic background and skills align with the goals of the organization you are applying to.]'}
        </p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Education</h2>
        {education?.length > 0 ? (
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold">{edu.institution || '[Institution Name]'}</h3>
                  <span className="text-sm">{edu.startDate || '[Start]'} - {edu.endDate || '[End]'}</span>
                </div>
                <div className="flex justify-between items-baseline text-sm mt-1">
                  <span className="italic">{edu.degree || '[Degree]'} in {edu.field || '[Field]'}</span>
                  <span className="font-medium">GPA: {edu.gpa || '[N/A]'}</span>
                </div>
                {edu.achievements && <p className="text-sm mt-1 text-justify">Relevant Coursework/Achievements: {edu.achievements}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60">
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-bold">[Institution Name]</h3>
              <span className="text-sm">[Start Date] - [End Date]</span>
            </div>
            <div className="flex justify-between items-baseline text-sm mt-1">
              <span className="italic">[Degree] in [Field of Study]</span>
              <span className="font-medium">GPA: [3.8/4.0]</span>
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Academic Projects</h2>
        {projects?.length > 0 ? (
          <ul className="list-disc list-outside pl-5 space-y-3">
            {projects.map(proj => (
              <li key={proj.id} className="text-sm">
                <span className="font-bold">{proj.name || '[Project Name]'}</span> 
                <span className="italic ml-1">({proj.technologies || '[Technologies]'})</span>
                <p className="mt-1 text-justify">{proj.description || '[Project Description]'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="list-disc list-outside pl-5 space-y-3 opacity-60">
            <li className="text-sm">
              <span className="font-bold">[Project Name]</span> <span className="italic">([Technologies Used])</span>
              <p className="mt-1 text-justify">[Describe the project, your role, and the outcome.]</p>
            </li>
          </ul>
        )}
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Experience</h2>
        {experience?.length > 0 ? (
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold">{exp.company || '[Company Name]'}</h3>
                  <span className="text-sm">{exp.startDate || '[Start]'} - {exp.isCurrentJob ? 'Present' : (exp.endDate || '[End]')}</span>
                </div>
                <div className="text-sm italic mb-2">{exp.position || '[Position Title]'}</div>
                <p className="text-sm text-justify whitespace-pre-wrap">{exp.description || '[Job Description]'}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60">
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-bold">[Company Name]</h3>
              <span className="text-sm">[Start] - [End]</span>
            </div>
            <div className="text-sm italic mb-2">[Position Title]</div>
            <p className="text-sm text-justify">[Job Description]</p>
          </div>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Skills & Competencies</h2>
        <div className="text-sm">
          {technicalSkills && technicalSkills.length > 0 && (
            <div className="mb-1"><span className="font-bold">Technical: </span>{technicalSkills.join(', ')}</div>
          )}
          {softSkills && softSkills.length > 0 && (
            <div><span className="font-bold">Soft Skills: </span>{softSkills.join(', ')}</div>
          )}
          {(!technicalSkills?.length && !softSkills?.length && skills?.length > 0) && (
            <div><span className="font-bold">Core Competencies: </span>{skills.join(', ')}</div>
          )}
          {(!technicalSkills?.length && !softSkills?.length && !skills?.length) && (
            <div className="opacity-60"><span className="font-bold">Core Competencies: </span>[Skill 1], [Skill 2], [Skill 3]</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FresherClassicTemplate;
