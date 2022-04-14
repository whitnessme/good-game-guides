function demoUserLogin(e) {
  let email = document.querySelector("input[name=email]");
  let password = document.querySelector("input[name=password]");

  if (e.target.checked) {
    email.value = "demo@demodome.com";
    password.value = "password";
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  let checkbox = document.querySelector("#demo-user-box");

  if (checkbox) {
    checkbox.addEventListener("change", demoUserLogin);
  }
});
