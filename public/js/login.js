// process submit event
const loginFormHandler = async function(event) {
    event.preventDefault();

    const userNameEl = document.querySelector('#userName-input-login').value.trim();
    const passwordEl = document.querySelector('#password-input-login').value.trim();

    // valid the user login information
    const resp = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            userName: userNameEl,
            password: passwordEl,
        }),
        headers: {'Content-Type': 'application/json'},
    });

    if (resp.ok) {
        document.location.replace('/');
    } else {
        alert('Login Failed!')
    }
};

// add event listener for login form for the submit button
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
