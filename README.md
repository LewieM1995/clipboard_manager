# Clipboard History Tracker

This script allows you to track and maintain a history of your clipboard content on Windows and macOS systems. It periodically reads the clipboard content and stores it in a JSON file, enabling you to access your clipboard history even after the content has been replaced.


## Working project, set up with win.exe still required.

## Prerequisites

Node.js installed on your system
For Windows: PowerShell
For macOS: pbpaste command

## Installation

Clone or download the repository containing the script.
Install dependencies by running npm install in the project directory.

## Usage

Ensure that the script (clipboard_tracker.js) is executable.

## Run the script using Node.js:

node clipboard_tracker.js
The script will continuously monitor your clipboard and update the clipboard history file (clipboard_history.json).

## Additional Notes

The maximum number of entries in the clipboard history is set to 25 by default. You can adjust this limit by modifying the maxEntries variable in the script.
The clipboard history is stored in a JSON file (clipboard_history.json) in the same directory as the script.
For Windows systems, the script utilizes PowerShell to read the clipboard content (Get-Clipboard). For macOS, it uses the pbpaste command.
Ensure that you have necessary permissions to read the clipboard on your system.

## License

This script is licensed under the MIT License. 
