import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const maxDuration = 60; // Set max duration for Vercel (free tier limit is usually 10s or 60s depending on the plan, 60s is good to set if possible)

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { html, css } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'Missing HTML content' });
  }

  let browser = null;
  
  try {
    // Detect if we are running in local dev or Vercel
    const isLocal = process.env.NODE_ENV === 'development' || !process.env.VERCEL;
    
    // In local dev, we might use regular puppeteer. In Vercel, we use puppeteer-core + sparticuz.
    // However, configuring executablePath for local can be tricky. 
    // To keep it simple, if isLocal, we assume the user has Chrome installed at a default path,
    // or we just rely on Vercel for the API.
    // Let's use the sparticuz chromium config.
    const executablePath = await chromium.executablePath();
    
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: isLocal ? undefined : executablePath, 
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Build a complete standalone HTML document with all styles inlined
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            /* Reset */
            *, *::before, *::after {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              width: 800px;
              height: 1131px;
              overflow: hidden;
              background: white;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            /* Inject the app's compiled CSS (Tailwind + custom) */
            ${css || ''}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    // Set A4 size (exact matching the local server dimensions)
    await page.setViewport({ width: 800, height: 1131, deviceScaleFactor: 2 });

    // Load the HTML content
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });

    // Wait a tiny bit for fonts and any CSS to fully settle
    await new Promise(resolve => setTimeout(resolve, 200));

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      pageRanges: '1',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.end(pdfBuffer);

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
