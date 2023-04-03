document.addEventListener("DOMContentLoaded", function() {
  // making the input div's clickable
  const billInputDiv = document.querySelector('.col-1.row-1');
  const peopleInputDiv = document.querySelector('.col-1.row-3');

  billInputDiv.addEventListener('click', () => {
    const billInput = document.getElementById('amount');
    billInput.focus();
  });

  peopleInputDiv.addEventListener('click', () => {
    const peopleInput = document.getElementById('people');
    peopleInput.focus();
  });

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

  billInput.addEventListener('input', calculate);
  customTipInput.addEventListener('input', calculate);
  peopleInput.addEventListener('input', calculate);
  tipInputs.forEach(tipInput => tipInput.addEventListener('change', calculate));

  function reset() {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    personTotal.textContent = '$0.00';
    totalTotal.textContent = '$0.00';
    for(let i = 0; i < tipInputs.length; i++) {
      tipInputs[i].checked = false;
    }
    resetButton.setAttribute('disabled', '')
  }

  resetButton.addEventListener('click', reset);

  function updateResetButton() {
    if (billInput.value || customTipInput.value || peopleInput.value || isTipInputChecked()) {
      resetButton.removeAttribute('disabled');
    }
  }

  function isTipInputChecked() {
    let isChecked = false;
      for(let i = 0; i < tipInputs.length; i++) {
        if (tipInputs[i].checked === true); {
          isChecked = true;
        }
      }
    return isChecked;
  }

  billInput.addEventListener('input', updateResetButton);
  customTipInput.addEventListener('input', updateResetButton);
  peopleInput.addEventListener('input', updateResetButton);
  tipInputs.forEach(tipInput => tipInput.addEventListener('change', updateResetButton));
})
