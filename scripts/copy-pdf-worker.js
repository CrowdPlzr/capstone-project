
const fs = require('fs');
const path = require('path');

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const pdfWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.min.mjs');
const publicDirPath = path.join(__dirname, '..', 'public');

if (fs.existsSync(pdfWorkerPath)) {
  if (!fs.existsSync(publicDirPath)) {
    fs.mkdirSync(publicDirPath, { recursive: true });
  }
  fs.copyFileSync(pdfWorkerPath, path.join(publicDirPath, 'pdf.worker.min.mjs'));
  console.log('Successfully copied PDF.js worker to public directory.');
} else {
  console.error('PDF.js worker not found. Please ensure pdfjs-dist is installed correctly.');
  process.exit(1);
}
