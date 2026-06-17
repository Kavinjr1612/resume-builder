import { ResumeData } from '../types/resume';

const PDF_SERVER_URL = 'http://localhost:3001';

/**
 * Extracts all compiled CSS from the current page's stylesheets.
 * This captures the full Tailwind output so Puppeteer can render it identically.
 */
function extractPageCSS(): string {
  const cssRules: string[] = [];
  
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (sheet.cssRules) {
        for (const rule of Array.from(sheet.cssRules)) {
          cssRules.push(rule.cssText);
        }
      }
    } catch {
      // Cross-origin stylesheets will throw - skip them
      console.warn('Could not read stylesheet:', sheet.href);
    }
  }
  
  return cssRules.join('\n');
}

/**
 * Generates a pixel-perfect PDF by sending the resume HTML + CSS
 * to a local Puppeteer server that renders it in headless Chrome.
 * 
 * This is the same technique used by Resume Now, Indeed, and other
 * professional resume builders.
 */
export const generatePDF = async (
  elementId: string,
  _data: ResumeData,
  fileName: string = 'Resume.pdf'
): Promise<void> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error('Resume element not found');
  }

  // 1. Extract the resume's HTML and all page CSS
  const html = element.outerHTML;
  const css = extractPageCSS();

  // 2. Send to the Puppeteer server
  const response = await fetch(`${PDF_SERVER_URL}/api/generate-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html, css }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  // 3. Receive the PDF as a blob and trigger instant download
  const pdfBlob = await response.blob();
  const url = URL.createObjectURL(pdfBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the object URL
  URL.revokeObjectURL(url);
};
