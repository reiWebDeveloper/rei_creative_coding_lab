const totalTip = document.getElementById("totalTip");
const calculateTipBtn = document.getElementById("calculateTip");
const cautionMessage = document.getElementById("cautionMessage");
const tipAmountTxt = document.getElementById("tipAmount");

// Wire up pill clicks to check the hidden radio + toggle .active
document.querySelectorAll('.userChoice').forEach(choice => {
    choice.addEventListener('click', function () {
        const radio = this.querySelector('input[type="radio"]');
        if (!radio) return;
        const groupName = radio.name;
        document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
            r.closest('.userChoice').classList.remove('active');
        });
        radio.checked = true;
        this.classList.add('active');
    });
});

calculateTipBtn.addEventListener('click', () => {
    const amount = Number(document.getElementById("amount").value);
    const selectedPercentage = Number(
        document.querySelector('input[name="tip_percentage"]:checked')?.value
    ) / 100;

    // Reset message
    cautionMessage.textContent = "";

    // Check empty or invalid
    if (isNaN(amount) || amount === 0) {
        cautionMessage.textContent = "Please enter an amount!";
        totalTip.textContent = "—";
        return;
    }

    // Check negative input
    if (amount < 0) {
        cautionMessage.textContent = "Amount cannot be negative!";
        totalTip.textContent = "—";
        return;
    }

    // Check minimal amount
    if (amount < 10) {
        cautionMessage.textContent = "Amount should be more than 10!";
        totalTip.textContent = "—";
        return;
    }

    // Check maximum amount
    if (amount > 1500) {
        cautionMessage.textContent = "Amount exceeds 1500€ limit!";
        totalTip.textContent = "—";
        return;
    }

    // Check percentage selected
    if (!selectedPercentage) {
        cautionMessage.textContent = "Please select tip percentage!";
        totalTip.textContent = "—";
        return;
    }

    // Calculate the tip
    const totalTipCalculated = amount * selectedPercentage;

    totalTip.textContent = totalTipCalculated.toFixed(2) + "€";
    tipAmountTxt.textContent = totalTipCalculated.toFixed(2) + "€";

    // Show thank you message
    document.querySelector('.greetMessage').classList.add('show');
});