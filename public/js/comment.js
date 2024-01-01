const commentForm = async function(event) {
    event.preventDefault()

    const postId = document.querySelector('input[name="postId"]').value 
    const body = document.querySelector('textarea[name="commentBody"]').value 

    if (body) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId, 
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        document.location.reload()
    }
}

document.querySelector('#newComment').addEventListener('submit', commentForm)