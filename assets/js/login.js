document.querySelectorAll('#login-form input, #register-form input').forEach(element => {
    element.addEventListener('keyup', (e) => {
        if (e.target.value != "") {
            e.target.classList.add('active');
        } else {
            e.target.classList.remove('active');
        }
    });
});