
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('farmerForm');
        const successBanner = document.getElementById('successBanner');

        const usernameInput = document.getElementById('username');
        const mobileInput = document.getElementById('mobile');
        const emailInput = document.getElementById('email');
        const plotidInput = document.getElementById('plotid');
        const villageInput = document.getElementById('village');
        const cropstageSelect = document.getElementById('cropstage');
        const soiltypeSelect = document.getElementById('soiltype');
        const methodSelect = document.getElementById('method');
        const moistureInput = document.getElementById('moisture');
        const dateInput = document.getElementById('date');
        const photoInput = document.getElementById('photo');

        function showError(inputElement, errorElementId, message) {
            inputElement.classList.add('invalid');
            const errorSpan = document.getElementById(errorElementId);
            if (errorSpan) {
                errorSpan.textContent = message;
            }
        }

        function clearFieldError(inputElement, errorElementId) {
            inputElement.classList.remove('invalid');
            const errorSpan = document.getElementById(errorElementId);
            if (errorSpan) {
                errorSpan.textContent = '';
            }
        }

        function resetAllErrors() {
            clearFieldError(usernameInput, 'usernameError');
            clearFieldError(mobileInput, 'mobileError');
            clearFieldError(emailInput, 'emailError');
            clearFieldError(plotidInput, 'plotidError');
            clearFieldError(villageInput, 'villageError');
            clearFieldError(cropstageSelect, 'cropstageError');
            clearFieldError(soiltypeSelect, 'soiltypeError');
            clearFieldError(methodSelect, 'methodError');
            clearFieldError(moistureInput, 'moistureError');
            clearFieldError(dateInput, 'dateError');
            clearFieldError(photoInput, 'photoError');

            successBanner.style.display = 'none';
            successBanner.textContent = '';
        }

        // Live error clearing
        usernameInput.addEventListener('input', function () { clearFieldError(usernameInput, 'usernameError'); });
        mobileInput.addEventListener('input', function () { clearFieldError(mobileInput, 'mobileError'); });
        emailInput.addEventListener('input', function () { clearFieldError(emailInput, 'emailError'); });
        plotidInput.addEventListener('input', function () { clearFieldError(plotidInput, 'plotidError'); });
        villageInput.addEventListener('input', function () { clearFieldError(villageInput, 'villageError'); });
        cropstageSelect.addEventListener('change', function () { clearFieldError(cropstageSelect, 'cropstageError'); });
        soiltypeSelect.addEventListener('change', function () { clearFieldError(soiltypeSelect, 'soiltypeError'); });
        methodSelect.addEventListener('change', function () { clearFieldError(methodSelect, 'methodError'); });
        moistureInput.addEventListener('input', function () { clearFieldError(moistureInput, 'moistureError'); });
        dateInput.addEventListener('change', function () { clearFieldError(dateInput, 'dateError'); });
        photoInput.addEventListener('change', function () { clearFieldError(photoInput, 'photoError'); });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            resetAllErrors();

            let isValid = true;
            let firstInvalidElement = null;

            // Form Validations
            const nameValue = usernameInput.value.trim();
            const nameRegex = /^[A-Za-z\s]+$/;
            if (nameValue === '') {
                showError(usernameInput, 'usernameError', 'Farmer Name is required.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = usernameInput;
            } else if (!nameRegex.test(nameValue)) {
                showError(usernameInput, 'usernameError', 'Farmer Name must contain alphabetic characters and spaces only.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = usernameInput;
            }

            const mobileValue = mobileInput.value.trim();
            const mobileRegex = /^[6-9]\d{9}$/;
            if (mobileValue === '') {
                showError(mobileInput, 'mobileError', 'Mobile number is required.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = mobileInput;
            } else if (!mobileRegex.test(mobileValue)) {
                showError(mobileInput, 'mobileError', 'Please enter a valid 10-digit Indian mobile number.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = mobileInput;
            }

            const emailValue = emailInput.value.trim();
            
            if (emailValue === '') {
                showError(emailInput, 'emailError', 'Email address is required.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = emailInput;
            } else if (!emailRegex.test(emailValue)) {
                showError(emailError, 'emailError', 'Please enter a valid email address.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = emailInput;
            }

            const plotidValue = plotidInput.value.trim();
            if (plotidValue === '') {
                showError(plotidInput, 'plotidError', 'Plot ID is required.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = plotidInput;
            }

            const villageValue = villageInput.value.trim();
            if (villageValue === '') {
                showError(villageInput, 'villageError', 'Village name is required.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = villageInput;
            }

            if (cropstageSelect.value === '') {
                showError(cropstageSelect, 'cropstageError', 'Please select a Crop Stage.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = cropstageSelect;
            }

            if (soiltypeSelect.value === '') {
                showError(soiltypeSelect, 'soiltypeError', 'Please select a Soil Type.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = soiltypeSelect;
            }

            if (methodSelect.value === '') {
                showError(methodSelect, 'methodError', 'Please select an Irrigation Method.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = methodSelect;
            }

            const moistureValue = moistureInput.value.trim();
            let moistureNum = 0;
            if (moistureValue === '') {
                showError(moistureInput, 'moistureError', 'Soil moisture (%) is required.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = moistureInput;
            } else {
                moistureNum = Number(moistureValue);
                if (isNaN(moistureNum) || moistureNum < 0 || moistureNum > 100) {
                    showError(moistureInput, 'moistureError', 'Soil moisture must be between 0 and 100.');
                    isValid = false;
                    if (!firstInvalidElement) firstInvalidElement = moistureInput;
                }
            }

            const dateValue = dateInput.value.trim();
            if (dateValue === '') {
                showError(dateInput, 'dateError', 'Registration Date is required.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = dateInput;
            }

            if (photoInput.files.length === 0) {
                showError(photoInput, 'photoError', 'Please upload a farm photo.');
                isValid = false;
                if (!firstInvalidElement) firstInvalidElement = photoInput;
            }

            if (!isValid) {
                firstInvalidElement.focus();
            } else {
                // TASK 1
                let requiredSoilMoisture = 50;
                let moistureDeficit = requiredSoilMoisture - moistureNum;

                let statusMessage = `Farmer: ${nameValue}\nPlot ID: ${plotidValue}\nMoisture Deficit: ${moistureDeficit}%`;
                alert(statusMessage);

                successBanner.innerHTML = `
                    <strong>Task 1 Output:</strong><br>
                    Farmer: ${nameValue} | Plot ID: ${plotidValue}<br>
                    Current Moisture: ${moistureNum}% | Required: ${requiredSoilMoisture}% | Deficit: <strong>${moistureDeficit}%</strong>
                `;
                successBanner.style.display = 'block';
                successBanner.scrollIntoView({ behavior: 'smooth' });
            }
        });

        form.addEventListener('reset', function () {
            resetAllErrors();
        });
    });