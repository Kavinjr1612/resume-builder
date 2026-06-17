import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  showPhoto?: boolean;
}

const FresherModernTemplate: React.FC<Props> = ({ data, showPhoto }) => {
  const { personalInfo, summary, education, experience, skills, projects, technicalSkills, softSkills } = data;

  return (
    <div className="font-sans text-gray-800 bg-white p-8 max-w-[800px] mx-auto border border-gray-200 shadow-sm" style={{ minHeight: '1056px' }}>
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-50 p-6 rounded-lg mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {personalInfo?.name || '[Your Full Name]'}
          </h1>
          <div className="text-sm text-blue-800 flex flex-wrap gap-3 mt-2">
            <span>{personalInfo?.email || '[Email Address]'}</span>
            <span>|</span>
            <span>{personalInfo?.phone || '[Phone Number]'}</span>
            <span>|</span>
            <span>{personalInfo?.location || '[Location]'}</span>
            {(personalInfo?.linkedin || !personalInfo?.name) && (
              <>
                <span>|</span>
                <span>{personalInfo?.linkedin || '[LinkedIn]'}</span>
              </>
            )}
          </div>
        </div>
        {showPhoto && (personalInfo?.photo || !personalInfo?.name) && (
          <div className="flex-shrink-0 ml-4">
            {personalInfo?.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-xs text-blue-400">
                [Photo]
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mb-6">
        <p className="text-sm leading-relaxed text-gray-700 italic border-l-4 border-blue-500 pl-4 py-1">
          {summary || '[Professional Summary: As a fresher, highlight your passion, key skills learned during your studies, and your eagerness to contribute to a professional environment.]'}
        </p>
      </div>

      {/* Two Column Layout for Fresher: Left is Education & Projects, Right is Skills & Experience */}
      <div className="grid grid-cols-3 gap-8">
        
        {/* Main Column (2/3) */}
        <div className="col-span-2 space-y-6">
          {/* Education */}
          <div>
            <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-200 pb-1 mb-4 uppercase">Education</h2>
            {education?.length > 0 ? (
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-blue-100">
                    <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[5px] top-1.5"></div>
                    <h3 className="text-base font-bold text-gray-900">{edu.degree || '[Degree]'} in {edu.field || '[Field]'}</h3>
                    <div className="text-sm text-blue-600 font-medium">{edu.institution || '[Institution Name]'}</div>
                    <div className="text-xs text-gray-500 mb-1">{edu.startDate || '[Start]'} - {edu.endDate || '[End]'} | GPA: {edu.gpa || '[N/A]'}</div>
                    {edu.achievements && <p className="text-sm text-gray-700 mt-1">{edu.achievements}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative pl-4 border-l-2 border-blue-100 opacity-60">
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[5px] top-1.5"></div>
                <h3 className="text-base font-bold text-gray-900">[Degree] in [Field]</h3>
                <div className="text-sm text-blue-600 font-medium">[Institution Name]</div>
                <div className="text-xs text-gray-500 mb-1">[Start Date] - [End Date] | GPA: [3.8/4.0]</div>
                <p className="text-sm text-gray-700 mt-1">[Academic Achievements]</p>
              </div>
            )}
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-200 pb-1 mb-4 uppercase">Academic / Personal Projects</h2>
            {projects?.length > 0 ? (
              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-gray-900">{proj.name || '[Project Name]'}</h3>
                    </div>
                    <div className="text-xs font-semibold text-blue-600 mb-2">{proj.technologies || '[Technologies Used]'}</div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {proj.description || '[Describe what the project does, your role, and the impact it had.]'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 opacity-60">
                <h3 className="text-base font-bold text-gray-900">[Project Name]</h3>
                <div className="text-xs font-semibold text-blue-600 mb-2">[Technologies Used]</div>
                <p className="text-sm text-gray-700 leading-relaxed">[Describe what the project does, your role, and the impact it had.]</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column (1/3) */}
        <div className="space-y-6">
          {/* Skills */}
          <div>
            <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-200 pb-1 mb-4 uppercase">Skills</h2>
            
            {((technicalSkills && technicalSkills.length > 0) || (softSkills && softSkills.length > 0)) ? (
              <div className="space-y-4">
                {technicalSkills && technicalSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Technical</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.map((skill, i) => (
                        <span key={i} className="text-xs text-blue-800 bg-blue-50 px-2 py-1 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills && softSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {softSkills.map((skill, i) => (
                        <span key={i} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="opacity-60">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Technical</h4>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-xs text-blue-800 bg-blue-50 px-2 py-1 rounded-full">[Skill 1]</span>
                  <span className="text-xs text-blue-800 bg-blue-50 px-2 py-1 rounded-full">[Skill 2]</span>
                </div>
              </div>
            )}
          </div>

          {/* Experience (If any) */}
          <div>
            <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-200 pb-1 mb-4 uppercase">Experience</h2>
            {experience?.length > 0 ? (
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="text-sm font-bold text-gray-900">{exp.position || '[Position]'}</h3>
                    <div className="text-xs text-blue-600 font-medium">{exp.company || '[Company]'}</div>
                    <div className="text-xs text-gray-500 mb-1">{exp.startDate || '[Start]'} - {exp.isCurrentJob ? 'Present' : (exp.endDate || '[End]')}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="opacity-60 text-sm text-gray-500 italic">
                [Any internships, part-time jobs, or volunteer work will appear here.]
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FresherModernTemplate;
