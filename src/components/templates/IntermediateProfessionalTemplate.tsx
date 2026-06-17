import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  showPhoto?: boolean;
}

const IntermediateProfessionalTemplate: React.FC<Props> = ({ data, showPhoto }) => {
  const { personalInfo, summary, education, experience, skills, projects, technicalSkills, softSkills } = data;

  return (
    <div className="font-sans text-gray-800 bg-white p-10 max-w-[800px] mx-auto border border-gray-200 shadow-sm" style={{ height: '1131px' }}>
      {/* Header */}
      <div className="flex border-b-4 border-indigo-700 pb-6 mb-6">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase mb-2">
            {personalInfo?.name || '[Your Full Name]'}
          </h1>
          <div className="text-sm font-medium text-gray-600 flex flex-col gap-1">
            <div className="flex gap-4">
              <span>{personalInfo?.email || '[Email Address]'}</span>
              <span>{personalInfo?.phone || '[Phone Number]'}</span>
            </div>
            <div className="flex gap-4">
              <span>{personalInfo?.location || '[Location]'}</span>
              {(personalInfo?.linkedin || !personalInfo?.name) && <span>{personalInfo?.linkedin || '[LinkedIn URL]'}</span>}
              {(personalInfo?.github || !personalInfo?.name) && <span>{personalInfo?.github || '[GitHub URL]'}</span>}
            </div>
          </div>
        </div>
        {showPhoto && (personalInfo?.photo || !personalInfo?.name) && (
          <div className="ml-6 flex-shrink-0">
            {personalInfo?.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-24 h-28 object-cover shadow-sm border border-gray-300" />
            ) : (
              <div className="w-24 h-28 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-500">
                [Photo]
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-indigo-800 uppercase tracking-widest mb-3 flex items-center">
          <span className="w-4 h-4 bg-indigo-700 mr-2"></span>Professional Summary
        </h2>
        <p className="text-sm leading-relaxed text-gray-700 text-justify">
          {summary || '[Write a clear, concise professional summary. Emphasize your key skills, past achievements, and the value you bring as a professional.]'}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-indigo-800 uppercase tracking-widest mb-3 flex items-center">
          <span className="w-4 h-4 bg-indigo-700 mr-2"></span>Professional Experience
        </h2>
        {experience?.length > 0 ? (
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">{exp.position || '[Position Title]'}</h3>
                  <span className="text-sm font-semibold text-gray-600">{exp.startDate || '[Start Date]'} - {exp.isCurrentJob ? 'Present' : (exp.endDate || '[End Date]')}</span>
                </div>
                <div className="text-sm font-bold text-indigo-700 mb-2">{exp.company || '[Company Name]'}</div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-indigo-100">
                  {exp.description || '[Describe your responsibilities, key achievements, and the impact of your work.]'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60 space-y-5">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-gray-900">[Position Title]</h3>
                <span className="text-sm font-semibold text-gray-600">[Start Date] - [End Date]</span>
              </div>
              <div className="text-sm font-bold text-indigo-700 mb-2">[Company Name]</div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-indigo-100">
                [Describe your responsibilities, key achievements, and the impact of your work.]
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-indigo-800 uppercase tracking-widest mb-3 flex items-center">
          <span className="w-4 h-4 bg-indigo-700 mr-2"></span>Skills & Expertise
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-bold mb-1 text-gray-900">Technical</h4>
            {technicalSkills && technicalSkills.length > 0 ? (
              <ul className="list-disc list-inside">
                {technicalSkills.slice(0, 6).map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            ) : (
              <ul className="list-disc list-inside opacity-60">
                <li>[Skill 1]</li>
                <li>[Skill 2]</li>
              </ul>
            )}
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900">Professional</h4>
            {softSkills && softSkills.length > 0 ? (
              <ul className="list-disc list-inside">
                {softSkills.slice(0, 6).map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            ) : (
              <ul className="list-disc list-inside opacity-60">
                <li>[Skill 1]</li>
                <li>[Skill 2]</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-indigo-800 uppercase tracking-widest mb-3 flex items-center">
          <span className="w-4 h-4 bg-indigo-700 mr-2"></span>Education
        </h2>
        {education?.length > 0 ? (
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{edu.degree || '[Degree]'} in {edu.field || '[Field]'}</h3>
                  <div className="text-sm font-medium text-gray-700">{edu.institution || '[Institution Name]'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-600">{edu.startDate || '[Start]'} - {edu.endDate || '[End]'}</div>
                  {edu.gpa && <div className="text-sm text-gray-500">GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="opacity-60 flex justify-between items-start">
            <div>
              <h3 className="text-base font-bold text-gray-900">[Degree] in [Field]</h3>
              <div className="text-sm font-medium text-gray-700">[Institution Name]</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-600">[Start] - [End]</div>
              <div className="text-sm text-gray-500">GPA: [0.0]</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default IntermediateProfessionalTemplate;
