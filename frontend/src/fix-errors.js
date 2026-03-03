// Script to find and fix whileHover/whileTap errors in the file

const fs = require('fs');

const content = fs.readFileSync('/App.tsx', 'utf8');

// Find all instances of whileHover/whileTap being applied to Button components
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('whileHover') || line.includes('whileTap')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});