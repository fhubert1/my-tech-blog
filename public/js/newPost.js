const newPostHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    document.location.replace('/dashboard');
};

// add event listener
document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);