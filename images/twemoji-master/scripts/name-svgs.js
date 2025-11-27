#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

// Load emoji data from emojibase-data
let emojiData;
try {
  emojiData = require('emojibase-data/en/compact.json');
} catch (err) {
  console.error('Failed to load emojibase-data. Make sure it\'s installed.');
  process.exit(1);
}

// Create a mapping from Unicode codepoints to emoji names
const codepointToName = new Map();

emojiData.forEach(emoji => {
  if (emoji.hexcode && emoji.label) {
    // Convert hexcode to lowercase to match filename format
    const codepoint = emoji.hexcode.toLowerCase().replace(/\s+/g, '-');
    
    // Clean up the label to make it filesystem-safe
    const cleanName = emoji.label
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
    
    if (cleanName) {
      codepointToName.set(codepoint, cleanName);
    }
  }
});

console.log(`Loaded ${codepointToName.size} emoji mappings from emojibase-data`);

// Function to create named copies of SVG files
async function createNamedSvgs() {
  const sourceDir = path.join(__dirname, '..', 'assets', 'svg');
  const targetDir = path.join(__dirname, '..', 'svg-named');
  
  // Create target directory
  await fs.ensureDir(targetDir);
  
  // Get all SVG files
  const svgFiles = await fs.readdir(sourceDir);
  const svgFilesFiltered = svgFiles.filter(file => file.endsWith('.svg'));
  
  let namedCount = 0;
  let unnamedCount = 0;
  
  console.log(`Processing ${svgFilesFiltered.length} SVG files...`);
  
  for (const filename of svgFilesFiltered) {
    const baseName = path.basename(filename, '.svg');
    const sourcePath = path.join(sourceDir, filename);
    
    // Try to find a human-readable name
    const readableName = codepointToName.get(baseName);
    
    if (readableName) {
      // Create named copy
      const namedFilename = `${readableName}.svg`;
      const targetPath = path.join(targetDir, namedFilename);
      
      try {
        await fs.copy(sourcePath, targetPath);
        namedCount++;
        
        if (namedCount % 100 === 0) {
          console.log(`Named ${namedCount} SVG files...`);
        }
      } catch (err) {
        console.warn(`Failed to copy ${filename} to ${namedFilename}: ${err.message}`);
        unnamedCount++;
      }
    } else {
      // Skip files without readable names
      unnamedCount++;
    }
  }
  
  console.log(`\nSVG naming complete!`);
  console.log(`✅ Named SVG files: ${namedCount}`);
  console.log(`❌ Skipped (no readable name): ${unnamedCount}`);
  console.log(`📁 Output directory: ${targetDir}`);
  
  return { namedCount, unnamedCount };
}

// Main execution
async function main() {
  try {
    const results = await createNamedSvgs();
    
    console.log('\n🎉 SVG naming complete! Only human-readable files created.');
    console.log(`\nExample SVG files you can now search for:`);
    
    // Show some examples
    const targetDir = path.join(__dirname, '..', 'svg-named');
    const files = await fs.readdir(targetDir);
    const svgFiles = files.filter(f => f.endsWith('.svg'));
    
    for (let i = 0; i < Math.min(5, svgFiles.length); i++) {
      console.log(`  • ${svgFiles[i]}`);
    }
    
    if (svgFiles.length > 5) {
      console.log(`  ... and ${svgFiles.length - 5} more named SVG files!`);
    }
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createNamedSvgs };
