import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData } from '../types/resume';

/**
 * Generates a high-quality PDF from a DOM element and injects ATS-readable text.
 * @param elementId The ID of the HTML element to render
 * @param data The user's resume data to inject as invisible text for ATS
 * @param fileName The desired output file name
 */
export const generatePDF = async (elementId: string, data: ResumeData, fileName: string = 'Resume.pdf'): Promise<void> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    throw new Error('Resume element not found');
  }

  // 1. Configure html2canvas for ultra-high quality rendering
  // We use scale: 3 for extreme clarity while keeping file size reasonable.
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 800,
    // The exact A4 pixel height to ensure no background bleeding
    windowHeight: 1131,
  });

  const imgData = canvas.toDataURL('image/jpeg', 1.0);

  // 2. Initialize jsPDF for A4 size (210mm x 297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // 3. THE ATS HACK: Inject invisible native text into the PDF underneath the image.
  // We write the text at font size 1, behind where the image will be.
  // This guarantees that ATS robots can read the content, while humans see a perfect visual design.
  pdf.setFontSize(2);
  pdf.setTextColor(255, 255, 255); // White text just in case

  const atsTextLines: string[] = [];
  
  // Extract all text systematically
  if (data.personalInfo) {
    atsTextLines.push(data.personalInfo.name);
    atsTextLines.push(data.personalInfo.email);
    atsTextLines.push(data.personalInfo.phone);
    atsTextLines.push(data.personalInfo.location);
    if (data.personalInfo.linkedin) atsTextLines.push(data.personalInfo.linkedin);
    if (data.personalInfo.github) atsTextLines.push(data.personalInfo.github);
  }

  if (data.summary) {
    atsTextLines.push(data.summary);
  }

  if (data.experience && data.experience.length > 0) {
    atsTextLines.push("Experience");
    data.experience.forEach(exp => {
      atsTextLines.push(`${exp.position} at ${exp.company}`);
      atsTextLines.push(`${exp.startDate} to ${exp.isCurrentJob ? 'Present' : exp.endDate}`);
      if (exp.description) atsTextLines.push(exp.description);
    });
  }

  if (data.education && data.education.length > 0) {
    atsTextLines.push("Education");
    data.education.forEach(edu => {
      atsTextLines.push(`${edu.degree} in ${edu.field} from ${edu.institution}`);
      atsTextLines.push(`${edu.startDate} to ${edu.endDate}`);
      if (edu.gpa) atsTextLines.push(`GPA: ${edu.gpa}`);
      if (edu.achievements) atsTextLines.push(edu.achievements);
    });
  }

  if (data.skills && data.skills.length > 0) {
    atsTextLines.push("Skills");
    atsTextLines.push(data.skills.join(", "));
  }

  if (data.technicalSkills && data.technicalSkills.length > 0) {
    atsTextLines.push("Technical Skills");
    atsTextLines.push(data.technicalSkills.join(", "));
  }

  if (data.softSkills && data.softSkills.length > 0) {
    atsTextLines.push("Soft Skills");
    atsTextLines.push(data.softSkills.join(", "));
  }

  if (data.projects && data.projects.length > 0) {
    atsTextLines.push("Projects");
    data.projects.forEach(proj => {
      atsTextLines.push(`${proj.name} - ${proj.technologies}`);
      if (proj.description) atsTextLines.push(proj.description);
      if (proj.link) atsTextLines.push(`Link: ${proj.link}`);
    });
  }

  // Join everything and split into smaller chunks so jsPDF doesn't fail on massive strings
  const fullText = atsTextLines.filter(Boolean).join("\n");
  const splitText = pdf.splitTextToSize(fullText, 200); // 200mm width wrap
  
  // Write the text starting at 10mm from top
  pdf.text(splitText, 5, 10);

  // 4. Place the ultra-high resolution image PERFECTLY over the entire A4 canvas.
  // A4 dimensions are 210mm x 297mm.
  // By placing the image exactly at 0,0 and stretching it to 210x297, we perfectly match the A4 ratio.
  pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

  // 5. Instantly download the file!
  pdf.save(fileName);
};
