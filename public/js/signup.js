const signupFormHandler = async function (event) {
    event.preventDefault();

    const userNameEl = document.querySelector('#userName-input-signup').value.trim();
    const passwordEl = document.querySelector('#password-input-signup').value.trim();

    if(passwordEl.length >= 8 && userNameEl) {
        try {
            const resp = await fetch('/api/users', {
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
                const message = await resp.json();
                alert(`Sign-up Failed! ${message.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error during signup:', err);
            alert('Sign-up Failed!');
        }
    } else {
        alert('Must include both userName and password, password must be 8 or more characters long.');
    }
};

// add event listener
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);