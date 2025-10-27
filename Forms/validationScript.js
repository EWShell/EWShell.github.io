document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("myForm");
    const input = document.getElementById("inputField");

    const message = document.createElement("p");
    message.style.marginTop = "10px";
    form.appendChild(message);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const value = input.value.trim();
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        message.style.color = "red";

        if (!alphanumericRegex.test(value)) {
            message.textContent = "Error: Please enter only alphanumeric characters";
        } else {
            message.style.color = "green";
            message.textContent = "Success!";
	    input.value = "";
        }
    });
});
