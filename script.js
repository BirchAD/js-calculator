const billInput = document.getElementById('amount');
const tipInputs = document.querySelectorAll('input[name="tip"]');
const customTipInput = document.getElementById('tipCustom');
const peopleInput = document.getElementById('people');
const personTotal = document.getElementById('person-total');
const totalTotal = document.getElementById('total-total');
const resetButton = document.querySelector('.reset');

function calculate() {
  const bill = parseFloat(billInput.value);
  const customTip = parseFloat(customTipInput.value);
  const tipPercent = customTip || parseFloat(document.querySelector('input[name="tip"]:checked').value);
  const numberOfPeople = parseFloat(peopleInput.value);

  if (bill && tipPercent && numberOfPeople) {
    const tipAmount = bill * (tipPercent / 100);
    const totalAmount = bill + tipAmount;
    const personTip = tipAmount / numberOfPeople;
    const personTotalAmount = totalAmount / numberOfPeople;
    // string literal doesnt work?
    personTotal.textContent = '$' + personTip.toFixed(2);
    totalTotal.textContent = '$' + personTotalAmount.toFixed(2);
  } else {
    // need error messages for 0
    personTotal.textContent = '$0.00';
    totalTotal.textContent = '$0.00';
  }
}


billInput.addEventListener('input', calculate);
customTipInput.addEventListener('input', calculate);
tipInputs.forEach(tipInput => tipInput.addEventListener('change', calculate));
peopleInput.addEventListener('input', calculate);
