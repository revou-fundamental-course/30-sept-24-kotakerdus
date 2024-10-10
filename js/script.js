const leftInput = document.getElementById("left-input");
const rightInput = document.getElementById("right-input");
const leftDrop = document.getElementById("left-select");
const rightDrop = document.getElementById("right-select");
let leftDropVal = leftDrop.value; // Only for value reference
let rightDropdVal = rightDrop.value;

const formulaText = document.getElementById("formula-text");
const longExp = document.getElementById("long-exp")
const btnExp = document.getElementById("btn-Exp");
const expText = document.getElementById("explanation")

// Run this code as soon as the document stuff done loading
window.onload = function(e) {
    initValue();
    updateFormula();
    longExp.style.display = 'none';
};

// Initial value
function initValue() {
    leftInput.value = 0;
    calculateRight();
}

// Run these code if user done selecting from dropdown menu
leftDrop.onchange = (e) => { doneLeftSelecting(); }
rightDrop.onchange = (e) => { doneRightSelecting(); }

// 'onclick' run once as soon as the user clicked the input-box which select all the its content
leftInput.onclick = (e) => { leftInput.select(); }
rightInput.onclick = (e) => { rightInput.select(); }

// 'oninput' run these codes when the input-box is in focus (real-time run)
leftInput.oninput = (e) => {
    inputWarning(leftInput);
    calculateRight();
}

rightInput.oninput = (e) => {
    inputWarning(rightInput);
    calculateLeft();
}

function inputWarning(whichInput) {
    if (whichInput.value == "") {
        // Make the border turns red if error occured (input.value turns blank if invalid)
        leftInput.style.borderColor = 'red';
        leftDrop.style.borderColor = 'red';
        rightInput.style.borderColor = 'red';
        rightDrop.style.borderColor = 'red';
    } else {
        // Return normal as soon as the value is valid
        leftInput.style.borderColor = 'var(--border-color)';
        leftDrop.style.borderColor = 'var(--border-color)';
        rightInput.style.borderColor = 'var(--border-color)';
        rightDrop.style.borderColor = 'var(--border-color)';
    }
}

// 'onchange' run these codes when user done input the value inside input-box (one-time run)
leftInput.onchange = (e) => {
    // If the input-box is blank (deleted all the number) or there's invalid string put 0 instead & reset the input warning color
    if (leftInput.value == "") leftInput.value = 0;
    leftInput.value -= 0; // Remove leading zero
    inputWarning(leftInput); // Reset input-box background color
    calculateRight();
}

rightInput.onchange = (e) => {
    if (rightInput.value == "") rightInput.value = 0;
    rightInput.value -= 0;
    inputWarning(rightInput);
    calculateLeft();
}

function toggleExp() {
    longExp.style.display = longExp.style.display == 'none' ? 'block' : 'none';
    btnExp.textContent = longExp.style.display == 'none' ? 'Explain' : 'Hide';
}

// Hide all the formula texts then shows only the one user select
function updateFormula() {
    let left = leftInput.value;
    let right = rightInput.value;

    if      (leftDropVal == 0 && rightDropdVal == 1) formulaText.innerHTML = "(" + left + "<b>°C</b> x <sup>9</sup>&frasl;<sub>5</sub>) + 32 = "          + right + "<b>°F</b>";
    else if (leftDropVal == 0 && rightDropdVal == 2) formulaText.innerHTML =       left + "<b>°C</b> + 273.15 = "                                         + right + "<b>°K</b>";
    else if (leftDropVal == 1 && rightDropdVal == 0) formulaText.innerHTML = "(" + left + "<b>°F</b> - 32) x <sup>5</sup>&frasl;<sub>9</sub> = "          + right + "<b>°C</b>";
    else if (leftDropVal == 1 && rightDropdVal == 2) formulaText.innerHTML = "(" + left + "<b>°F</b> - 32) x <sup>5</sup>&frasl;<sub>9</sub> + 273.15 = " + right + "<b>°K</b>";
    else if (leftDropVal == 2 && rightDropdVal == 0) formulaText.innerHTML =       left + "<b>°K</b> - 273.15 = "                                         + right + "<b>°C</b>";
    else if (leftDropVal == 2 && rightDropdVal == 1) formulaText.innerHTML = "(" + left + "<b>°K</b> - 273.15) x <sup>9</sup>&frasl;<sub>5</sub> + 32 = " + right + "<b>°F</b>";

    if (leftDropVal == 0 && rightDropdVal == 1) expText.innerHTML =
        "Suhu <b>S</b> dalam derajat <i>Fahrenheit</i> (°F) sama dengan suhu <b>S</b> dalam derajat <i>Celcius</i> (°C) kali <sup>9</sup>&frasl;<sub>5</sub> tambah 32 " +
        "<br><br><b>S</b><sub>(°F)</sub> = (<b>S</b><sub>(°C)</sub> x <sup>9</sup>&frasl;<sub>5</sub>) + 32";
    else if (leftDropVal == 0 && rightDropdVal == 2) expText.innerHTML =
        "Suhu <b>S</b> dalam derajat <i>Kelvin</i> (°K) sama dengan suhu <b>S</b> dalam derajat <i>Celcius</i> (°C) tambah 273.15" +
        "<br><br><b>S</b><sub>(°K)</sub> = <b>S</b><sub>(°C)</sub> + 273.15";
    else if (leftDropVal == 1 && rightDropdVal == 0) expText.innerHTML =
        "Suhu <b>S</b> dalam derajat <i>Celcius</i> (°C) sama dengan suhu <b>S</b> dalam derajat <i>Fahrenheit</i> (°F) dikurang 32 lalu kali <sup>5</sup>&frasl;<sub>9</sub>" +
        "<br><br><b>S</b><sub>(°C)</sub> = (<b>S</b><sub>(°F)</sub> - 32) x <sup>5</sup>&frasl;<sub>9</sub>";
    else if (leftDropVal == 1 && rightDropdVal == 2) expText.innerHTML =
        "Suhu <b>S</b> dalam derajat <i>Kelvin</i> (°K) sama dengan suhu <b>S</b> dalam derajat <i>Fahrenheit</i> (°F) dikurang 32 lalu kali <sup>5</sup>&frasl;<sub>9</sub> tambah 273.15" +
        "<br><br><b>S</b><sub>(°K)</sub> = (<b>S</b><sub>(°F)</sub> - 32) x <sup>5</sup>&frasl;<sub>9</sub> + 273.15";
    else if (leftDropVal == 2 && rightDropdVal == 0) expText.innerHTML =
        "Suhu <b>S</b> dalam derajat <i>Celcius</i> (°C) sama dengan suhu <b>S</b> dalam derajat <i>Kelvin</i> (°K) kurang 273.15" +
        "<br><br><b>S</b><sub>(°C)</sub> = <b>S</b><sub>(°K)</sub> - 273.15";
    else if (leftDropVal == 2 && rightDropdVal == 1) expText.innerHTML =
        "Suhu <b>S</b> dalam derajat <i>Fahrenheit</i> (°F) sama dengan suhu <b>S</b> dalam derajat <i>Kelvin</i> (°K) kurang 273.15 kali <sup>9</sup>&frasl;<sub>5</sub> tambah 32 " +
        "<br><br><b>S</b><sub>(°F)</sub> = (<b>S</b><sub>(°K)</sub> -273.15) x <sup>9</sup>&frasl;<sub>5</sub> + 32";
}

function doneLeftSelecting() {
    // Check if the selected dropdown is the same with right dropdown then swap between two
    if (rightDropdVal == leftDrop.value) {
        rightDrop.selectedIndex = leftDropVal;
        rightDropdVal = rightDrop.value;
        // Also swap between the input-boxes value
        let tempVal = leftInput.value;
        leftInput.value = rightInput.value;
        rightInput.value = tempVal;

        leftDropVal = leftDrop.value;
    } else {
        // If not the same then only calculate on the one that is changed
        // (so that you can convert like this = 100C -> 212F then -> 373.2K)
        leftDropVal = leftDrop.value;
        calculateLeft();
    }

    updateFormula();
}

function doneRightSelecting() {
    if (leftDropVal == rightDrop.value) {
        leftDrop.selectedIndex = rightDropdVal;
        leftDropVal = leftDrop.value;
        let tempVal = rightInput.value;
        rightInput.value = leftInput.value;
        leftInput.value = tempVal;

        rightDropdVal = rightDrop.value;
    } else {
        rightDropdVal = rightDrop.value;
        calculateRight();
    }

    updateFormula();
}

// Calculate the other side
function calculateRight() {
    let leftValue = parseFloat(leftInput.value);
    let rightValue = parseFloat(rightInput.value);

    if      (leftDropVal == 0 && rightDropdVal == 1) rightValue = (leftValue * (9/5))   + 32;
    else if (leftDropVal == 0 && rightDropdVal == 2) rightValue = leftValue + 273.15;
    else if (leftDropVal == 1 && rightDropdVal == 0) rightValue = (leftValue - 32)      * (5/9);
    else if (leftDropVal == 1 && rightDropdVal == 2) rightValue = ((leftValue - 32)     * (5/9)) + 273.15;
    else if (leftDropVal == 2 && rightDropdVal == 0) rightValue = leftValue - 273.15;
    else if (leftDropVal == 2 && rightDropdVal == 1) rightValue = ((leftValue - 273.15) * (9/5)) + 32;

    rightInput.value = leftInput.value == "" ? "" : Math.round(rightValue * 100) / 100; // Blank to avoid errors & show decimals if needed
    updateFormula();
}

function calculateLeft() {
    let leftValue = parseFloat(leftInput.value);
    let rightValue = parseFloat(rightInput.value);

    if      (leftDropVal == 0 && rightDropdVal == 1) leftValue = (rightValue - 32)      * (5/9);
    else if (leftDropVal == 0 && rightDropdVal == 2) leftValue = rightValue - 273.15;
    else if (leftDropVal == 1 && rightDropdVal == 0) leftValue = (rightValue * (9/5))   + 32;
    else if (leftDropVal == 1 && rightDropdVal == 2) leftValue = ((rightValue - 273.15) * (9/5)) + 32;
    else if (leftDropVal == 2 && rightDropdVal == 0) leftValue = rightValue + 273.15;
    else if (leftDropVal == 2 && rightDropdVal == 1) leftValue = ((rightValue - 32)     * (5/9)) + 273.15;

    leftInput.value = rightInput.value == "" ? "" : Math.round(leftValue * 100) / 100;
    updateFormula();
}