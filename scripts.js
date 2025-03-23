const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
let timeoutId;

function validateInput(dividend, divider) {
  if (dividend.trim() === "" || divider.trim() === "") {
    return "Division not performed. Both values are required in inputs. Try again";
  }

  // Convert input to numbers after ensuring they're not empty
  dividend = Number(dividend);
  divider = Number(divider);

  if (isNaN(dividend) || isNaN(divider)) {
    return "Division not performed. Invalid number provided. Try again";
  }

  if (divider === 0) {
    console.error("Division by zero error");
    return "Division not performed. Invalid number provided. Try again";
  }

  return null;
}

function performDivision(dividend, divider) {
  let quotient = dividend / divider;
  return Number.isInteger(quotient) ? quotient : Math.trunc(quotient);
}

function handleSubmit(event) {
  event.preventDefault();
  clearTimeout(timeoutId);

  const entries = new FormData(event.target);
  let { dividend, divider } = Object.fromEntries(entries);

  // Validate user input **before converting to numbers**
  const errorMessage = validateInput(dividend, divider);
  if (errorMessage) {
    result.innerText = errorMessage;
    return;
  }

  // Convert to numbers after validation
  dividend = Number(dividend);
  divider = Number(divider);

  // Perform the division
  result.innerText = performDivision(dividend, divider);
}

// Function to warn 
function noCalculationWarning() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    result.innerText = "No calculation performed";
  }, 10000);
}


form.addEventListener("submit", handleSubmit);
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", noCalculationWarning);
});
