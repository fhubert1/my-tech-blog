const commentHandler = async function (event) {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body) {
        const resp = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body,
            }),
            headers: {'Content-Type': 'application/json'},
        });

        if(resp.ok) {
            document.location.reload();
        } else {
            document.location.replace('/login');
        }
    }
};

// add event listener
document.querySelector('#new-comment-form').addEventListener('submit', commentHandler);