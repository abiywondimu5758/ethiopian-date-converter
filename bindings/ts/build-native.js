#!/usr/bin/env node

/**
 * Build script for TypeScript native binding
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building TypeScript native binding...');

try {
    // Check if build directory exists
    const buildDir = path.join(__dirname, 'build');
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }

    // Run node-gyp rebuild
    execSync('node-gyp rebuild', { 
        stdio: 'inherit',
        cwd: __dirname 
    });

    console.log('Native binding built successfully!');

    // Check if the binding file exists
    const bindingPath = path.join(__dirname, 'build', 'Release', 'ethiopic_calendar_ts.node');
    if (fs.existsSync(bindingPath)) {
        console.log('Binding file created:', bindingPath);
    } else {
        console.warn('Warning: Binding file not found at expected location');
    }

} catch (error) {
    console.error('Failed to build native binding:', error.message);
    process.exit(1);
}

