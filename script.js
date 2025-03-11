document.addEventListener("DOMContentLoaded", () => {
    const billInput = document.querySelector(".component_calc__amount input");
    const tipButtons = document.querySelectorAll(".component_calc__tip-button");
    const customTipInput = document.querySelector(".component-calc__tip-button--custom");
    const peopleInput = document.querySelector(".component_calc__people input");
    const tipAmountDisplay = document.querySelector(".component_result__tip-amount");
    const totalAmountDisplay = document.querySelector(".component_result__total-amount");
    const resetButton = document.querySelector(".component_result__button");
    const errorText = document.querySelector(".error");

    let billValue = 0;
    let tipValue = 0.05;
    let peopleValue = 0;

    function calculateTip() {
        if (billValue > 0 && peopleValue === 0) {
            errorText.style.display = "block";
            peopleInput.classList.add("error");
            tipAmountDisplay.textContent = "0.00";
            totalAmountDisplay.textContent = "0.00";
            return;
        } else {
            errorText.style.display = "none";
            peopleInput.classList.remove("error");
        }

        if (peopleValue === 0) {
            tipAmountDisplay.textContent = "0.00";
            totalAmountDisplay.textContent = "0.00";
            return;
        }

        let tipAmount = (billValue * (tipValue || 0)) / peopleValue;
        let totalAmount = (billValue * (1 + (tipValue || 0))) / peopleValue;

        tipAmountDisplay.textContent = tipAmount.toFixed(2);
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
        toggleResetButton();
    }

    function toggleResetButton() {
        if (billValue > 0 && peopleValue > 0) {
            resetButton.classList.add("active");
        } else {
            resetButton.classList.remove("active");
        }
    }

    billInput.addEventListener("input", (e) => {
        billValue = parseFloat(e.target.value) || 0;
        calculateTip();
    });

    customTipInput.addEventListener("blur", () => {
        if (customTipInput.value.trim() === "") {
            tipButtons.forEach(btn => btn.classList.remove("active"));
            tipButtons[0].classList.add("active");
            tipValue = 0.05;
        }
        calculateTip();
    });

    tipButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (document.activeElement === customTipInput) {
                customTipInput.value = "";
            }
            tipButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            tipValue = parseFloat(e.target.textContent) / 100;
            calculateTip();
        });
    });

    customTipInput.addEventListener("input", (e) => {
        tipButtons.forEach(btn => btn.classList.remove("active"));
        tipValue = parseFloat(e.target.value) / 100 || 0;
        calculateTip();
    });

    peopleInput.addEventListener("input", (e) => {
        peopleValue = parseInt(e.target.value) || 0;
        calculateTip();
    });

    resetButton.addEventListener("click", () => {
        billInput.value = "";
        customTipInput.value = "";
        peopleInput.value = "";
        tipButtons.forEach(btn => btn.classList.remove("active"));
        tipButtons[0].classList.add("active");
        billValue = 0;
        tipValue = 0.05;
        peopleValue = 0;
        tipAmountDisplay.textContent = "0.00";
        totalAmountDisplay.textContent = "0.00";
        errorText.style.display = "none";
        resetButton.classList.remove("active");
    });
});