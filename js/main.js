var leftInput = document.getElementById("left-input");
var leftDropdown = document.getElementById("left-select");
var rightInput = document.getElementById("right-input");
var rightDropdown = document.getElementById("right-select");

var formulaCF = document.getElementById("celFah");
var formulaCK = document.getElementById("celKel");
var formulaFC = document.getElementById("fahCel");
var formulaFK = document.getElementById("fahKel");
var formulaKC = document.getElementById("kelCel");
var formulaKF = document.getElementById("kelFah");

var formulaLeftValue = document.getElementsByClassName("left-value");
var formulaRightValue = document.getElementsByClassName("right-value");

var leftDropdownValue = leftDropdown.value;
var rightDropdownValue = rightDropdown.value;

// Run this code as soon as the document stuff done loading
window.onload = function(e) {
    updateFormula();
    initValue();
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
        leftInput.value = rightInput.value;

        leftDropdownValue = leftDropdown.value;
        calculateRight();
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
        rightInput.value = leftInput.value;

        rightDropdownValue = rightDropdown.value;
        calculateLeft();
    } else {
        rightDropdownValue = rightDropdown.value;
        calculateRight();
    }

    updateFormula();
}

// 'oninput' run these codes when the input-box is in focus (real-time run)
leftInput.oninput = (e) => {
    if (leftInput.value > 0) leftInput.value *= 1; // Remove leading zero
    calculateRight();
}

rightInput.oninput = (e) => {
    if (rightInput.value > 0) rightInput.value *= 1;
    calculateLeft();
}

// 'onchange' run these codes when user done input the value inside input-box (one-time run)
leftInput.onchange = (e) => {
    // If the input-box is blank by the user (deleted all the number) put 0 instead
    if (leftInput.value == "") leftInput.value = 0;
    calculateRight();
}

rightInput.onchange = (e) => {
    if (rightInput.value == "") rightInput.value = 0;
    calculateLeft();
}

// Hide all the formula texts then shows only the one user select
function updateFormula() {
    formulaCF.style.display = 'none';
    formulaCK.style.display = 'none';
    formulaFC.style.display = 'none';
    formulaFK.style.display = 'none';
    formulaKC.style.display = 'none';
    formulaKF.style.display = 'none';

    if      (leftDropdownValue == 0 && rightDropdownValue == 1) formulaCF.style.display = 'initial';
    else if (leftDropdownValue == 0 && rightDropdownValue == 2) formulaCK.style.display = 'initial';
    else if (leftDropdownValue == 1 && rightDropdownValue == 0) formulaFC.style.display = 'initial';
    else if (leftDropdownValue == 1 && rightDropdownValue == 2) formulaFK.style.display = 'initial';
    else if (leftDropdownValue == 2 && rightDropdownValue == 0) formulaKC.style.display = 'initial';
    else if (leftDropdownValue == 2 && rightDropdownValue == 1) formulaKF.style.display = 'initial';
}

// Calculate the other side
function calculateRight() {
    var leftValue = parseFloat(leftInput.value);
    var rightValue = parseFloat(rightInput.value);

    if      (leftDropdownValue == 0 && rightDropdownValue == 1) rightValue = (leftValue * (9/5)) + 32;
    else if (leftDropdownValue == 0 && rightDropdownValue == 2) rightValue = leftValue + 273.15;
    else if (leftDropdownValue == 1 && rightDropdownValue == 0) rightValue = (leftValue - 32) * (5/9);
    else if (leftDropdownValue == 1 && rightDropdownValue == 2) rightValue = ((leftValue - 32) * (5/9)) + 273.15;
    else if (leftDropdownValue == 2 && rightDropdownValue == 0) rightValue = leftValue - 273.15;
    else if (leftDropdownValue == 2 && rightDropdownValue == 1) rightValue = ((leftValue - 273.15) * (9/5)) + 32;

    if (leftInput.value == "") rightInput.value = ""; // Avoid error
    else rightInput.value = Math.round(rightValue * 10) / 10; // Only show decimal if needed
    updateFormulaValues();
}

function calculateLeft() {
    var leftValue = parseFloat(leftInput.value);
    var rightValue = parseFloat(rightInput.value);

    if      (leftDropdownValue == 0 && rightDropdownValue == 1) leftValue = (rightValue - 32) * (5/9);
    else if (leftDropdownValue == 0 && rightDropdownValue == 2) leftValue = rightValue - 273.15;
    else if (leftDropdownValue == 1 && rightDropdownValue == 0) leftValue = (rightValue * (9/5)) + 32;
    else if (leftDropdownValue == 1 && rightDropdownValue == 2) leftValue = ((rightValue - 273.15) * (9/5)) + 32;
    else if (leftDropdownValue == 2 && rightDropdownValue == 0) leftValue = rightValue + 273.15;
    else if (leftDropdownValue == 2 && rightDropdownValue == 1) leftValue = ((rightValue - 32) * (5/9)) + 273.15;

    if (rightInput.value == "") leftInput.value = "";
    else leftInput.value = Math.round(leftValue * 10) / 10;
    updateFormulaValues();
}

// Update some number on formula text
function updateFormulaValues() {
    for (var i = 0; i < formulaLeftValue.length; i++) {
        formulaLeftValue[i].innerHTML = leftInput.value == "" ? "" : leftInput.value;
        formulaRightValue[i].innerHTML = rightInput.value == "" ? "" : rightInput.value;
    }
}