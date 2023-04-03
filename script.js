document.addEventListener("DOMContentLoaded", function() {
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
    const errorMessage = document.getElementById('error-message');

    if (numberOfPeople === 0) {
      errorMessage.textContent = '0 is not a valid entry';
    } else if (bill && tipPercent && numberOfPeople) {
      const tipAmount = bill * (tipPercent / 100);
      const totalAmount = bill + tipAmount;
      const personTip = tipAmount / numberOfPeople;
      const personTotalAmount = totalAmount / numberOfPeople;
      // string literal doesnt work?
      personTotal.textContent = '$' + personTip.toFixed(2);
      totalTotal.textContent = '$' + personTotalAmount.toFixed(2);
    }
  }

  function reset() {
    billInput.value = '';
    customTipInput.value = '';
    tipInputs[0].checked = true;
    peopleInput.value = '';
    personTotal.textContent = '$0.00';
    totalTotal.textContent = '$0.00';
  }

  billInput.addEventListener('input', calculate);
  customTipInput.addEventListener('input', calculate);
  tipInputs.forEach(tipInput => tipInput.addEventListener('change', calculate));
  peopleInput.addEventListener('input', calculate);
  resetButton.addEventListener('click', reset);
});
