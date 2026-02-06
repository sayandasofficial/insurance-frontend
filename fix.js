const fs = require('fs');
const content = fs.readFileSync('/Users/arindamdas/Desktop/Insurance portal/frontend/src/pages/ClaimUpload.jsx', 'utf8');

// Fix the register validation - remove the validate from files register
const fixedContent = content.replace(
  /\.\.\.register\('files', \{\s*validate: \(\) => uploadedFiles\.length > 0 \|\| 'Please upload at least one document',\s*\}\)/g,
  ""
);

// Remove the errors.files reference in className
const fixedContent2 = fixedContent.replace(
  /errors\.files \? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-exide-blue hover:bg-gray-50'/g,
  "'border-gray-300 hover:border-exide-blue hover:bg-gray-50'"
);

// Remove the errors.files.message display block
const fixedContent3 = fixedContent2.replace(
  /\{errors\.files && \(\s*<p className="mt-2 text-sm text-red-500 flex items-center gap-1">[\s\S]*?errors\.files\.message\s*<\/p>\s*\)\}/g,
  ""
);

fs.writeFileSync('/Users/arindamdas/Desktop/Insurance portal/frontend/src/pages/ClaimUpload.jsx', fixedContent3);
console.log('Fixed!');

