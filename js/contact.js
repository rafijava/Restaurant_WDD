document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contactForm");
  var nameInput = document.getElementById("cname");
  var emailInput = document.getElementById("cemail");
  var messageInput = document.getElementById("cmessage");
  var successMessage = document.getElementById("csuccessMessage");

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
    if (!value) return setError(nameInput, "cnameError", "Name is required.");
    if (value.length < 2) return setError(nameInput, "cnameError", "Name must be at least 2 characters.");
    return setError(nameInput, "cnameError", "");
  }

  function validateEmail() {
    var value = emailInput.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return setError(emailInput, "cemailError", "Email is required.");
    if (!emailRegex.test(value)) return setError(emailInput, "cemailError", "Please enter a valid email address.");
    return setError(emailInput, "cemailError", "");
  }

  function validateMessage() {
    var value = messageInput.value.trim();
    if (!value) return setError(messageInput, "cmessageError", "Message is required.");
    if (value.length < 10) return setError(messageInput, "cmessageError", "Message must be at least 10 characters.");
    return setError(messageInput, "cmessageError", "");
  }

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  nameInput.addEventListener("input", function () {
    if (nameInput.classList.contains("is-invalid")) validateName();
    successMessage.classList.add("d-none");
  });
  emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("is-invalid")) validateEmail();
    successMessage.classList.add("d-none");
  });
  messageInput.addEventListener("input", function () {
    if (messageInput.classList.contains("is-invalid")) validateMessage();
    successMessage.classList.add("d-none");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var isNameValid = validateName();
    var isEmailValid = validateEmail();
    var isMessageValid = validateMessage();

    if (!(isNameValid && isEmailValid && isMessageValid)) {
      successMessage.classList.add("d-none");
      return;
    }

    successMessage.textContent =
      "Thanks for reaching out, " + nameInput.value.trim() + "! We will get back to you soon.";
    successMessage.classList.remove("d-none");

    form.reset();
    [nameInput, emailInput, messageInput].forEach(function (input) {
      input.classList.remove("is-valid", "is-invalid");
    });
  });
});
