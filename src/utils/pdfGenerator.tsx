import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';
import { UniversalPDFTemplate } from '../components/pdf-templates/UniversalPDFTemplate';

export const generatePDF = async (data: ResumeData, fileName: string = 'resume.pdf') => {
  try {
    // Generate the PDF blob natively using React-PDF
    const blob = await pdf(<UniversalPDFTemplate data={data} />).toBlob();
    
    // Create a download link for the blob
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate native PDF. Please try again.');
  }
};