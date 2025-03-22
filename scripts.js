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