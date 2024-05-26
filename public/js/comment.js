const commentHandler = async function (event) {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body) {
        try {
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
        } catch (err) {
            console.error('Error creating comment:', err);
            alert('Comment Failed!');
        }            
    }
};

// add event listener
document.querySelector('#new-comment-form').addEventListener('submit', commentHandler);