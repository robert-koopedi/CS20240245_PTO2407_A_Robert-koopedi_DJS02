const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
let timeoutId;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  result.innerText = dividend / divider;
});

function validateInput(dividend, divider) {
  if(!dividend || !divider) {
    return "Division not performed.Both values are required in inputs. Try again";
  }
  if(divider == 0) {
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

  // Convert input to numbers
  dividend = Number(dividend);
  divider = Number(divider);

  // Check for non-numeric input (critical failure)
  if (isNaN(dividend) || isNaN(divider)) {
    console.error("Critical error: Non-numeric input detected.");
    document.body.innerHTML = `<h1>Something critical went wrong. Please reload the page.</h1>`;
    return;
  }

  // Validate user input
  const errorMessage = validateInput(dividend, divider);
  if (errorMessage) {
    result.innerText = errorMessage;
    return;
  }

  // Perform the division
  result.innerText = performDivision(dividend, divider);
}

// Function to warn if no submission in 10s
function noCalculationWarning() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    result.innerText = "No calculation performed";
  }, 10000);
}