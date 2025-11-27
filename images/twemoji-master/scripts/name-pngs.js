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

// Function to create named copies of PNG files
async function createNamedCopies() {
  const sourceDir = path.join(__dirname, '..', 'png-1200');
  const targetDir = path.join(__dirname, '..', 'png-1200-named');
  
  // Create target directory
  await fs.ensureDir(targetDir);
  
  // Get all PNG files
  const pngFiles = await fs.readdir(sourceDir);
  const pngFilesFiltered = pngFiles.filter(file => file.endsWith('.png'));
  
  let namedCount = 0;
  let unnamedCount = 0;
  
  console.log(`Processing ${pngFilesFiltered.length} PNG files...`);
  
  for (const filename of pngFilesFiltered) {
    const baseName = path.basename(filename, '.png');
    const sourcePath = path.join(sourceDir, filename);
    
    // Try to find a human-readable name
    const readableName = codepointToName.get(baseName);
    
    if (readableName) {
      // Create named copy
      const namedFilename = `${readableName}.png`;
      const targetPath = path.join(targetDir, namedFilename);
      
      try {
        await fs.copy(sourcePath, targetPath);
        namedCount++;
        
        if (namedCount % 100 === 0) {
          console.log(`Named ${namedCount} files...`);
        }
      } catch (err) {
        console.warn(`Failed to copy ${filename} to ${namedFilename}: ${err.message}`);
        // Fall back to codepoint name
        const fallbackPath = path.join(targetDir, filename);
        await fs.copy(sourcePath, fallbackPath);
        unnamedCount++;
      }
    } else {
      // Keep original codepoint filename
      const targetPath = path.join(targetDir, filename);
      await fs.copy(sourcePath, targetPath);
      unnamedCount++;
    }
  }
  
  console.log(`\nNaming complete!`);
  console.log(`✅ Named files: ${namedCount}`);
  console.log(`📝 Codepoint files: ${unnamedCount}`);
  console.log(`📁 Total files: ${namedCount + unnamedCount}`);
  console.log(`📂 Output directory: ${targetDir}`);
  
  return { namedCount, unnamedCount };
}

// Function to compress the named PNGs
async function compressPngs() {
  const { spawn } = require('child_process');
  const targetDir = path.join(__dirname, '..', 'png-1200-named');
  
  console.log('\nCompressing PNG files...');
  
  return new Promise((resolve, reject) => {
    // Run pngquant compression
    const pngquant = spawn('find', [
      targetDir, '-name', '*.png', '-exec', 
      'pngquant', '--force', '--skip-if-larger', '--strip', 
      '--quality=70-90', '--speed', '1', '--ext', '.png', '--', '{}', ';'
    ], { stdio: 'inherit' });
    
    pngquant.on('close', (code) => {
      if (code === 0) {
        console.log('✅ pngquant compression complete');
        
        // Run oxipng optimization
        const oxipng = spawn('find', [
          targetDir, '-name', '*.png', '-exec',
          'oxipng', '-o', 'max', '-Z', '-strip', 'all', '-i', '0', '--quiet', '{}', ';'
        ], { stdio: 'inherit' });
        
        oxipng.on('close', (code) => {
          if (code === 0) {
            console.log('✅ oxipng optimization complete');
            resolve();
          } else {
            console.warn('⚠️  oxipng optimization had some issues, but continuing...');
            resolve();
          }
        });
      } else {
        console.warn('⚠️  pngquant compression had some issues, but continuing...');
        resolve();
      }
    });
  });
}

// Main execution
async function main() {
  try {
    const results = await createNamedCopies();
    await compressPngs();
    
    console.log('\n🎉 All done! Your emoji PNGs now have human-readable names.');
    console.log(`\nExample files you can now search for:`);
    
    // Show some examples
    const targetDir = path.join(__dirname, '..', 'png-1200-named');
    const files = await fs.readdir(targetDir);
    const namedFiles = files.filter(f => f.endsWith('.png') && !f.match(/^[0-9a-f-]+\.png$/i));
    
    for (let i = 0; i < Math.min(5, namedFiles.length); i++) {
      console.log(`  • ${namedFiles[i]}`);
    }
    
    if (namedFiles.length > 5) {
      console.log(`  ... and ${namedFiles.length - 5} more named files!`);
    }
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createNamedCopies, compressPngs };
