document.querySelectorAll("#login-form input, #register-form input").forEach((e=>{e.addEventListener("keyup",(e=>{""!=e.target.value?e.target.classList.add("active"):e.target.classList.remove("active")}))}));