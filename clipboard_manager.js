const fs = require('fs');
const { execSync } = require('child_process');

// File path for storing clipboard history
const filePath = 'clipboard_history.json';

// Read clipboard history from file, if exists
let clipboardHistory = {};
if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    clipboardHistory = JSON.parse(fileData);
}

// Function to update clipboard history file
function updateHistoryFile() {
    fs.writeFileSync(filePath, JSON.stringify(clipboardHistory, null, 2), 'utf8');
}

// Function to add clipboard content to history
function addToHistory(content) {
    const maxEntries = 25; // Maximum number of entries to keep
    const keys = Object.keys(clipboardHistory);
  
    // Shift existing entries down
    for (let i = keys.length - 1; i >= 0; i--) {
      const currentKey = `copy${i + 1}`;
      const nextKey = `copy${i + 2}`;
  
      if (i === maxEntries - 1) {
        // Remove the oldest entry
        delete clipboardHistory[nextKey];
      } else {
        clipboardHistory[nextKey] = clipboardHistory[currentKey];
      }
    }
  
    // Add the new entry
    clipboardHistory.copy1 = content;
  
    updateHistoryFile();
  }

  let previousClipboardContent = '';

function readClipboard() {
    let content;
    try {
        if (process.platform === 'win32') {
            // Windows
            content = execSync('powershell Get-Clipboard -Format Text').toString().trim();
        } else if (process.platform === 'darwin') {
            // macOS
            content = execSync('pbpaste').toString().trim();
        }

        console.log('Clipboard content:', content);

        // Add content to clipboard history
        const keys = Object.keys(clipboardHistory);
        if (keys.length === 0 || content !== clipboardHistory.copy1) {
          // Add the new content to the history
          addToHistory(content);
          previousClipboardContent = content;
        }
    } catch (error) {
        console.error('Failed to read clipboard:', error);
    }
}

// Read clipboard content
setInterval(readClipboard, 1000);
