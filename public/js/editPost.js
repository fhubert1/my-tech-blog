const postId = document.querySelector('input[name="post-id"]').value;

const editPostHandler = async function(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    await fetch(`/api/posts/${postId}`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
        }),
        headers: {'Content-Type': 'application/json'},
    });

    document.location.replace('/dashboar');
};

// delete post by id
const deleteHandler = async function() {
    await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });
    document.location.replace('/dashboard');
};

// add event handler to edit post
document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);
// add event handler to delete post by id
document.querySelector('#delete-btn').addEventListener('click', deleteHandler);
