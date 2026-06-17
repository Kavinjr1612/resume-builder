import { ResumeData } from '../types/resume';

export interface ScoreItem {
  label: string;
  passed: boolean;
  points: number;
}

export interface ATSResult {
  score: number;
  maxScore: number;
  percentage: number;
  checks: ScoreItem[];
}

export const calculateATSScore = (data: ResumeData): ATSResult => {
  const checks: ScoreItem[] = [];
  let score = 0;
  let maxScore = 0;

  const addCheck = (label: string, passed: boolean, points: number) => {
    checks.push({ label, passed, points });
    maxScore += points;
    if (passed) score += points;
  };

  // 1. Personal Info Completeness
  const hasName = !!data.personalInfo?.name?.trim();
  const hasEmail = !!data.personalInfo?.email?.trim();
  const hasPhone = !!data.personalInfo?.phone?.trim();
  const hasLinkedin = !!data.personalInfo?.linkedin?.trim();

  addCheck('Contact Information (Name, Email, Phone)', hasName && hasEmail && hasPhone, 15);
  addCheck('Professional Link (LinkedIn/GitHub)', hasLinkedin || !!data.personalInfo?.github, 5);

  // 2. Summary
  const hasSummary = !!data.summary?.trim();
  const summaryLength = data.summary?.trim().length || 0;
  addCheck('Professional Summary included', hasSummary, 10);
  addCheck('Summary length optimal (100-500 chars)', hasSummary && summaryLength > 100 && summaryLength <= 500, 5);

  // 3. Experience
  const hasExperience = data.experience && data.experience.length > 0;
  const expDescriptionsValid = data.experience?.every(exp => exp.description && exp.description.length > 50);
  addCheck('Work Experience included', hasExperience, 15);
  addCheck('Detailed Experience bullet points', !!hasExperience && !!expDescriptionsValid, 15);

  // 4. Education
  const hasEducation = data.education && data.education.length > 0;
  addCheck('Education history included', hasEducation, 10);

  // 5. Skills
  const hasTechnicalSkills = data.technicalSkills && data.technicalSkills.length >= 3;
  const hasSoftSkills = data.softSkills && data.softSkills.length >= 2;
  addCheck('At least 3 Technical Skills', !!hasTechnicalSkills, 10);
  addCheck('At least 2 Soft Skills', !!hasSoftSkills, 5);

  // 6. Projects (Bonus for developers/fresher)
  const hasProjects = data.projects && data.projects.length > 0;
  addCheck('Key Projects included', hasProjects, 10);

  const percentage = Math.round((score / maxScore) * 100);

  return {
    score,
    maxScore,
    percentage,
    checks
  };
};
