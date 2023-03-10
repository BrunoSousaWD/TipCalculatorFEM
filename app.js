let val = document.getElementById('bill-total');
let tipAmount = document.getElementById('tip-result');
let tipPercent = document.querySelectorAll('.tip-p');
let custom = document.getElementById('custom');
let numPeople = document.getElementById('numPeople');
let totalPerson = document.getElementById('ppl-result');
let reset = document.getElementById('reset');


//set max num length
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.oninput = () => {
        if (input.value.length > input.maxLength)
            input.value = input.value.slice(0, input.maxLength);
    };
});

function getPercentage() {
    let percentAmount;
    let customAmount;

    tipPercent.forEach(button => {
        button.addEventListener('click', (e) => {
            // only one item active
            tipPercent.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            // append value to Tip amount div
            let percent = parseInt(button.value) / 100;
            percentAmount = percent * val.value;

            // check number of people
            if (numPeople.value === '') {
                // add error message
                document.getElementById('error-message').style.display = 'block';
                document.querySelector('.num-people').classList.add('error');
            } else if (numPeople.value === 1) {
                totalPerson.textContent = '$' + numPeople.value;
            } else {
                let tipPerPerson = percentAmount / numPeople.value;
                let billPerPerson = val.value / numPeople.value;
                let finalBill = tipPerPerson + billPerPerson;

                tipAmount.textContent = '$' + tipPerPerson.toFixed(2);
                totalPerson.textContent = '$' + finalBill.toFixed(2);
                // remove error message
                document.getElementById('error-message').style.display = 'none';
                document.querySelector('.num-people').classList.remove('error');
            }
        })

    })

    custom.addEventListener('input', () => {
        if (custom.value === '') {
            return false;
        } else {
            if (numPeople.value === '') {
                // add error message
                document.getElementById('error-message').style.display = 'block';
                document.querySelector('.num-people').classList.add('error');
            } else if (numPeople.value === 1) {
                totalPerson.textContent = '$' + numPeople.value;
            } else {
                // remove error message
                document.getElementById('error-message').style.display = 'none';
                document.querySelector('.num-people').classList.remove('error');
                let customTip = parseInt(custom.value) / 100;
                customAmount = customTip * val.value;
                let customTipPerPerson = customAmount / numPeople.value;
                let billPerPerson = val.value / numPeople.value;
                let finalBillCustom = customTipPerPerson + billPerPerson;

                tipAmount.textContent = '$' + customTipPerPerson.toFixed(2);
                totalPerson.textContent = '$' + finalBillCustom.toFixed(2);

            }

        }
    })
}

val.value = getPercentage();

//reset
reset.addEventListener('click', () => {
    totalPerson.textContent = '$' + '0.00';
    tipAmount.textContent = '$' + '0.00';
    val.value = '';
    numPeople.value = '';
    custom.value = '';
    document.querySelectorAll('.active').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('error-message').style.display = 'none';
    document.querySelector('.num-people').classList.remove('error');
})
