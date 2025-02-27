const convertButton = document.querySelector("button");
const inputElement = document.querySelector(".input");
const selectElement = document.querySelector(".select");
const errorText = document.querySelector(".error-text");
const outputSection = document.querySelector(".bottom-section");

const conversionFactors = {
  millimeters: 1,
  centimeters: 10,
  decimeters: 100,
  meters: 1000,
  dekameter: 10000,
  hectometer: 100000,
  kilometer: 1000000
};

convertButton.addEventListener("click", () => {
  if (validateInput()) {
    const baseUnit = selectElement.value;
    const inputValue = parseFloat(inputElement.value);
    displayResults(inputValue, baseUnit);
  }
});

function validateInput() {
  if (inputElement.value === "" && selectElement.value === "base unit") {
    errorText.textContent = "Please input a value and select a base unit";
  } else if (inputElement.value === "") {
    errorText.textContent = "Please input a value";
  } else if (selectElement.value === "base unit") {
    errorText.textContent = "Please select a base unit";
  } else {
    errorText.textContent = "";
    inputElement.classList.remove("red-border");
    selectElement.classList.remove("red-border");
    return true;
  }
  inputElement.classList.toggle("red-border", inputElement.value === "");
  selectElement.classList.toggle("red-border", selectElement.value === "base unit");
  return false;
}

function displayResults(value, baseUnit) {
  let baseFactor = conversionFactors[baseUnit];
  let resultsHTML = "";

  for (let unit in conversionFactors) {
    let convertedValue = (value * baseFactor) / conversionFactors[unit];
    resultsHTML += `<p class="result-text">${value} ${getAbbreviation(baseUnit)} is equal to ${convertedValue} ${getAbbreviation(unit)}</p>`;
  }

  outputSection.innerHTML = resultsHTML;
}

function getAbbreviation(unit) {
  const abbreviations = {
    millimeters: "mm",
    centimeters: "cm",
    decimeters: "dm",
    meters: "m",
    dekameter: "Dm",
    hectometer: "hm",
    kilometer: "km"
  };
  return abbreviations[unit];
}
