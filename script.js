document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount');
    const monthsInput = document.getElementById('months');
    const yearsInput = document.getElementById('years');
    const interestInput = document.getElementById('interest');
    const downPaymentInput = document.getElementById('down');
    const outputElement = document.getElementById('output');

    function calculatePayment() {
        const loan = parseFloat(amountInput.value) || 0;
        let months = parseInt(monthsInput.value) || 0;
        let years = parseInt(yearsInput.value) || 0;
        const interest = parseFloat(interestInput.value) || 0;
        const down = parseFloat(downPaymentInput.value) || 0;

        if (years > 0 && months === 0) {
            months = years * 12;
        }

        if (months > 0 && years === 0) {
            years = months / 12;
            yearsInput.value = years.toFixed(2);
        }

        const annInterest = interest / 100;
        const monInt = annInterest / 12;
        const principal = loan - down;
        const calculation = (monInt * principal / (1 - Math.pow(1 + monInt, -months))).toFixed(2);

        outputElement.textContent = `$${calculation}`;
    }

    function syncMonthsAndYears() {
        const months = parseInt(monthsInput.value) || 0;
        if (months > 0) {
            yearsInput.value = (months / 12).toFixed(2);
        }
    }

    function syncYearsAndMonths() {
        const years = parseFloat(yearsInput.value) || 0;
        if (years > 0) {
            monthsInput.value = Math.round(years * 12);
        }
    }

    monthsInput.addEventListener('input', syncMonthsAndYears);
    yearsInput.addEventListener('input', syncYearsAndMonths);

    document.querySelector('.btn').addEventListener('click', calculatePayment);
});
