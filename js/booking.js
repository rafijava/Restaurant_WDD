document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("bookingForm");
  var nameInput = document.getElementById("name");
  var phoneInput = document.getElementById("phone");
  var dateInput = document.getElementById("date");
  var timeInput = document.getElementById("time");
  var guestsInput = document.getElementById("guests");
  var notesInput = document.getElementById("notes");
  var successMessage = document.getElementById("successMessage");

  function getTodayString() {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day = String(today.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  dateInput.setAttribute("min", getTodayString());

  function setError(input, errorId, message) {
    var errorEl = document.getElementById(errorId);
    if (message) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      errorEl.textContent = message;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      errorEl.textContent = "";
    }
    return !message;
  }

  function validateName() {
    var value = nameInput.value.trim();
    if (!value) return setError(nameInput, "nameError", "Name is required.");
    if (value.length < 2) return setError(nameInput, "nameError", "Name must be at least 2 characters.");
    return setError(nameInput, "nameError", "");
  }

  function validatePhone() {
    var value = phoneInput.value.trim();
    if (!value) return setError(phoneInput, "phoneError", "Phone number is required.");
    if (!/^\d{11}$/.test(value)) return setError(phoneInput, "phoneError", "Phone number must be exactly 11 digits.");
    return setError(phoneInput, "phoneError", "");
  }

  function validateDate() {
    var value = dateInput.value;
    if (!value) return setError(dateInput, "dateError", "Date is required.");
    if (value < getTodayString()) return setError(dateInput, "dateError", "Please select today or a future date.");
    return setError(dateInput, "dateError", "");
  }

  function validateGuests() {
    var value = guestsInput.value;
    if (value === "") return setError(guestsInput, "guestsError", "Number of guests is required.");
    var num = Number(value);
    if (!Number.isInteger(num) || num < 1 || num > 12) {
      return setError(guestsInput, "guestsError", "Guests must be between 1 and 12.");
    }
    return setError(guestsInput, "guestsError", "");
  }

  nameInput.addEventListener("blur", validateName);
  phoneInput.addEventListener("blur", validatePhone);
  dateInput.addEventListener("blur", validateDate);
  guestsInput.addEventListener("blur", validateGuests);

  nameInput.addEventListener("input", function () {
    if (nameInput.classList.contains("is-invalid")) validateName();
    successMessage.classList.add("d-none");
  });
  phoneInput.addEventListener("input", function () {
    if (phoneInput.classList.contains("is-invalid")) validatePhone();
    successMessage.classList.add("d-none");
  });
  dateInput.addEventListener("input", function () {
    if (dateInput.classList.contains("is-invalid")) validateDate();
    successMessage.classList.add("d-none");
  });
  guestsInput.addEventListener("input", function () {
    if (guestsInput.classList.contains("is-invalid")) validateGuests();
    successMessage.classList.add("d-none");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var isNameValid = validateName();
    var isPhoneValid = validatePhone();
    var isDateValid = validateDate();
    var isGuestsValid = validateGuests();

    if (!(isNameValid && isPhoneValid && isDateValid && isGuestsValid)) {
      successMessage.classList.add("d-none");
      return;
    }

    successMessage.textContent =
      "Thank you, " + nameInput.value.trim() + "! Your table for " +
      guestsInput.value + " on " + dateInput.value + " has been requested.";
    successMessage.classList.remove("d-none");

    form.reset();
    [nameInput, phoneInput, dateInput, guestsInput].forEach(function (input) {
      input.classList.remove("is-valid", "is-invalid");
    });
    dateInput.setAttribute("min", getTodayString());
  });
});
