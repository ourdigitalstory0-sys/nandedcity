const QRCode = require('qrcode');
const fs = require('fs');

const projects = [
  { id: 'melody-1', url: 'https://maharerait.mahaonline.gov.in/Registration/Registration_Details?RegNo=P52100051948' },
  { id: 'melody-2', url: 'https://maharerait.mahaonline.gov.in/Registration/Registration_Details?RegNo=P52100051867' },
  { id: 'aalaap-1', url: 'https://maharerait.mahaonline.gov.in/Registration/Registration_Details?RegNo=P52100055134' },
  { id: 'saajgiri', url: 'https://maharerait.mahaonline.gov.in/Registration/Registration_Details?RegNo=PR1260002501621' },
  { id: 'rhythm-1', url: 'https://maharerait.mahaonline.gov.in/Registration/Registration_Details?RegNo=P52100028606' },
  { id: 'dhanashree', url: 'https://maharerait.mahaonline.gov.in/Registration/Registration_Details?RegNo=P52100002425' },
];

async function generateQRCodes() {
  for (const project of projects) {
    const filePath = `public/qrs/${project.id}-qr.png`;
    try {
      await QRCode.toFile(filePath, project.url, {
        color: {
          dark: '#000000',  // Pure black squares
          light: '#ffffff' // Pure white background
        },
        width: 300, // High-res output
        margin: 2
      });
      console.log(`✅ Successfully generated QR for ${project.id} -> ${filePath}`);
    } catch (err) {
      console.error(`❌ Failed to generate QR for ${project.id}:`, err);
    }
  }
}

generateQRCodes();
