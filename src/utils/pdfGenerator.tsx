export const generatePDF = async () => {
  try {
    // Small delay to ensure any UI states (like loading spinners) are hidden
    setTimeout(() => {
      window.print();
    }, 100);
    return true;
  } catch (error) {
    console.error('Error triggering print:', error);
    throw new Error('Failed to open print dialog. Please try pressing Ctrl+P or Cmd+P.');
  }
};