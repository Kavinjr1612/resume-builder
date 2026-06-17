import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  showPhoto?: boolean;
}

const BoxedTemplate: React.FC<Props> = ({ data, showPhoto }) => {
  const { personalInfo, summary, education, experience, skills, projects, technicalSkills, softSkills } = data;

  // Render a boxed layout with borders
  return (
    <div className="font-sans text-gray-800 bg-white p-8 max-w-[800px] mx-auto border-2 border-gray-800 shadow-sm" style={{ height: '1131px' }}>
      {/* Header section */}
      <div className="border-b-2 border-gray-800 pb-6 mb-6 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
            {personalInfo?.name || '[Your Full Name]'}
          </h1>
          <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1 mt-3">
            <span>{personalInfo?.email || '[Email Address]'}</span>
            <span>•</span>
            <span>{personalInfo?.phone || '[Phone Number]'}</span>
            <span>•</span>
            <span>{personalInfo?.location || '[City, State]'}</span>
            {(personalInfo?.linkedin || !personalInfo?.name) && (
              <>
                <span>•</span>
                <span>{personalInfo?.linkedin || '[LinkedIn URL]'}</span>
              </>
            )}
            {(personalInfo?.github || !personalInfo?.name) && (
              <>
                <span>•</span>
                <span>{personalInfo?.github || '[GitHub URL]'}</span>
              </>
            )}
          </div>
        </div>
        {showPhoto && (personalInfo?.photo || !personalInfo?.name) && (
          <div className="ml-6 flex-shrink-0">
            {personalInfo?.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-lg object-cover border border-gray-300" />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center text-xs text-gray-400 text-center p-2">
                [Photo]
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Professional Summary</h2>
        <p className="text-sm leading-relaxed text-gray-700 text-justify">
          {summary || '[Write a brief professional summary here. Highlight your key strengths, goals, and what you bring to the role. Keep it between 3-5 sentences.]'}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Work Experience</h2>
        {experience?.length > 0 ? (
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-semibold text-gray-900">{exp.position || '[Position Title]'}</h3>
                  <span className="text-sm font-medium text-gray-600">{exp.startDate || '[Start Date]'} - {exp.isCurrentJob ? 'Present' : (exp.endDate || '[End Date]')}</span>
                </div>
                <div className="text-sm font-medium text-gray-700 mb-2">{exp.company || '[Company Name]'}</div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {exp.description || '[Describe your responsibilities and achievements in this role. Use bullet points for readability.]'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base font-semibold text-gray-900">[Position Title]</h3>
              <span className="text-sm font-medium text-gray-600">[Start Date] - [End Date]</span>
            </div>
            <div className="text-sm font-medium text-gray-700 mb-2">[Company Name]</div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              [Describe your responsibilities and achievements in this role. Use bullet points for readability.]
            </p>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Education</h2>
        {education?.length > 0 ? (
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-semibold text-gray-900">{edu.degree || '[Degree]'} in {edu.field || '[Field of Study]'}</h3>
                  <span className="text-sm font-medium text-gray-600">{edu.startDate || '[Start]'} - {edu.endDate || '[End]'}</span>
                </div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="font-medium text-gray-700">{edu.institution || '[Institution Name]'}</span>
                  {edu.gpa && <span className="text-gray-600">GPA: {edu.gpa}</span>}
                </div>
                {edu.achievements && (
                  <p className="text-sm text-gray-600 mt-1">{edu.achievements}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base font-semibold text-gray-900">[Degree] in [Field of Study]</h3>
              <span className="text-sm font-medium text-gray-600">[Start] - [End]</span>
            </div>
            <div className="flex justify-between items-baseline text-sm">
              <span className="font-medium text-gray-700">[Institution Name]</span>
              <span className="text-gray-600">GPA: [0.0/4.0]</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">[Relevant Coursework or Academic Achievements]</p>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Projects</h2>
        {projects?.length > 0 ? (
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {proj.name || '[Project Name]'}
                    {proj.link && <a href={proj.link} className="text-blue-600 ml-2 text-sm font-normal">[Link]</a>}
                  </h3>
                  <span className="text-sm font-medium text-gray-600">{proj.technologies || '[Technologies Used]'}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {proj.description || '[Describe what the project does, your role, and the impact it had.]'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base font-semibold text-gray-900">
                [Project Name]
              </h3>
              <span className="text-sm font-medium text-gray-600">[Technologies Used]</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              [Describe what the project does, your role, and the impact it had.]
            </p>
          </div>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Skills</h2>
        
        {((technicalSkills && technicalSkills.length > 0) || (softSkills && softSkills.length > 0)) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalSkills && technicalSkills.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, index) => (
                    <span key={index} className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {softSkills && softSkills.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <span key={index} className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : skills && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 opacity-60">
            <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">[Skill 1]</span>
            <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">[Skill 2]</span>
            <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">[Skill 3]</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxedTemplate;
