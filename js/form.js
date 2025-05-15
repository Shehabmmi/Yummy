let email = document.getElementById("emailInput");
let password = document.getElementById("passwordInput");
let button = document.querySelector(".btn");
let rePassword = document.getElementById("rePasswordInput");
let nameInput = document.getElementById("nameInput");
let phoneInput = document.getElementById('phoneInput')
let ageInput = document.getElementById('ageInput')

const side = $(".links").innerWidth();
let isShown = false;
$(".sideBar").css({ left: `${-side}px` });

$(".open-close-icon").on("click", function () {
  if (isShown) {
    $(".sideBar").animate({ left: `${-side}px` }, 500);
    $(".menu-items a").slideUp(1000);
    $(this).removeClass("fa-xmark").addClass("fa-align-justify");
    isShown = false;
  } else {
    $(".sideBar").animate({ left: `0` }, 500);
    $(".menu-items a").slideDown(400);
    $(this).removeClass("fa-align-justify").addClass("fa-xmark");
    isShown = true;
  }
});

$(".menu-items a").hide();

$(".logo").on("click", function () {
  window.location.href = "index.html";
});

jQuery(function () {
  $(".loading").fadeOut(1500, function () {
    $("body").css({ overflow: "auto" });
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------
// Name Validation
function userNameValidation() {
  let regex = /^[a-z0-9_-]{3,15}$/;
  let text = nameInput.value;
  let nameMessage = document.getElementById("nameMessage");
  if (regex.test(text)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    nameMessage.classList.add("d-none");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    nameMessage.classList.remove("d-none");
    return false;
  }
}

// Email Validation
function emailValidation() {
  let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  let text = email.value;
  var emailMessage = document.getElementById("email_message");
  if (regex.test(text)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    emailMessage.classList.add("d-none");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    emailMessage.classList.remove("d-none");
    return false;
  }
}

// Password Validation
function passwordValidation() {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  var text = password.value;
  var passwordMessage = document.getElementById("password_message");
  if (regex.test(text)) {
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    passwordMessage.classList.replace("d-block", "d-none");
    return true;
  } else {
    passwordInput.classList.add("is-invalid");
    passwordInput.classList.remove("is-valid");
    passwordMessage.classList.replace("d-none", "d-block");
    return false;
  }
}

// rePassword Validation
function repasswordValidation() {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  var text = rePassword.value;
  var passwordMessage = document.getElementById("re_password_message");
  if (regex.test(text)) {
    rePassword.classList.add("is-valid");
    rePassword.classList.remove("is-invalid");
    passwordMessage.classList.replace("d-block", "d-none");
    return true;
  } else {
    rePassword.classList.add("is-invalid");
    rePassword.classList.remove("is-valid");
    passwordMessage.classList.replace("d-none", "d-block");
    return false;
  }
}


function phoneValidation(){
  let regex = /^[0-9]{10,15}$/
  let text =  phoneInput.value
  let phoneMessage = document.getElementById('phoneMessage')
  if(regex.test(text)){
     phoneInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");
    phoneMessage.classList.replace("d-block", "d-none");
    return true;
  }else{
     phoneInput.classList.add("is-invalid");
    phoneInput.classList.remove("is-valid");
    phoneMessage.classList.replace("d-none", "d-block");
    return false;
  }
}


// --------------------------------------------------------------------------------------------------------------
let myForm = document.querySelector("form");

email.addEventListener("input", emailValidation);
password.addEventListener("input", passwordValidation);
rePassword.addEventListener("input", repasswordValidation);
nameInput.addEventListener("input", userNameValidation);
phoneInput.addEventListener("input", phoneValidation);

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

// --------------------------------------------------------------------------------------------------------------
button.addEventListener("click", sumbit);
function sumbit() {
  if (
    userNameValidation() == true &&
    emailValidation() == true &&
    passwordValidation() == true &&
    repasswordValidation() == true &&
    phoneValidation() == true
    
  ) {
    Toastify({
  text: "Message sent successfully",
  duration: 3000,
  newWindow: true,
  close: true,
  gravity: "top", 
  position: "right", 
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
}).showToast();
clearInput()
  } else {
    Toastify({
  text: "All data must be valid",
  duration: 3000,
  newWindow: true,
  close: true,
  gravity: "top", 
  position: "right", 
  style: {
    background: "linear-gradient(to right, red, red)",
  },
}).showToast();
  }
}


function clearInput(){
  email.value = ''
  password.value = ''
  rePassword.value = ''
  nameInput.value = ''
  phoneInput.value = ''
  ageInput.value = ''
}





