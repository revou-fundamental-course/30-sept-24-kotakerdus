var leftInput = document.getElementById("left-input");
var rightInput = document.getElementById("right-input");
var leftDropdown = document.getElementById("left-select");
var rightDropdown = document.getElementById("right-select");
var leftDropdownValue = leftDropdown.value;
var rightDropdownValue = rightDropdown.value;

var formulaText = document.getElementById("formula-text");

// Run this code as soon as the document stuff done loading
window.onload = function(e) {
    initValue();
    updateFormula();
};

// Initial value
function initValue() {
    leftInput.value = 0;
    calculateRight();
}

// Run these code if user done selecting from dropdown menu
leftDropdown.onchange = (e) => {
    // Check if the selected dropdown is the same with right dropdown then swap between two
    if (rightDropdownValue == leftDropdown.value) {
        rightDropdown.selectedIndex = leftDropdownValue;
        rightDropdownValue = rightDropdown.value;
        // Also swap between the input-boxes value
        var tempVal = leftInput.value;
        leftInput.value = rightInput.value;
        rightInput.value = tempVal;

        leftDropdownValue = leftDropdown.value;
    } else {
        // If not the same then only calculate on the one that is changed
        // (so that you can convert like this = 100C -> 212F then -> 373.2K)
        leftDropdownValue = leftDropdown.value;
        calculateLeft();
    }

    updateFormula();
}

rightDropdown.onchange = (e) => {
    if (leftDropdownValue == rightDropdown.value) {
        leftDropdown.selectedIndex = rightDropdownValue;
        leftDropdownValue = leftDropdown.value;
        var tempVal = rightInput.value;
        rightInput.value = leftInput.value;
        leftInput.value = tempVal;

        rightDropdownValue = rightDropdown.value;
    } else {
        rightDropdownValue = rightDropdown.value;
        calculateRight();
    }

    updateFormula();
}

// 'onclick' run once as soon as the user clicked the input-box which select all the its content
leftInput.onclick = (e) => {
    leftInput.select();
}

rightInput.onclick = (e) => {
    rightInput.select();
}

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
        leftInput.style.backgroundColor = 'crimson';
        rightInput.style.backgroundColor = 'crimson';
    } else {
        leftInput.style.backgroundColor = '';
        rightInput.style.backgroundColor = '';
    }
}

// 'onchange' run these codes when user done input the value inside input-box (one-time run)
leftInput.onchange = (e) => {
    // If the input-box is blank (deleted all the number) or there's invalid string put 0 instead & reset the input warning color
    if (leftInput.value == "") leftInput.value = 0;
    leftInput.style.backgroundColor = '';
    rightInput.style.backgroundColor = '';
    leftInput.value -= 0; // Remove leading zero
    calculateRight();
}

rightInput.onchange = (e) => {
    if (rightInput.value == "") rightInput.value = 0;
    leftInput.style.backgroundColor = '';
    rightInput.style.backgroundColor = '';
    rightInput.value -= 0;
    calculateLeft();
}

// Hide all the formula texts then shows only the one user select
function updateFormula() {
    var left = leftInput.value;
    var right = rightInput.value;

    if      (leftDropdownValue == 0 && rightDropdownValue == 1) formulaText.innerHTML = "(" + left + "<b>°C</b> x <sup>9</sup>&frasl;<sub>5</sub>) + 32 = "          + right + "<b>°F</b>";
    else if (leftDropdownValue == 0 && rightDropdownValue == 2) formulaText.innerHTML =       left + "<b>°C</b> + 273.15 = "                                         + right + "<b>°K</b>";
    else if (leftDropdownValue == 1 && rightDropdownValue == 0) formulaText.innerHTML = "(" + left + "<b>°F</b> - 32) x <sup>5</sup>&frasl;<sub>9</sub> = "          + right + "<b>°C</b>";
    else if (leftDropdownValue == 1 && rightDropdownValue == 2) formulaText.innerHTML = "(" + left + "<b>°F</b> - 32) x <sup>5</sup>&frasl;<sub>9</sub> + 273.15 = " + right + "<b>°K</b>";
    else if (leftDropdownValue == 2 && rightDropdownValue == 0) formulaText.innerHTML =       left + "<b>°K</b> - 273.15 = "                                         + right + "<b>°C</b>";
    else if (leftDropdownValue == 2 && rightDropdownValue == 1) formulaText.innerHTML = "(" + left + "<b>°K</b> - 273.15) x <sup>9</sup>&frasl;<sub>5</sub> + 32 = " + right + "<b>°F</b>";
}

// Calculate the other side
function calculateRight() {
    var leftValue = parseFloat(leftInput.value);
    var rightValue = parseFloat(rightInput.value);

    if      (leftDropdownValue == 0 && rightDropdownValue == 1) rightValue = (leftValue * (9/5))   + 32;
    else if (leftDropdownValue == 0 && rightDropdownValue == 2) rightValue = leftValue + 273.15;
    else if (leftDropdownValue == 1 && rightDropdownValue == 0) rightValue = (leftValue - 32)      * (5/9);
    else if (leftDropdownValue == 1 && rightDropdownValue == 2) rightValue = ((leftValue - 32)     * (5/9)) + 273.15;
    else if (leftDropdownValue == 2 && rightDropdownValue == 0) rightValue = leftValue - 273.15;
    else if (leftDropdownValue == 2 && rightDropdownValue == 1) rightValue = ((leftValue - 273.15) * (9/5)) + 32;

    if (leftInput.value == "") rightInput.value = ""; // Avoid error
    else rightInput.value = Math.round(rightValue * 100) / 100; // Only show decimal if needed
    updateFormula();
}

function calculateLeft() {
    var leftValue = parseFloat(leftInput.value);
    var rightValue = parseFloat(rightInput.value);

    if      (leftDropdownValue == 0 && rightDropdownValue == 1) leftValue = (rightValue - 32)      * (5/9);
    else if (leftDropdownValue == 0 && rightDropdownValue == 2) leftValue = rightValue - 273.15;
    else if (leftDropdownValue == 1 && rightDropdownValue == 0) leftValue = (rightValue * (9/5))   + 32;
    else if (leftDropdownValue == 1 && rightDropdownValue == 2) leftValue = ((rightValue - 273.15) * (9/5)) + 32;
    else if (leftDropdownValue == 2 && rightDropdownValue == 0) leftValue = rightValue + 273.15;
    else if (leftDropdownValue == 2 && rightDropdownValue == 1) leftValue = ((rightValue - 32)     * (5/9)) + 273.15;

    if (rightInput.value == "") leftInput.value = "";
    else leftInput.value = Math.round(leftValue * 100) / 100;
    updateFormula();
}