const logout = async () => {

    try {
        const resp = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        });

        if (resp.ok) {
            document.location.replace('/');
        } else {
            alert(respons.statusText);
        }
        
    } catch (err) {
        console.error('Error during logout:', err);
        alert('Logout Failed!');
    }
};

// add event listener
document.querySelector('#logout').addEventListener('click', logout);