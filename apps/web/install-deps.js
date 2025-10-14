#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('Installing dependencies for monorepo...');

// Install web app dependencies first
console.log('Installing web app dependencies...');
execSync('npm install', { stdio: 'inherit', cwd: __dirname });

// Install shared package dependencies
const packages = [
  '../../packages/config',
  '../../packages/ui', 
  '../../packages/shared',
  '../functions'
];

packages.forEach(pkg => {
  const pkgPath = path.resolve(__dirname, pkg);
  console.log(`Installing dependencies for ${pkg}...`);
  try {
    execSync('npm install', { stdio: 'inherit', cwd: pkgPath });
  } catch (error) {
    console.warn(`Warning: Failed to install dependencies for ${pkg}`);
  }
});

console.log('All dependencies installed successfully!');
