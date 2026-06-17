import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
const PORT = 3001;

// Allow large HTML payloads (resumes can be big with inline styles)
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Cache the browser instance so we don't re-launch Chrome on every request
let browserInstance = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=none', // Smoother font rendering
      ],
    });
  }
  return browserInstance;
}

/**
 * POST /api/generate-pdf
 * 
 * Accepts { html, css } in the request body.
 * Renders the HTML+CSS in a headless Chrome browser at exact A4 dimensions,
 * and returns the PDF as a binary buffer.
 */
app.post('/api/generate-pdf', async (req, res) => {
  const { html, css } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'Missing HTML content' });
  }

  let page = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage();

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

    // Set the viewport to exactly match our A4 template dimensions
    await page.setViewport({ width: 800, height: 1131, deviceScaleFactor: 2 });
    
    // Load the HTML content
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });

    // Wait a tiny bit for fonts and any CSS to fully settle
    await new Promise(resolve => setTimeout(resolve, 200));

    // Generate the PDF - STRICTLY 1 page only
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Critical: ensures colored backgrounds (teal sidebar, etc.) are rendered
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false,
      pageRanges: '1', // CRITICAL: Only generate page 1, never allow a second page
    });

    // Send the PDF binary back to the client
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  } finally {
    if (page) {
      await page.close();
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PDF server is running' });
});

app.listen(PORT, () => {
  console.log(`🖨️  PDF Server running at http://localhost:${PORT}`);
  console.log(`   POST /api/generate-pdf  — Generate a PDF from HTML`);
  console.log(`   GET  /api/health        — Health check`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (browserInstance) {
    await browserInstance.close();
  }
  process.exit(0);
});
