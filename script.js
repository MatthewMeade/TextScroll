// Size allocated on screen for each character
const CHAR_WIDTH = 9;
const CHAR_HEIGHT = 10;

// Speed of text in characters per second
const SPEED  = 30;

// Global Variables
let lines = []; // List of rows
let w = 0; // Columns of text
let h = 0; // Rows of text


// Build line elements that will contain scrolling text
// Number of lines determined by char size and window size
function BuildLines(){

  // Calculate number of lines (h) and columns (w)
  h = Math.ceil(1.25 * window.innerHeight / CHAR_HEIGHT);
  w = window.innerWidth / CHAR_WIDTH;

  // If lines already exist (screen resized), remove elements first
  lines && lines.forEach(l => document.body.removeChild(l));
  lines = [];


  // Create row elements scrolling text will be inserted into
  for (var i = 0; i < h; i++){

    // Create and append element to document
    const newElem = document.createElement("span");
    document.body.appendChild(newElem);

    // Apply class for style and calculate color based on row number
    newElem.className = "line";
    newElem.style.color = `hsl(${Math.floor(i * (360 / h))}, 50%, 50%)`;

    // Add line to list
    lines.push(newElem);
  }

  // Fill screen with text on load / resize
  for (let i = 0; i < w; i++) {
    AppendLines();
  }
}

// For each line appends a random character based on selected mode
// Trims text to width of screen
function AppendLines(){
  lines.forEach(l => {
    l.innerText =  (Math.random() >.1 ? String.fromCharCode(160) : "#") + l.innerText.slice(0,w);
  });
}

// Start Animation
window.addEventListener("resize", BuildLines);
setInterval(AppendLines, 1000 / SPEED);
BuildLines();
